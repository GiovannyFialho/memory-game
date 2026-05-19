import { CountdownOverlayView } from "@/screens/game/components/countdown-overlay/countdown-overlay.view";
import { useCountdownOverlayViewModel } from "@/screens/game/components/countdown-overlay/useCountdownOverlay.viewModel";

export interface CountdownOverlayProps {
  countdownVisible: boolean;
  onComplete: () => void;
}

export function CountdownOverlay({
  countdownVisible,
  onComplete,
}: CountdownOverlayProps) {
  const viewModel = useCountdownOverlayViewModel({
    countdownVisible,
    onComplete,
  });

  return <CountdownOverlayView {...viewModel} />;
}
