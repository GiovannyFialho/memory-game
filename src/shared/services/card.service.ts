import { CardItem, Challenge, StoreCard } from "@/shared/utils/challenge";

export class CardService {
  static shuffle(cards: StoreCard[]) {
    const shuffled = [...cards];

    for (let index = shuffled.length - 1; index > 0; index--) {
      const secondItem = Math.floor(Math.random() * (index + 1));

      [shuffled[index], shuffled[secondItem]] = [
        shuffled[secondItem],
        shuffled[index],
      ];
    }

    return shuffled;
  }

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
      const [card1, card2] = CardService.createCardPair(cardItem, index);
      cards.push(card1, card2);
    });

    return CardService.shuffle(cards);
  }
}
