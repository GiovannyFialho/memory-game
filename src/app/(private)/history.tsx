import { useHistoryViewModel } from "@/screens/history/history.model";
import { HistoryView } from "@/screens/history/history.view";

export default function History() {
  const viewModel = useHistoryViewModel();

  return <HistoryView {...viewModel} />;
}
