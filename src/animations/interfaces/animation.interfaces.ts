import type { CardEntryAnimationType } from "@/animations/config/animation.config";

export interface AnimationTimings {
  entry: Record<
    CardEntryAnimationType,
    {
      duration: number;
      delayBetweenCards: number;
    }
  >;
}
