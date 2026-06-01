import { useModalAnimation } from "@/animations/hooks/useModalAnimation";
import { BlurView } from "expo-blur";
import { Modal, Pressable, StyleSheet } from "react-native";

import { colors } from "@/constants/colors";
import { AppText } from "@/shared/components/app-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

interface ExitConfirmationModalViewParams {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitConfirmationModalView({
  visible,
  onConfirm,
  onCancel,
}: ExitConfirmationModalViewParams) {
  const { animatedStyle, close } = useModalAnimation({ visible });

  function handleConfirmation() {
    close(onConfirm);
  }

  function handleCancel() {
    close(onCancel);
  }

  return (
    <Modal visible={visible} transparent>
      <BlurView style={styles.overlay} intensity={10}>
        <Animated.View style={[animatedStyle, styles.modalContainer]}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={64}
            color={colors.semantic.warning}
          />

          <AppText weight="extra-bold" style={styles.title}>
            Sair do jogo?
          </AppText>

          <AppText style={styles.message}>
            Seu progresso atual será perdido.
          </AppText>

          <Pressable style={styles.button} onPress={handleConfirmation}>
            <AppText style={styles.buttonText}>Sair do jogo</AppText>
          </Pressable>

          <Pressable style={styles.button} onPress={handleCancel}>
            <AppText weight="extra-bold" style={styles.buttonText}>
              Continuar jogando
            </AppText>
          </Pressable>
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
  button: {
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    color: colors.grayscale.gray100,
  },
});
