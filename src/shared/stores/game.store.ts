import { create } from "zustand";

import { GameService } from "@/shared/services/game.service";
import type {
  Challenge,
  GameResult,
  GameState,
} from "@/shared/utils/challenge";

interface GameStore extends GameState {
  _timerId: number | null;
  initGame: (challenge: Challenge) => void;
  startGame: () => void;
  selectCard: (id: string) => void;
  resetMismatchedCards: () => void;
  finishGame: () => GameResult | null;
  tick: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  clearGame: () => void;
  previewAllCards: () => void;
  hideAllCards: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: "idle",
  challenge: null,

  // timer
  _timerId: null,
  timeElapsed: 0,
  timeRemaining: 0,
  tick: () => {
    const currentState = get();
    const newState = GameService.tick(currentState);

    set(newState);

    if (newState.status === "timeout") {
      get().stopTimer();
    }
  },
  startTimer: () => {
    const currentState = get();

    if (currentState._timerId) {
      clearInterval(currentState._timerId);
    }

    const timerID = setInterval(() => {
      get().tick();
    }, 1000);

    set({ _timerId: timerID });
  },
  stopTimer: () => {
    const currentState = get();

    if (currentState._timerId) {
      clearInterval(currentState._timerId);

      set({ _timerId: null });
    }
  },

  // life cycle
  startedAt: null,
  initGame: (challenge: Challenge) => {
    const gameState = GameService.initializeGame(challenge);

    set(gameState);
  },
  startGame: () => {
    const currentGame = get();
    const newState = GameService.startGame(currentGame);

    set(newState);
    get().startTimer();
  },
  clearGame: () => {
    get().stopTimer();
    set({
      status: "idle",
      challenge: null,
      cards: [],
      selectedCards: [],
      timeElapsed: 0,
      startedAt: null,
      timeRemaining: 0,
    });
  },
  pauseGame: () => {
    const currentState = get();
    const newState = GameService.pauseGame(currentState);

    set(newState);
    get().stopTimer();
  },
  resumeGame: () => {
    const currentState = get();
    const newState = GameService.resumeGame(currentState);

    set(newState);
    get().startTimer();
  },
  resetGame: () => {
    const currentState = get();

    if (!currentState.challenge) return;

    const newState = GameService.resetGame(currentState.challenge);

    set(newState);
    get().stopTimer();
  },
  finishGame: () => {
    const currentGame = get();
    const result = GameService.finishGame(currentGame);

    return result;
  },

  // cards
  cards: [],
  selectedCards: [],
  selectCard: (cardId: string) => {
    const currentState = get();
    const { newState, action } = GameService.selectCard(currentState, cardId);

    set(newState);

    switch (action) {
      case "flip":
        break;
      case "invalid":
        break;
      case "mismatch":
        setTimeout(() => get().resetMismatchedCards(), 1000);

        break;
      case "match":
        if (newState.status === "finished") {
          setTimeout(() => get().finishGame(), 500);
        }

        break;
    }
  },
  resetMismatchedCards: () => {
    const currentGame = get();
    const newState = GameService.resetMismatchedCards(currentGame);

    set(newState);
  },
  previewAllCards: () => {
    const currentState = get();
    const flippedCards = GameService.previewAllCards(currentState.cards);

    set({ cards: flippedCards });
  },
  hideAllCards: () => {
    const currentState = get();
    const flippedCards = GameService.hideAllCards(currentState.cards);

    set({ cards: flippedCards });
  },
}));
