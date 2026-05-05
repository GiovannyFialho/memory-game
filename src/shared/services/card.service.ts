import { CardItem, Challenge, StoreCard } from "@/shared/utils/challenge";

export class CardService {
  static shuffle(cards: StoreCard[]) {
    // Criamos uma cópia do array original para não modificar o original
    const shuffled = [...cards];

    // Começamos do ÚLTIMO índice do array
    // Ex: se tem 4 itens, começa no índice 3
    for (
      let currentIndex = shuffled.length - 1;
      currentIndex > 0;
      currentIndex--
    ) {
      // Geramos um índice aleatório entre 0 e currentIndex (inclusive)
      //
      // Passo a passo:
      // Math.random() → número entre 0 e 1 (ex: 0.73)
      // * (currentIndex + 1) → ajusta o range (ex: 0 até 4)
      // Math.floor → remove decimal (vira 0, 1, 2 ou 3)
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

      // Aqui acontece a TROCA (swap)
      //
      // Antes:
      // shuffled[currentIndex] → carta atual
      // shuffled[randomIndex] → carta aleatória
      //
      // O lado direito é avaliado primeiro:
      // cria um array temporário com os valores invertidos
      //
      // Depois atribui:
      // - posição currentIndex recebe o valor aleatório
      // - posição randomIndex recebe o valor atual
      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];

      // 💡 Após essa troca:
      // A posição currentIndex está "definida" (não será mais alterada)
    }

    // Retorna o array embaralhado
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
