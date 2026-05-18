import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppText } from "@/shared/components/app-text";
import type { ChallengeTheme } from "@/shared/utils/challenge";

import { usePressAnimation } from "@/animations/hooks/usePressAnimation";
import { colors } from "@/constants/colors";

interface ChallengeCardProps extends ChallengeTheme {
  handleSelectChallenge: (challengeId: string) => void;
}

export function ChallengeCard({
  cards,
  id,
  title,
  gradient,
  arrowColor,
  handleSelectChallenge,
}: ChallengeCardProps) {
  const pressAnimation = usePressAnimation();

  return (
    <LinearGradient
      colors={gradient as readonly [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.challengeCard}
    >
      <Animated.View style={pressAnimation.animatedStyle}>
        <Pressable
          style={styles.challengeContent}
          onPressIn={pressAnimation.onPressIn}
          onPressOut={pressAnimation.onPressOut}
          onPress={() => handleSelectChallenge(id)}
        >
          <AppText weight="extra-bold" style={styles.challengeTitle}>
            {title}
          </AppText>

          <View style={[styles.arrowButton, { backgroundColor: arrowColor }]}>
            <MaterialCommunityIcons name="arrow-right" size={24} />
          </View>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  challengeCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  challengeContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  challengeTitle: {
    fontSize: 18,
    color: colors.grayscale.gray100,
    maxWidth: "50%",
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
});
