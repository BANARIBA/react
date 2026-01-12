import type { Hero } from "@/heroes/interfaces";
import { createContext } from "react";

export interface FavoriteHeroContextProps {
  // state
  favorites: Hero[];
  favoriteCount: number;
  // methods
  isFavorite: (heroId: string) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext<FavoriteHeroContextProps>(
  {} as FavoriteHeroContextProps
);
