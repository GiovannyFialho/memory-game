import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppText } from "@/shared/components/app-text";

import { useDifficultyViewModel } from "@/screens/home/components/difficulty-selection/diffculty-selecion.model";
import { DifficultyTab } from "@/screens/home/components/difficulty-selection/difficulty-tab";
import { Difficulty } from "@/shared/interfaces/difficulty";

import { colors } from "@/constants/colors";

export interface DifficultySelectionViewProps {
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
}

export function DifficultySelectionView({
  selectedDifficulty,
  setSelectedDifficulty,
}: DifficultySelectionViewProps) {
  const {
    difficulties,
    animatedIndicatorStyle,
    difficultyConfig,
    timeAnimatedStyle,
  } = useDifficultyViewModel({ selectedDifficulty, setSelectedDifficulty });

  return (
    <View style={styles.difficultySection}>
      <View style={styles.difficultyHeader}>
        <AppText style={styles.difficultyLabel}>Dificuldade</AppText>

        <Animated.View style={[styles.timeIndicator, timeAnimatedStyle]}>
          <MaterialCommunityIcons
            name="clock-outline"
            color={colors.feedback.info}
            size={16}
          />

          <AppText>{difficultyConfig.estimatedTime}</AppText>
        </Animated.View>
      </View>

      <View style={styles.difficultyTabs}>
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />

        {difficulties.map((difficulty) => (
          <DifficultyTab
            key={`difficulty-key-${difficulty}`}
            difficulty={difficulty}
            isSelected={selectedDifficulty === difficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />
        ))}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  difficultySection: {
    marginBottom: 24,
  },
  difficultyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  difficultyLabel: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  timeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayscale.gray500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  difficultyTabs: {
    flexDirection: "row",
    borderRadius: 100,
    padding: 4,
    position: "relative",
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
  },
  indicator: {
    position: "absolute",
    width: "33.33%",
    top: 8,
    zIndex: 0,
    borderRadius: 100,
    left: 0,
    bottom: 8,
    backgroundColor: colors.grayscale.gray500,
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    marginLeft: 4,
  },
});
