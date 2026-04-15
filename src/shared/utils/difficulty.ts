import { Difficulty } from "@/shared/interfaces/difficulty";

import { colors } from "@/constants/colors";

const difficultyColors: Record<Difficulty, string> = {
  Fácil: colors.semantic.success,
  Médio: colors.semantic.warning,
  Difícil: colors.semantic.error,
};

export function getDifficultyColor(difficulty: Difficulty) {
  return difficultyColors[difficulty];
}
