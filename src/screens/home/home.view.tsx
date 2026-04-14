import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "@/shared/components/app-text";

import { DifficultySelectionView } from "@/screens/home/components/difficulty-selection/diffculty-selecion.view";
import { HomeHeader } from "@/screens/home/components/home-header";

import { colors } from "@/constants/colors";

export function HomeView() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HomeHeader />

        <DifficultySelectionView />

        <AppText style={styles.title}>Home</AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 45,
    color: colors.grayscale.white,
  },
});
