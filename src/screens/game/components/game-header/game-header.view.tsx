import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { usePressAnimation } from "@/animations/hooks/usePressAnimation";

import { AppText } from "@/shared/components/app-text";

import { useGameHeaderViewModel } from "@/screens/game/components/game-header/game-header.model";

import { colors } from "@/constants/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GameHeaderProps {
  onGoBack: () => void;
}

export function GameHeader({ onGoBack }: GameHeaderProps) {
  const {
    timeString,
    animatedStyle: animatedTimerStyle,
    isCriticalTime,
  } = useGameHeaderViewModel();

  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation({
    scaleActive: 0.8,
    width: 40,
  });

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[styles.backButton, animatedStyle]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onGoBack}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={20}
          color={colors.grayscale.gray100}
        />
      </AnimatedPressable>

      <Animated.View style={[styles.timerContainer, animatedTimerStyle]}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={20}
          color={isCriticalTime ? colors.feedback.danger : colors.feedback.info}
        />

        <AppText
          weight="bold"
          style={[styles.timerText, isCriticalTime && styles.timerTextCritical]}
        >
          {timeString}
        </AppText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    backgroundColor: colors.grayscale.gray500,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayscale.gray500,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.grayscale.gray400,
    gap: 8,
  },
  timerText: {
    fontSize: 16,
    color: colors.feedback.info,
  },
  timerTextCritical: {
    color: colors.feedback.danger,
  },
});
