import {
  CardItem,
  Challenge,
  GameState,
  StoreCard,
} from "@/shared/utils/challenge";

export class GameService {
  static createCardPair(
    cardItem: CardItem,
    startIndex: number,
  ): [StoreCard, StoreCard] {
    return [
      {
        id: `${cardItem.name}-1-${startIndex}`,
        isFlipped: false,
        isMatched: false,
        ...cardItem,
      },
      {
        id: `${cardItem.name}-2-${startIndex + 2}`,
        isFlipped: false,
        isMatched: false,
        ...cardItem,
      },
    ];
  }

  static generateCards(challenge: Challenge): StoreCard[] {
    const cards: StoreCard[] = [];

    challenge.cards.forEach((cardItem, index) => {
      const [card1, card2] = GameService.createCardPair(cardItem, index);
      cards.push(card1, card2);
    });

    return cards;
  }

  static initializeGame(challenge: Challenge): GameState {
    return {
      status: "countdown",
      challenge,
      cards: [],
      selectedCards: [],
      timeRemaining: challenge.timeLimit,
      timeElapsed: 0,
      startedAt: null,
    };
  }
}
