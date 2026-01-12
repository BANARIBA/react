import type { Hero } from "@/heroes/interfaces";

export const getFavoriteHeroesFromLocalStorage = (): Hero[] => {
  const data: Hero[] = JSON.parse(
    localStorage.getItem("favoriteHeroes") || "[]"
  ) as Hero[];
  return data;
};
