import { useCallback } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export function useCardTimeoutAnimation() {
  const translateY = useSharedValue(0);

  const fallAnimation = useCallback(
    (delay: number) => {
      translateY.value = withDelay(
        delay,
        withTiming(800, { duration: 600, easing: Easing.in(Easing.cubic) }),
      );
    },
    [translateY],
  );

  const resetAnimation = useCallback(() => {
    translateY.value = 0;
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { fallAnimation, resetAnimation, animatedStyle };
}
