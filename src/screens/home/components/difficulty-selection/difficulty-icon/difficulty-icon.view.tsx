import { StyleSheet, View } from "react-native";

import type { Difficulty } from "@/shared/interfaces/difficulty";

import { useDifficultyIconViewModel } from "@/screens/home/components/difficulty-selection/difficulty-icon/useDifficultyIcon.model";

export interface DifficultyIconViewProps {
  difficulty: Difficulty;
  color: string;
  isSelected: boolean;
  inactiveColor: string;
}

export function DifficultyIconView(props: DifficultyIconViewProps) {
  const { getBarStyle } = useDifficultyIconViewModel(props);

  return (
    <View style={styles.container}>
      {[1, 2, 3].map((index) => (
        <View key={index} style={[styles.bar, getBarStyle(index)]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 16,
  },
  bar: {
    width: 4,
    borderRadius: 2,
  },
});
