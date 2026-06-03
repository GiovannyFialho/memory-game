import Animated from "react-native-reanimated";

import { MatchHistoryCard } from "@/screens/history/components/match-history-card/match-history-card";
import { FormattedMatch } from "@/screens/history/history.model";

import { useListEntryAnimation } from "@/animations/hooks/useListEntryAnimation";
import { useSweepToDelete } from "@/animations/hooks/useSweepToDelete";
import { GestureDetector } from "react-native-gesture-handler";

interface AnimatedHistoryCardParams {
  index: number;
  match: FormattedMatch;
  onDelete: () => void;
}

export function AnimatedHistoryCard({
  index,
  match,
  onDelete,
}: AnimatedHistoryCardParams) {
  const { animatedStyle } = useListEntryAnimation({ index });
  const {
    panGesture,
    containerAnimatedStyle,
    deleteIconAnimatedStyle,
    cardAnimatedStyle,
  } = useSweepToDelete({ onDelete });

  return (
    <Animated.View style={[animatedStyle, containerAnimatedStyle]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardAnimatedStyle}>
          <MatchHistoryCard match={match} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
