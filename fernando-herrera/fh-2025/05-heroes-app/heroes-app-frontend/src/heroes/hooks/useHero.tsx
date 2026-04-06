import { useQuery } from "@tanstack/react-query";
import { getHeroesByPage } from "../services/heroes.service";
import type { HeroActiveTab } from "../types";

export const useHero = (page: number, limit: number, category: HeroActiveTab) => {
  return useQuery({
    queryKey: ["heroesByPage", { page: page, limit: limit, category: category }],
    queryFn: () => getHeroesByPage(+page, +limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutes la informacion estara fresca si la llamo en otro lugar en ese tiempo estara cacheada
  });
};
