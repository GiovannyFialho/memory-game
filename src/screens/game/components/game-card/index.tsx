import { useGameCardViewModel } from "@/screens/game/components/game-card/game-card.model";
import { GameCardView } from "@/screens/game/components/game-card/game-card.view";

import { StoreCard } from "@/shared/utils/challenge";
interface GameCardProps {
  card: StoreCard;
  index: number;
}

export function GameCard({ card, index }: GameCardProps) {
  const viewModel = useGameCardViewModel({ card, index });

  return <GameCardView {...viewModel} />;
}
