import { Difficulty } from "@/shared/interfaces/difficulty";

import { colors } from "@/constants/colors";

const difficultyColors: Record<Difficulty, string> = {
  easy: colors.feedback.info,
  medium: colors.semantic.warning,
  hard: colors.semantic.error,
};

export function getDifficultyColor(difficulty: Difficulty) {
  return difficultyColors[difficulty];
}
