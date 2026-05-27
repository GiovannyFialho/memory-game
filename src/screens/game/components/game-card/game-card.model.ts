import { useEffect, useRef } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { useGameStore } from "@/shared/stores/game.store";
import { StoreCard } from "@/shared/utils/challenge";

import { useCardEntryAnimation } from "@/animations/hooks/useCardEntryAnimation";
import { useCardShakeAnimation } from "@/animations/hooks/useCardShakeAnimation";

interface UseGameCardViewModelProps {
  card: StoreCard;
  index: number;
}

export function useGameCardViewModel({
  card,
  index,
}: UseGameCardViewModelProps) {
  const rotation = useSharedValue(card.isFlipped ? 180 : 0);

  const { selectCard } = useGameStore();

  const entry = useCardEntryAnimation({ cardIndex: index });
  const { animatedStyle: shakeAnimatedStyle, onShake } =
    useCardShakeAnimation();

  const previousFlippedRef = useRef(card.isFlipped);

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
    ],
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` },
    ],
  }));

  useEffect(() => {
    rotation.value = withSpring(card.isFlipped ? 180 : 0, { duration: 300 });
  }, [rotation, card.isFlipped]);

  useEffect(() => {
    if (card.isFlipped === false && previousFlippedRef.current === true) {
      onShake();
    }

    previousFlippedRef.current = card.isFlipped;
  }, [card.isFlipped, previousFlippedRef, onShake]);

  return {
    card,
    selectCard,
    frontAnimatedStyle,
    backAnimatedStyle,
    entry,
    shakeAnimatedStyle,
  };
}
