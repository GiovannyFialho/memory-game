import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { StatsCard } from "@/screens/history/components/stats-card/stats-card";

import { AppText } from "@/shared/components/app-text";

import { colors } from "@/constants/colors";

interface ListHeaderParams {
  totalGames: number;
  averageTime: string;
}

export function ListHeader({ totalGames, averageTime }: ListHeaderParams) {
  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/home")}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={20}
            color={colors.grayscale.gray100}
          />
        </Pressable>

        <AppText weight="extra-bold" style={styles.headerTitle}>
          Histórico de partidas
        </AppText>

        <View style={styles.emptyButton} />
      </View>
      <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
        <StatsCard
          icon={
            <MaterialCommunityIcons
              name="gamepad-variant"
              size={28}
              color={colors.accent.lightPurple}
            />
          }
          value={totalGames.toString()}
          label="Total de jogos"
          variant="purple"
        />

        <StatsCard
          icon={
            <MaterialCommunityIcons
              name="clock-outline"
              size={28}
              color={colors.accent.cyan}
            />
          }
          value={averageTime.toString()}
          label="Tempo médio"
          variant="cyan"
        />
      </View>

      <AppText style={styles.rankingTitle}>Ranking</AppText>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    backgroundColor: colors.grayscale.gray500,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.grayscale.gray100,
  },
  emptyButton: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  rankingTitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    marginBottom: 16,
    marginTop: 16,
  },
});
