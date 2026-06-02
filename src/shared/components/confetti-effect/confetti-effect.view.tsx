import { useCallback, useEffect, useRef, useState } from "react";
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

  const cleanup = useCallback(() => {
    const now = Date.now();
    const maxLifetime = 6000; // 6s

    setPieces((prev) =>
      prev.filter((piece) => now - piece.createdAt < maxLifetime),
    );
  }, []);

  useEffect(() => {
    if (active) {
      cleanupRef.current = setInterval(cleanup, 2000);
    }
  }, [active]);

  return <View />;
}
