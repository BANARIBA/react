import type { Hero } from "./hero.interface";

export interface HeroesByPageResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
