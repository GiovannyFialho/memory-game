import type { Difficulty } from "@/shared/interfaces/difficulty";

export function useDifficultyViewModel() {
  const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"];

  return { difficulties };
}
