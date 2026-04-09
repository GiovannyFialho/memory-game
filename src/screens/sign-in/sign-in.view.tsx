import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useInputFocusAnimation } from "@/animations/hooks/useInputFocusAnimation";
import { usePressAnimation } from "@/animations/hooks/usePressAnimation";

import { useSignInModel } from "@/screens/sign-in/sign-in.model";

import { AppText } from "@/shared/components/app-text";

import { colors, gradients } from "@/constants/colors";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function SignInView({
  username,
  setUsername,
  handleSubmit,
}: ReturnType<typeof useSignInModel>) {
  const animatedTextInputAnimation = useInputFocusAnimation();
  const handleSubmitPressAnimation = usePressAnimation();

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("@/assets/Logo.png")}
                resizeMode="contain"
              />
            </View>

            <View style={styles.titleContainer}>
              <AppText weight="extra-bold" style={styles.title}>
                memory game
              </AppText>

              <AppText style={styles.subtitle}>
                Teste sua memória enquanto aprende!
              </AppText>
            </View>

            <View style={styles.formContainer}>
              <AnimatedTextInput
                value={username}
                placeholder="Digite seu nome"
                placeholderTextColor={colors.grayscale.gray300}
                style={[styles.input, animatedTextInputAnimation.animatedStyle]}
                textAlign="center"
                autoCapitalize="words"
                returnKeyType="done"
                onChangeText={setUsername}
                onFocus={animatedTextInputAnimation.onFocus}
                onBlur={animatedTextInputAnimation.onBlur}
              />

              <Animated.View style={handleSubmitPressAnimation.animatedStyle}>
                <LinearGradient
                  colors={gradients.colorful}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 2 }}
                  style={styles.buttonGradient}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                    onPressIn={handleSubmitPressAnimation.onPressIn}
                    onPressOut={handleSubmitPressAnimation.onPressOut}
                  >
                    <AppText weight="bold" style={styles.buttonText}>
                      Entrar
                    </AppText>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayscale.gray700,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 71,
    height: 71,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    color: colors.grayscale.gray100,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayscale.gray200,
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  buttonText: {
    fontSize: 16,
    color: colors.grayscale.white,
  },
  buttonGradient: {
    borderRadius: 50,
  },
  button: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGlow: {
    shadowColor: colors.accent.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
  },
  input: {
    width: "100%",
    backgroundColor: colors.grayscale.gray500,
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: "Baloo2_400Regular",
    color: colors.grayscale.white,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
  },
});
