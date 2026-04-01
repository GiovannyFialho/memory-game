import { useSharedValue, WithSpringConfig } from "react-native-reanimated";

interface UsePressAnimationConfig {
  scaleActive?: number;
  springConfig?: WithSpringConfig;
}

export const usePressAnimation = () => {
  const scale = useSharedValue(1);

  return {};
};
