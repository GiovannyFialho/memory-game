import { Dimensions } from "react-native";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DELETE_THRESHOLD = -100;
const VELOCITY_THRESHOLD = -500;

interface UseSweepToDeleteParams {
  onDelete: () => void;
}

export function useSweepToDelete({ onDelete }: UseSweepToDeleteParams) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(60);
  const isDeleting = useSharedValue(false);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    height: isDeleting.value ? itemHeight.value : "auto",
    overflow: isDeleting.value ? "hidden" : "visible",
    marginBottom: itemHeight.value === 0 ? 0 : 16,
    opacity: interpolate(itemHeight.value, [0, 30], [0, 1]),
  }));

  const deleteIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-80, -40, 0], [1, 0.5, 0]),
  }));

  return {
    containerAnimatedStyle,
    deleteIconAnimatedStyle,
  };
}
