import { heroApi } from "@/shared/api/hero.api";
import type {
  Hero,
  HeroesByPageResponse,
  SummaryInformationResponse,
} from "../interfaces";
import type { HeroActiveTab } from "../types";
import type { Options } from "../interfaces/search-heroes-by.interface";

export const getHeroesByPage = async (
  page: number,
  limit: number = 6,
  category: HeroActiveTab
): Promise<HeroesByPageResponse> => {
  if (isNaN(+page) || +page < 1) {
    page = 1;
  }
  if (isNaN(+limit) || +limit < 1) {
    limit = 6;
  }
  const { data } = await heroApi.get<HeroesByPageResponse>("/", {
    params: { offset: (page - 1) * limit, limit, category },
  });
  return {
    ...data,
    heroes: data.heroes.map((hero) => ({
      ...hero,
      image: `${import.meta.env.VITE_API_URL}/images/${hero.image}`,
    })),
  };
};

export const getSummary = async () => {
  const { data } = await heroApi.get<SummaryInformationResponse>("/summary");
  return data;
};

export const getHeroById = async (id: string): Promise<Hero> => {
  const { data } = await heroApi.get<Hero>(`/${id}`);
  return {
    ...data,
    image: `${import.meta.env.VITE_API_URL}/images/${data.image}`,
  };
};

export const searchHeroBy = async (options: Options): Promise<Hero[]> => {
  const { data } = await heroApi.get<Hero[]>(`/search`, {
    params: options,
  });
  return data.map((hero) => ({
    ...hero,
    image: `${import.meta.env.VITE_API_URL}/images/${hero.image}`,
  }));
};
