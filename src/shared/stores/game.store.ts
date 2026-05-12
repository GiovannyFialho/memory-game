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
  tick: () => {},
  startTimer: () => {},
  stopTimer: () => {},

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
  },
  clearGame: () => {},
  pauseGame: () => {},
  resumeGame: () => {},
  resetGame: () => {},
  finishGame: () => {
    const currentGame = get();
    const result = GameService.finishGame(currentGame);

    return result;
  },

  // preview cards
  cards: [],
  selectedCards: [],
  selectCard: (cardId: string) => {},
  resetMismatchedCards: () => {
    const currentGame = get();
    const newState = GameService.resetMismatchedCards(currentGame);

    set(newState);
  },
  previewAllCards: () => {},
  hideAllCards: () => {},
}));
