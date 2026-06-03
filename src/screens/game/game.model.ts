import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import type { CardEntryAnimationType } from "@/animations/config/animation.config";
import { useAnimationStore } from "@/animations/store/animation.store";
import {
  getEntryAnimationDuration,
  getFallAnimationDuration,
} from "@/animations/utils/animation.utils";

import { Difficulty } from "@/shared/interfaces/difficulty";
import { useGameStore } from "@/shared/stores/game.store";
import { useRankingStore } from "@/shared/stores/ranking.store";
import { challengeTheme, difficultyConfigs } from "@/shared/utils/challenge";
import { createSequence } from "@/shared/utils/sequence";

export function useGameViewModel() {
  const { themeId, difficulty } = useLocalSearchParams<{
    themeId: string;
    difficulty: Difficulty;
  }>();

  const {
    status,
    previewAllCards,
    hideAllCards,
    startGame,
    initGame,
    cards,
    resetGame,
    clearGame,
    pauseGame,
    resumeGame,
    challenge,
    timeElapsed,
  } = useGameStore();

  const { entryAnimationType, setShouldAnimate, setEntryAnimationType } =
    useAnimationStore();

  const { addScore } = useRankingStore();

  const [showExitModal, setShowExitModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [isTimeoutModalVisible, setIsTimeoutModalVisible] = useState(false);
  const [countdownVisible, setCountdownVisible] = useState(
    status === "countdown",
  );

  const selectedTheme = challengeTheme.find((theme) => theme.id === themeId);

  const handleTryAgain = useCallback(() => {
    setIsTimeoutModalVisible(false);
    setShowVictoryModal(false);
    setShouldAnimate(false);

    resetGame();

    createSequence()
      .wait(300)
      .then(() => setCountdownVisible(true))
      .run();
  }, [setShouldAnimate, resetGame, setCountdownVisible]);

  const handleExit = useCallback(() => {
    setIsTimeoutModalVisible(false);

    createSequence()
      .wait(200)
      .then(() => router.replace("/(private)/home"))
      .run();
  }, []);

  const handleOpenExitModal = () => {
    if (status === "playing") {
      pauseGame();
      setShowExitModal(true);
    }
  };

  const handleConfirmExit = useCallback(() => {
    setShowExitModal(false);

    resetGame();

    router.replace("/(private)/home");
  }, [resetGame]);

  const handleGoToHistory = useCallback(() => {
    setShowExitModal(false);

    resetGame();

    router.replace("/(private)/history");
  }, [resetGame]);

  const handleCancelExit = useCallback(() => {
    resumeGame();

    setShowExitModal(false);
  }, [resumeGame]);

  const handleGoHome = () => {
    clearGame();

    router.replace("/(private)/home");
  };

  const handleCountdownComplete = useCallback(() => {
    setCountdownVisible(false);
    setShouldAnimate(true);

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
    setShouldAnimate,
  ]);

  useEffect(() => {
    if (status === "finished") {
      setShowVictoryModal(true);

      if (challenge) {
        addScore({
          category: challenge.title,
          difficulty: challenge.difficulty,
          time: timeElapsed,
        });
      }
    }

    if (status === "timeout") {
      createSequence()
        .wait(getFallAnimationDuration())
        .then(() => setIsTimeoutModalVisible(true))
        .run();
    }
  }, [status, challenge, addScore, timeElapsed]);

  useEffect(() => {
    const theme = challengeTheme.find(({ id }) => id === themeId);

    if (theme && difficulty) {
      setShouldAnimate(false);

      const animationTypes: CardEntryAnimationType[] = ["deck", "throw"];

      const randomEntryType =
        animationTypes[Math.floor(Math.random() * animationTypes.length)];

      setEntryAnimationType(randomEntryType);

      initGame({
        id: `${themeId}-${difficulty}`,
        title: selectedTheme?.title || "",
        cards: selectedTheme?.cards || [],
        difficulty,
        estimatedTime: difficultyConfigs[difficulty].estimatedTime,
        timeLimit: difficultyConfigs[difficulty].timeLimit,
      });
    }

    createSequence()
      .wait(500)
      .then(() => setCountdownVisible(true))
      .run();
  }, [
    difficulty,
    initGame,
    selectedTheme?.cards,
    selectedTheme?.title,
    setEntryAnimationType,
    setShouldAnimate,
    themeId,
  ]);

  return {
    selectedTheme,
    countdownVisible,
    isTimeoutModalVisible,
    showExitModal,
    showVictoryModal,
    setEntryAnimationType,
    setShouldAnimate,
    handleCountdownComplete,
    handleGoHome,
    handleTryAgain,
    handleExit,
    handleOpenExitModal,
    handleConfirmExit,
    handleGoToHistory,
    handleCancelExit,
  };
}
