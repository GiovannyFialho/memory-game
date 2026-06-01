import {
  ANIMATION_TIMINGS,
  type CardEntryAnimationType,
} from "@/animations/config/animation.config";

export function getFallAnimationDuration(): number {
  const config = ANIMATION_TIMINGS.fall;

  return (
    config.maxRandomDelay +
    config.duration +
    config.opacityDuration +
    config.opacityDelay +
    200
  );
}

export function getEntryAnimationDuration(
  cardCount: number,
  animationType: CardEntryAnimationType,
) {
  const config = ANIMATION_TIMINGS.entry[animationType];
  const lastCardDelay = (cardCount - 1) * config.delayBetweenCards;
  const springStaleTime = animationType === "throw" ? 800 : config.duration;

  return lastCardDelay + springStaleTime + 200;
}
