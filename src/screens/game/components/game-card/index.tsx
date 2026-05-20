import { useGameCardViewModel } from "@/screens/game/components/game-card/game-card.model";
import { GameCardView } from "@/screens/game/components/game-card/game-card.view";

import { StoreCard } from "@/shared/utils/challenge";
interface GameCardProps {
  card: StoreCard;
  index: number;
}

export function GameCard({ card }: GameCardProps) {
  const viewModel = useGameCardViewModel({ card });

  return <GameCardView {...viewModel} />;
}
