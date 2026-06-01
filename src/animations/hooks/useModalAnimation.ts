import { useCallback, useEffect, useRef } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

import { SPRING_CONFIG } from "@/animations/config/animation.config";

interface UseModalAnimationParams {
  visible: boolean;
}

export function useModalAnimation({ visible }: UseModalAnimationParams) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const pendingCallbackRef = useRef<(() => void) | null>(null);

  const executeCallback = useCallback(() => {
    if (pendingCallbackRef.current) {
      pendingCallbackRef.current();
      pendingCallbackRef.current = null;
    }
  }, []);

  const close = useCallback(
    (callback: () => void) => {
      pendingCallbackRef.current = callback;

      const exitDuration = 300;

      translateY.value = withSpring(1000, { duration: exitDuration });
      opacity.value = withTiming(0, { duration: exitDuration }, (finished) => {
        if (finished) {
          runOnJS(executeCallback)();
        }
      });
    },
    [executeCallback, opacity, translateY],
  );

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

  return { animatedStyle, close };
}
