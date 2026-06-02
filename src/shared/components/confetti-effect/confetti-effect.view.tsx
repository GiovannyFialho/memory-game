import { useRef, useState } from "react";
import { View } from "react-native";

import type { ConfettiConfig } from "@/shared/utils/confetti";

interface ConfettiEffectViewParams {
  active: boolean;
  burstCount?: number;
  continuousCount?: number;
  continuousInterval?: number;
}

export function ConfettiEffectView({
  active,
  burstCount,
  continuousCount,
  continuousInterval,
}: ConfettiEffectViewParams) {
  const [pieces, setPieces] = useState<ConfettiConfig[]>([]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cleanupRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idCounterRef = useRef(0);

  return <View />;
}
