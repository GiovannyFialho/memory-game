import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { AppText } from "@/shared/components/app-text";

import { useCardSelectionAnimation } from "@/animations/hooks/useCardSelectionAnimation";

import { useGameCardViewModel } from "@/screens/game/components/game-card/game-card.model";

import { colors, gradients } from "@/constants/colors";

export function GameCardView({
  card,
  selectCard,
  frontAnimatedStyle,
  backAnimatedStyle,
  entry,
  shakeAnimatedStyle,
}: ReturnType<typeof useGameCardViewModel>) {
  const {
    animatedStyle: selectionAnimatedStyle,
    onPressIn,
    onPressOut,
  } = useCardSelectionAnimation();

  return (
    <Animated.View
      style={[
        styles.containerWrapper,
        entry.animatedStyle,
        selectionAnimatedStyle,
        shakeAnimatedStyle,
      ]}
    >
      <Pressable
        style={styles.container}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => selectCard(card.id)}
      >
        <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={gradients.card}
            style={styles.cardGradient}
          >
            <Image source={require("@/assets/images/logo-transparent.png")} />
          </LinearGradient>
        </Animated.View>

        <Animated.View style={styles.innerContainer}>
          <Animated.View style={[styles.cardFace, backAnimatedStyle]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={gradients.card}
              style={styles.cardGradient}
            >
              <Image source={card.image} style={styles.cardImage} />
              <AppText style={styles.cardText}>{card.name}</AppText>
            </LinearGradient>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    width: "32%",
    height: 130,
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    borderRadius: 16,
    backfaceVisibility: "hidden",
  },
  cardGradient: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  cardImage: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  cardText: {
    color: colors.grayscale.gray100,
    fontSize: 16,
  },
});
