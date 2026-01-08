import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../services/heroes.service";

export const useSummary = () => {
  const { data: summary } = useQuery({
    queryKey: ["summary-information"],
    queryFn: () => getSummary(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { summary };
};
