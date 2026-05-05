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
}
