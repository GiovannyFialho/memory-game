import Animated from "react-native-reanimated";

import { MatchHistoryCard } from "@/screens/history/components/match-history-card/match-history-card";
import { FormattedMatch } from "@/screens/history/history.model";

import { useListEntryAnimation } from "@/animations/hooks/useListEntryAnimation";

interface AnimatedHistoryCardParams {
  match: FormattedMatch;
  index: number;
}

export function AnimatedHistoryCard({
  match,
  index,
}: AnimatedHistoryCardParams) {
  const { animatedStyle } = useListEntryAnimation({ index });

  return (
    <Animated.View style={[animatedStyle]}>
      <MatchHistoryCard match={match} />
    </Animated.View>
  );
}
