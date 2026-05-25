import { useEffect } from "react";
import { useSharedValue, withDelay, withSpring } from "react-native-reanimated";

import {
  ANIMATION_TIMINGS,
  ENTRY_ANIMATION_START_POSITIONS,
  SPRING_CONFIG,
} from "@/animations/config/animation.config";
import { useAnimationStore } from "@/animations/store/animation.store";

interface UseCardEntryAnimationProps {
  cardIndex: number;
  shouldAnimate: boolean;
}

export function useCardEntryAnimation({
  cardIndex,
  shouldAnimate,
}: UseCardEntryAnimationProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const { entryAnimationType } = useAnimationStore();

  useEffect(() => {
    if (shouldAnimate) {
      const config = ANIMATION_TIMINGS.entry[entryAnimationType];
      const delay = cardIndex * config.delayBetweenCards;

      if (entryAnimationType === "throw") {
        translateX.value = ENTRY_ANIMATION_START_POSITIONS.throw.x;
        translateY.value = ENTRY_ANIMATION_START_POSITIONS.throw.y;
        rotation.value = -30;

        translateX.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryThrow),
        );
        translateY.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryDeck),
        );
        rotation.value = withDelay(
          delay,
          withSpring(0, SPRING_CONFIG.entryDeck),
        );
      }
    }
  }, [
    cardIndex,
    shouldAnimate,
    entryAnimationType,
    translateX,
    translateY,
    rotation,
  ]);

  return {};
}
