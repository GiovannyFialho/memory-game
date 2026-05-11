import { CardService } from "@/shared/services/card.service";
import { Challenge, GameState } from "@/shared/utils/challenge";

export class GameService {
  static initializeGame(challenge: Challenge): GameState {
    const cards = CardService.generateCards(challenge);

    return {
      status: "countdown",
      challenge,
      cards,
      selectedCards: [],
      timeRemaining: challenge.timeLimit,
      timeElapsed: 0,
      startedAt: null,
    };
  }

  static startGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "playing",
      startedAt: new Date(),
    };
  }

  static selectCard(
    gameState: GameState,
    cardId: string,
  ): {
    newState: GameState;
    action: "flip" | "match" | "mismatch" | "invalid";
  } {
    const { cards, selectedCards, status } = gameState;

    if (status !== "playing") {
      return { newState: gameState, action: "invalid" };
    }

    const card = cards.find((card) => card.id === cardId);

    if (!card || card.isMatched || card.isFlipped) {
      return { newState: gameState, action: "invalid" };
    }

    if (selectedCards.length >= 2) {
      return { newState: gameState, action: "invalid" };
    }

    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        return CardService.flipCard(card, true);
      } else {
        return card;
      }
    });

    const newSelectedCards = [...selectedCards, card];

    if (newSelectedCards.length === 1) {
      return {
        newState: {
          ...gameState,
          cards: updatedCards,
          selectedCards: newSelectedCards,
        },
        action: "flip",
      };
    }

    const [firstCard, secondCard] = newSelectedCards;

    const isMatch = firstCard.name === secondCard.name;

    if (isMatch) {
      const finalCards = updatedCards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return CardService.markAsMatched(card);
        } else {
          return card;
        }
      });

      return {
        newState: {
          ...gameState,
          cards: finalCards,
          selectedCards: [],
        },
        action: "match",
      };
    } else {
      return {
        newState: {
          ...gameState,
          cards: updatedCards,
          selectedCards: newSelectedCards,
        },
        action: "mismatch",
      };
    }
  }

  static resetMismatchedCards(gameState: GameState): GameState {
    const { cards, selectedCards } = gameState;

    const updatedCards = cards.map((card) => {
      const isSelected = selectedCards.some(
        (selectedCard) => card.id === selectedCard.id,
      );

      if (isSelected && !card.isMatched) {
        return CardService.flipCard(card, false);
      } else {
        return card;
      }
    });

    return {
      ...gameState,
      cards: updatedCards,
      selectedCards: [],
    };
  }

  static pauseGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "paused",
    };
  }

  static resumeGame(gameState: GameState): GameState {
    return {
      ...gameState,
      status: "playing",
    };
  }

  static resetGame(challenge: Challenge): GameState {
    return GameService.initializeGame(challenge);
  }
}
