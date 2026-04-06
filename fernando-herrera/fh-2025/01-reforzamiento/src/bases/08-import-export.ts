import { heroes, Owner, type Hero } from "../data/heroes.data";

export const getHeroById = (id: number): Hero | undefined => {
  const hero = heroes.find(h => h.id === id);
  return hero;
}

export const getHeroesByOwner = (owner: Owner): Hero[] => {
  return heroes.filter(h => h.owner === owner);
}