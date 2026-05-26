import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import { useAnimationStore } from "@/animations/store/animation.store";
import { getEntryAnimationDuration } from "@/animations/utils/animation.utils";

import { Difficulty } from "@/shared/interfaces/difficulty";
import { useGameStore } from "@/shared/stores/game.store";
import { challengeTheme, difficultyConfigs } from "@/shared/utils/challenge";
import { createSequence } from "@/shared/utils/sequence";

export function useGameViewModel() {
  const { themeId, difficulty } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const { status, previewAllCards, hideAllCards, startGame, initGame, cards } =
    useGameStore();

  const { entryAnimationType } = useAnimationStore();

  const [countdownVisible, setCountdownVisible] = useState(
    status === "countdown",
  );

  const selectedTheme = challengeTheme.find((theme) => theme.id === themeId);

  const handleCountdownComplete = useCallback(() => {
    setCountdownVisible(false);

    const totalAnimationTime = getEntryAnimationDuration(
      cards.length,
      entryAnimationType,
    );

    createSequence()
      .wait(totalAnimationTime)
      .then(previewAllCards)
      .wait(2000)
      .then(hideAllCards)
      .wait(300)
      .then(startGame)
      .run();
  }, [
    cards.length,
    entryAnimationType,
    previewAllCards,
    hideAllCards,
    startGame,
  ]);

  useEffect(() => {
    initGame({
      id: `${themeId}-${difficulty}`,
      title: selectedTheme?.title || "",
      cards: selectedTheme?.cards || [],
      difficulty,
      estimatedTime: difficultyConfigs[difficulty].estimatedTime,
      timeLimit: difficultyConfigs[difficulty].timeLimit,
    });

    createSequence()
      .wait(500)
      .then(() => setCountdownVisible(true))
      .run();
  }, [
    difficulty,
    initGame,
    selectedTheme?.cards,
    selectedTheme?.title,
    themeId,
  ]);

  return {
    selectedTheme,
    countdownVisible,
    handleCountdownComplete,
  };
}
