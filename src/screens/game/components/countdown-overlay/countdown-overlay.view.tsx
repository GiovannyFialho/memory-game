import { StyleSheet, View } from "react-native";

import { AppText } from "@/shared/components/app-text";

import { useCountdownOverlayViewModel } from "@/screens/game/components/countdown-overlay/useCountdownOverlay.viewModel";

export function CountdownOverlayView({
  count,
  visible,
}: ReturnType<typeof useCountdownOverlayViewModel>) {
  if (!visible) return;

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <AppText weight="extra-bold" style={styles.countText}>
          {count}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 72,
  },
});
