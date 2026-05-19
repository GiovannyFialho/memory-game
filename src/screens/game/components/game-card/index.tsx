import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { AppText } from "@/shared/components/app-text";
import { StoreCard } from "@/shared/utils/challenge";

import { colors, gradients } from "@/constants/colors";

interface GameCardProps {
  index: number;
  card: StoreCard;
}

export function GameCard({ index, card }: GameCardProps) {
  return (
    <Animated.View style={[styles.containerWrapper]}>
      <Pressable style={styles.container}>
        <Animated.View style={styles.innerContainer}>
          <Animated.View></Animated.View>
          <Animated.View style={[styles.cardFace]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={gradients.card}
              style={styles.cardGradient}
            >
              <AppText>{card.name}</AppText>
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
    borderColor: colors.grayscale.gray400,
    borderWidth: 1,
    borderRadius: 16,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  cardContent: {
    alignItems: "center",
  },
  cardFace: {
    position: "absolute",
    backfaceVisibility: "hidden",
    width: "100%",
    height: "100%",
  },
  cardGradient: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
