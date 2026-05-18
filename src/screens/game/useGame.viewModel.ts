import { useLocalSearchParams } from "expo-router";

import { Difficulty } from "@/shared/interfaces/difficulty";
import { challengeTheme } from "@/shared/utils/challenge";

export function useGameViewModel() {
  const { themeId, difficulty } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const selectedTheme = challengeTheme.find((theme) => theme.id === themeId);

  return {
    difficulty,
    selectedTheme,
  };
}
