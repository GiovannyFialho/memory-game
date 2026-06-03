import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useHistoryViewModel } from "@/screens/history/history.model";

import { ListHeader } from "@/screens/history/components/list-header/list-header";
import { MatchHistoryCard } from "@/screens/history/components/match-history-card/match-history-card";

import { colors } from "@/constants/colors";

export function HistoryView({
  matches,
  totalGames,
  averageTime,
}: ReturnType<typeof useHistoryViewModel>) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={matches}
          renderItem={({ item }) => <MatchHistoryCard match={item} />}
          keyExtractor={({ id }) => `score-${id}`}
          style={{ width: "100%" }}
          ListHeaderComponent={() => (
            <ListHeader totalGames={totalGames} averageTime={averageTime} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
