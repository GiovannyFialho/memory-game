import { create } from "zustand";

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

  finishGame: () => null,
  resetMismatchedCards: () => {},
  selectCard: (cardId: string) => {},
  startGame: () => {},

  // timer
  _timerId: null,
  timeElapsed: 0,
  timeRemaining: 0,
  tick: () => {},
  startTimer: () => {},
  stopTimer: () => {},

  // life cycle
  startedAt: null,
  initGame: () => {},
  clearGame: () => {},
  pauseGame: () => {},
  resumeGame: () => {},
  resetGame: () => {},

  // preview cards
  cards: [],
  selectedCards: [],
  previewAllCards: () => {},
  hideAllCards: () => {},
}));
