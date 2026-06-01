import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CardGrid } from "@/screens/game/components/card-grid";
import { CountdownOverlay } from "@/screens/game/components/countdown-overlay";
import { useGameViewModel } from "@/screens/game/game.model";

import { AppText } from "@/shared/components/app-text";

import { DefeatModalView } from "@/screens/game/components/defeat-modal/defeat-modal.view";
import { ExitConfirmationModalView } from "@/screens/game/components/exit-confirmation-modal/exit-confirmation-modal.view";
import { GameHeader } from "@/screens/game/components/game-header/game-header.view";

import { colors } from "@/constants/colors";
import { VictoryModalView } from "@/screens/game/components/victory-modal/victory-modal.view";

export function GameView() {
  const {
    selectedTheme,
    countdownVisible,
    isTimeoutModalVisible,
    showExitModal,
    showVictoryModal,
    handleOpenExitModal,
    handleConfirmExit,
    handleCancelExit,
    handleCountdownComplete,
    handleGoHome,
    handleTryAgain,
  } = useGameViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader onGoBack={handleOpenExitModal} />

      <View style={styles.gameInfo}>
        <AppText weight="extra-bold" style={styles.title}>
          {selectedTheme?.title}
        </AppText>

        <AppText style={styles.subtitle}>
          Encontre todos os pares dentro do tempo!
        </AppText>

        <CardGrid />
      </View>

      <CountdownOverlay
        countdownVisible={countdownVisible}
        onComplete={handleCountdownComplete}
      />

      <DefeatModalView
        visible={isTimeoutModalVisible}
        onTryAgain={handleTryAgain}
        onGoHome={handleGoHome}
      />

      <ExitConfirmationModalView
        visible={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />

      <VictoryModalView
        visible={showVictoryModal}
        onPlayAgain={handleTryAgain}
        onGoHistory={handleConfirmExit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  title: {
    fontSize: 20,
    color: colors.grayscale.gray100,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    marginBottom: 32,
  },
  gameInfo: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
});
