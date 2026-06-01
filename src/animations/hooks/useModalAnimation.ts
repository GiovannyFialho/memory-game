import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { SPRING_CONFIG } from "@/animations/config/animation.config";

interface UseModalAnimationParams {
  visible: boolean;
}

export function useModalAnimation({ visible }: UseModalAnimationParams) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, SPRING_CONFIG.modal);
      opacity.value = withSpring(1, SPRING_CONFIG.modal);
    } else {
      translateY.value = withSpring(-1000, SPRING_CONFIG.modal);
      opacity.value = withSpring(0, SPRING_CONFIG.modal);
    }
  }, [visible, translateY, opacity]);

  return { animatedStyle };
}
