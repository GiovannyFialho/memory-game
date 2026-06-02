import { useEffect } from "react";
import { View } from "react-native";
import {
  Easing,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface ConfettiPieceComponentParams {
  color: string;
  startX: number;
  delay: number;
  duration: number;
  size: number;
  shape: "square" | "rectangle" | "circle";
  swingDirection: number;
  swingAmount: number;
  rotationSpeed: number;
}

export function ConfettiPieceComponent({
  color,
  startX,
  delay,
  duration,
  size,
  shape,
  swingDirection,
  swingAmount,
  rotationSpeed,
}: ConfettiPieceComponentParams) {
  const progress = useSharedValue(0);
  const rotateZ = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.linear }),
    );

    rotateZ.value = withDelay(
      delay,
      withTiming(360 * rotationSpeed * swingDirection, {
        duration,
        easing: Easing.linear,
      }),
    );
  }, [progress, delay, duration, rotateZ, rotationSpeed, swingDirection]);

  return <View />;
}
