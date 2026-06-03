import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import type { FormattedMatch } from "@/screens/history/history.model";
import { DifficultyIconView } from "@/screens/home/components/difficulty-selection/difficulty-icon/difficulty-icon.view";

import { AppText } from "@/shared/components/app-text";

import { colors } from "@/constants/colors";

interface MatchHistoryCardParams {
  match: FormattedMatch;
}

const positionColors = [
  colors.ranking.gold,
  colors.ranking.silver,
  colors.ranking.bronze,
];

export function MatchHistoryCard({ match }: MatchHistoryCardParams) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText weight="extra-bold" style={styles.title}>
          {match.category}
        </AppText>

        <AppText
          weight="extra-bold"
          style={{
            ...styles.position,
            color:
              positionColors[match.position - 1] ?? colors.grayscale.gray300,
          }}
        >
          {match.position}º
        </AppText>
      </View>

      <View style={styles.footer}>
        <View style={styles.infoBadge}>
          <MaterialCommunityIcons
            name="calendar-outline"
            size={16}
            color={colors.grayscale.gray300}
          />

          <AppText weight="medium" style={styles.infoText}>
            {match.date}
          </AppText>
        </View>

        <View style={styles.infoBadge}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={colors.grayscale.gray300}
          />

          <AppText weight="medium" style={styles.infoText}>
            {match.time}
          </AppText>
        </View>

        <View style={styles.infoBadge}>
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
    padding: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    color: colors.grayscale.gray100,
    width: "60%",
  },
  position: {
    fontSize: 18,
    color: colors.accent.cyan,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grayscale.gray400,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    height: 32,
    gap: 6,
  },
  infoText: {
    lineHeight: 20,
    color: colors.grayscale.gray200,
  },
});
