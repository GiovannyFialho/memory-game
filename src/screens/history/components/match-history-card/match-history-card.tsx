import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import type { FormattedMatch } from "@/screens/history/history.model";
import { DifficultyIconView } from "@/screens/home/components/difficulty-selection/difficulty-icon/difficulty-icon.view";

import { AppText } from "@/shared/components/app-text";

import { colors } from "@/constants/colors";

interface MatchHistoryCardParams {
  match: FormattedMatch;
}

export function MatchHistoryCard({ match }: MatchHistoryCardParams) {
  return (
    <View style={styles.container}>
      <View>
        <AppText>{match.category}</AppText>
        <AppText>{match.position}</AppText>
      </View>

      <View>
        <View>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={colors.grayscale.gray300}
          />
          <AppText>{match.date}</AppText>
        </View>

        <View>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={colors.grayscale.gray300}
          />
          <AppText>{match.time}</AppText>
        </View>

        <View>
          <DifficultyIconView
            difficulty={match.difficulty}
            inactiveColor={colors.grayscale.gray300}
            color={colors.feedback.info}
            isSelected
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayscale.gray500,
    borderRadius: 20,
    padding: 24,
    gap: 20,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    marginBottom: 12,
  },
});
