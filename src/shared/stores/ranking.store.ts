import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Difficulty } from "@/shared/interfaces/difficulty";

export interface GameScore {
  id: string;
  category: string;
  difficulty: Difficulty;
  date: Date;
}

interface RankingStore {
  scores: GameScore[];
  addScore: (score: Omit<GameScore, "id" | "date">) => void;
  deleteScore: (id: string) => void;
}

export const useRankingStore = create<RankingStore>()(
  persist(
    (set) => ({
      scores: [],
      addScore: (game) => {
        const score: GameScore = {
          ...game,
          id: Date.now().toString(),
          date: new Date(),
        };

        set((state) => ({
          scores: [...state.scores, score],
        }));
      },
      deleteScore: () => {},
    }),
    {
      name: "@memory-game:scores",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
