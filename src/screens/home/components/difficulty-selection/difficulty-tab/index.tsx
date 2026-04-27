import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/shared/components/app-text";
import type { Difficulty } from "@/shared/interfaces/difficulty";
import { getDifficultyColor } from "@/shared/utils/difficulty";

import { DifficultyIconView } from "@/screens/home/components/difficulty-selection/difficulty-icon/difficulty-icon.view";

import { colors } from "@/constants/colors";

interface DifficultyTabProps {
  difficulty: Difficulty;
  isSelected: boolean;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export function DifficultyTab({
  difficulty,
  isSelected,
  setSelectedDifficulty,
}: DifficultyTabProps) {
  return (
    <Pressable
      style={styles.difficultyTab}
      onPress={() => setSelectedDifficulty(difficulty)}
    >
      <View style={styles.difficultyBadge}>
        <DifficultyIconView
          difficulty={difficulty}
          color={getDifficultyColor(difficulty)}
          isSelected={isSelected}
          inactiveColor={colors.grayscale.gray200}
        />

        <AppText
          weight={isSelected ? "extra-bold" : "regular"}
          style={{
            color: isSelected
              ? colors.grayscale.white
              : colors.grayscale.gray200,
          }}
        >
          {difficulty}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  difficultyLabel: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  difficultyTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 100,
    gap: 12,
    zIndex: 1,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
    borderRadius: "50%",
  },
});
