import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { Difficulty } from "@/shared/interfaces/difficulty";

export default function Game() {
  const params = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  return (
    <View>
      <Text>Game</Text>
      <Text>
        {params.themeId} - {params.difficulty}
      </Text>
    </View>
  );
}
