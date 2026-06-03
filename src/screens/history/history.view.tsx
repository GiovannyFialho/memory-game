import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/shared/components/app-text";

import { useHistoryViewModel } from "@/screens/history/history.model";

export function HistoryView({
  scores,
}: ReturnType<typeof useHistoryViewModel>) {
  return (
    <SafeAreaView>
      <FlatList
        data={scores}
        keyExtractor={({ id }) => `score-${id}`}
        renderItem={({ item }) => (
          <View>
            <AppText>{item.category}</AppText>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
