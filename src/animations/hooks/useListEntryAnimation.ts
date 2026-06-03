import { useEffect } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface UseListEntryAnimationParams {
  index: number;
  delayPerItem?: number;
}

export function useListEntryAnimation({
  index,
  delayPerItem = 150,
}: UseListEntryAnimationParams) {
  const translateX = useSharedValue(index % 2 === 0 ? -60 : 60);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    const delay = index * delayPerItem;

    translateX.value = withDelay(
      delay,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }),
    );

    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, [index, delayPerItem, translateX, opacity]);

  return { animatedStyle };
}
