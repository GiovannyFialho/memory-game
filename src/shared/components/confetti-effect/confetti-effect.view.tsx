import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import {
  createConfettiPiece,
  type ConfettiConfig,
} from "@/shared/utils/confetti";

interface ConfettiEffectViewParams {
  active: boolean;
  burstCount?: number;
  continuousCount?: number;
  continuousInterval?: number;
}

export function ConfettiEffectView({
  active,
  burstCount = 40,
  continuousCount = 2,
  continuousInterval = 500,
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
      idCounterRef.current = 0;

      const burstPieces: ConfettiConfig[] = Array.from(
        { length: burstCount },
        () => {
          idCounterRef.current += 1;

          return createConfettiPiece(idCounterRef.current, true);
        },
      );

      setPieces(burstPieces);

      intervalRef.current = setInterval(() => {
        const newPieces: ConfettiConfig[] = Array.from(
          { length: continuousCount },
          () => {
            idCounterRef.current += 1;

            return createConfettiPiece(idCounterRef.current, false);
          },
        );

        setPieces((prevValues) => [...prevValues, ...newPieces]);
      }, continuousInterval);

      cleanupRef.current = setInterval(cleanup, 2000);
    } else {
      setPieces([]);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (cleanupRef.current) {
        clearInterval(cleanupRef.current);
        cleanupRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (cleanupRef.current) clearInterval(cleanupRef.current);
    };
  }, [active, burstCount, cleanup, continuousCount, continuousInterval]);

  return <View />;
}
