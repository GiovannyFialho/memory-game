import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChallengesList } from "@/screens/home/components/challenges-list";
import { DifficultySelectionView } from "@/screens/home/components/difficulty-selection/diffculty-selecion.view";
import { HomeHeader } from "@/screens/home/components/home-header";
import { useHomeViewModel } from "@/screens/home/useHome.viewModel";

import { colors } from "@/constants/colors";

export function HomeView() {
  const viewModel = useHomeViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <HomeHeader />

        <DifficultySelectionView {...viewModel} />

        <ChallengesList
          handleSelectChallenge={viewModel.handleSelectChallenge}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
