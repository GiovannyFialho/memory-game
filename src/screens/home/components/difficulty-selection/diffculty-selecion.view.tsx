import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/shared/components/app-text";

import { useDifficultyViewModel } from "@/screens/home/components/difficulty-selection/diffculty-selecion.model";

import { colors } from "@/constants/colors";

export function DifficultySelectionView() {
  const { difficulties } = useDifficultyViewModel();

  return (
    <View style={styles.difficultySection}>
      <View style={styles.difficultyHeader}>
        <AppText style={styles.difficultyLabel}>Dificuldade</AppText>

        <View style={styles.timeIndicator}>
          <MaterialCommunityIcons
            name="clock-outline"
            color={colors.accent.green}
            size={16}
          />

          <AppText>5 min</AppText>
        </View>
      </View>

      <View style={styles.difficultyTabs}>
        {difficulties.map((difficulty) => (
          <Pressable
            style={styles.difficultyTab}
            key={`difficulty-key-${difficulty}`}
          >
            <AppText>{difficulty}</AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 30,
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
  difficultyTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 100,
    gap: 6,
    zIndex: 1,
  },
});
