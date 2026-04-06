import type { Hero } from "@/heroes/interfaces";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import { useEffect, useState } from "react";
import { getFavoriteHeroesFromLocalStorage } from "../utils";

export const FavoriteHeroProvider = ({ children }: React.PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(getFavoriteHeroesFromLocalStorage());

  const isFavorite = (heroId: string): boolean => {
    const existsHero = favorites.some(
      (favoriteHero) => favoriteHero.id === heroId
    );
    return existsHero;
  };

  const toggleFavorite = (hero: Hero): void => {
    const existsHero = favorites.find(
      (favoriteHero) => favoriteHero.id === hero.id
    );
    if (existsHero) {
      const newFavorites = favorites.filter(
        (favoriteHero) => favoriteHero.id !== hero.id
      );
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, hero]);
    }
  };

  // Cada vez que cambian los favoritos, actualizamos el localStorage
  useEffect(() => {
    localStorage.setItem("favoriteHeroes", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext.Provider
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext.Provider>
  );
};
