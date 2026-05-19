import { CountdownOverlayView } from "@/screens/game/components/countdown-overlay/countdown-overlay.view";
import { useCountdownOverlayViewModel } from "@/screens/game/components/countdown-overlay/useCountdownOverlay.viewModel";

export function CountdownOverlay() {
  const viewModel = useCountdownOverlayViewModel();

  return <CountdownOverlayView {...viewModel} />;
}
