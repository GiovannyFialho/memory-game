import { useState } from "react";

import type { Difficulty } from "@/shared/interfaces/difficulty";

export function useDifficultyViewModel() {
  const difficulties: Difficulty[] = ["Fácil", "Médio", "Difícil"];

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("Fácil");

  return { difficulties, selectedDifficulty, setSelectedDifficulty };
}
