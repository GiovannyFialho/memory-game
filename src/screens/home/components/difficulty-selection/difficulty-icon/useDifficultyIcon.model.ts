import { DifficultyIconViewProps } from "@/screens/home/components/difficulty-selection/difficulty-icon/difficulty-icon.view";

export function useDifficultyIconViewModel({
  difficulty,
  isSelected,
  color,
  inactiveColor,
}: DifficultyIconViewProps) {
  const barHeights = [6, 10, 14];
  const barCount = difficulty === "Fácil" ? 1 : difficulty === "Médio" ? 2 : 3;

  function getBarStyle(index: number) {
    return {
      height: barHeights[index - 1],
      backgroundColor: index <= barCount && isSelected ? color : inactiveColor,
    };
  }

  return { getBarStyle };
}
