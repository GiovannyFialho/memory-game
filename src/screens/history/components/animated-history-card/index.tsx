import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { MatchHistoryCard } from "@/screens/history/components/match-history-card/match-history-card";
import { FormattedMatch } from "@/screens/history/history.model";

import { useListEntryAnimation } from "@/animations/hooks/useListEntryAnimation";
import { useSweepToDelete } from "@/animations/hooks/useSweepToDelete";

import { colors } from "@/constants/colors";

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
      <Animated.View style={[deleteIconAnimatedStyle, styles.deleteBackground]}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color={colors.semantic.error}
        />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={cardAnimatedStyle}>
          <MatchHistoryCard match={match} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 24,
  },
});
