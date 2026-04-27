import { useEffect, useMemo, useState } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import type { Difficulty } from "@/shared/interfaces/difficulty";

export function useDifficultyViewModel() {
  const difficulties = useMemo<Difficulty[]>(
    () => ["Fácil", "Médio", "Difícil"],
    [],
  );

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("Fácil");

  const selectedIndex = difficulties.indexOf(selectedDifficulty);
  const translateX = useSharedValue(selectedIndex * 100);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  useEffect(() => {
    const newIndex = difficulties.indexOf(selectedDifficulty);
    translateX.value = withSpring(newIndex * 100, {
      damping: 50,
      stiffness: 220,
    });
  }, [difficulties, selectedDifficulty, translateX]);

  return {
    difficulties,
    selectedDifficulty,
    setSelectedDifficulty,
    animatedIndicatorStyle,
  };
}
