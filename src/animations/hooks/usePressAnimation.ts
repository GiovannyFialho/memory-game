import { useCallback } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { SPRING_CONFIG } from "@/animations/config/animation.config";

interface UsePressAnimationConfig {
  scaleActive?: number;
  springConfig?: WithSpringConfig;
}

export const usePressAnimation = ({
  scaleActive = 0.95,
  springConfig = SPRING_CONFIG.press,
}: UsePressAnimationConfig = {}) => {
  const scale = useSharedValue(1);

  const onPressIn = useCallback(() => {
    scale.value = withSpring(scaleActive, springConfig);
  }, [scale, scaleActive, springConfig]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, springConfig);
  }, [scale, springConfig]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: "100%",
    transform: [{ scale: scale.value }],
  }));

  return { onPressIn, onPressOut, animatedStyle };
};
