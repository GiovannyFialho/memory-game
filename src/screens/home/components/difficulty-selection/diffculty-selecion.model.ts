import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { useNumberAnimation } from "@/animations/hooks/useNumberAnimation";

import { DifficultySelectionViewProps } from "@/screens/home/components/difficulty-selection/diffculty-selecion.view";

import type { Difficulty } from "@/shared/interfaces/difficulty";
import { difficultyConfigs } from "@/shared/utils/challenge";

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

export function useDifficultyViewModel({
  selectedDifficulty,
  setSelectedDifficulty,
}: DifficultySelectionViewProps) {
  const difficultyConfig = difficultyConfigs[selectedDifficulty];
  const selectedIndex = difficulties.indexOf(selectedDifficulty);
  const translateX = useSharedValue(selectedIndex * 100);

  const { animatedStyle: timeAnimatedStyle } = useNumberAnimation(
    difficultyConfig.estimatedTime,
  );

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  useEffect(() => {
    const newIndex = difficulties.indexOf(selectedDifficulty);
    translateX.value = withSpring(newIndex * 100, {
      damping: 50,
      stiffness: 220,
    });
  }, [selectedDifficulty, translateX]);

  return {
    difficulties,
    selectedDifficulty,
    setSelectedDifficulty,
    animatedIndicatorStyle,
    difficultyConfig,
    timeAnimatedStyle,
  };
}
