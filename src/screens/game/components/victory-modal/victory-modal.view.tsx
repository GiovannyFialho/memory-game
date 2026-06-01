import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";

import { AppText } from "@/shared/components/app-text";

import { colors, gradients } from "@/constants/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface VictoryModalViewParams {
  visible: boolean;
  onPlayAgain: () => void;
  onGoHistory: () => void;
}

export function VictoryModalView({
  visible,
  onPlayAgain,
  onGoHistory,
}: VictoryModalViewParams) {
  const { animatedStyle, close } = useModalAnimation({ visible });

  const {
    animatedStyle: playAgainAnimatedStyle,
    onPressIn,
    onPressOut,
  } = usePressAnimation();
  const {
    animatedStyle: historyPressAnimatedStyle,
    onPressIn: historyOnPressIn,
    onPressOut: historyOnPressOut,
  } = usePressAnimation();

  function handlePlayAgain() {
    close(onPlayAgain);
  }

  function handleGoHistory() {
    close(onGoHistory);
  }

  return (
    <Modal visible={visible} transparent>
      <BlurView intensity={10} style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <MaterialCommunityIcons
            name="trophy-outline"
            size={40}
            color={colors.accent.lightPurple}
          />

          <AppText weight="extra-bold" style={styles.title}>
            Você concluiu o desafio em {}
          </AppText>

          <View style={styles.buttonGlow}>
            <Animated.View style={[playAgainAnimatedStyle]}>
              <LinearGradient
                colors={gradients.colorful}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Pressable
                  onPress={handlePlayAgain}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                >
                  <AppText weight="extra-bold" style={styles.buttonText}>
                    Jogar novamente
                  </AppText>
                </Pressable>
              </LinearGradient>
            </Animated.View>
          </View>

          <AnimatedPressable
            onPressIn={historyOnPressIn}
            onPressOut={historyOnPressOut}
            style={[styles.secondaryButton, historyPressAnimatedStyle]}
            onPress={handleGoHistory}
          >
            <AppText weight="extra-bold" style={styles.secondaryButtonText}>
              Ver histórico
            </AppText>
          </AnimatedPressable>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    padding: 32,
    borderRadius: 24,
    backgroundColor: colors.grayscale.gray500,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
  title: {
    fontSize: 20,
    color: colors.grayscale.gray100,
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: colors.grayscale.gray200,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  buttonGradient: {
    borderRadius: 100,
    width: "100%",
    marginBottom: 12,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: colors.grayscale.gray100,
  },
  secondaryButton: {
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    color: colors.accent.lightPurple,
  },
  buttonGlow: {
    shadowColor: colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
    width: "100%",
  },
});
