import { useRankingStore } from "@/shared/stores/ranking.store";

export function useHistoryViewModel() {
  const { scores } = useRankingStore();

  return { scores };
}
