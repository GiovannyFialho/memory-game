import type { CardEntryAnimationType } from "@/animations/config/animation.config";
import { create } from "zustand";

interface AnimationStore {
  entryAnimationType: CardEntryAnimationType;
  isAnimating: boolean;
  setEntryAnimationType: (type: CardEntryAnimationType) => void;
  setIsAnimating: (isAnimating: boolean) => void;
}

export const useAnimationStore = create<AnimationStore>()((set) => ({
  entryAnimationType: "throw",
  isAnimating: false,
  setEntryAnimationType: (entryAnimationType) => set({ entryAnimationType }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
}));
