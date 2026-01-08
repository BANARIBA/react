import { heroApi } from "@/shared/api/hero.api";
import type {
  HeroesByPageResponse,
  SummaryInformationResponse,
} from "../interfaces";

export const getHeroesByPage = async (
  page: number,
  limit: number = 6
): Promise<HeroesByPageResponse> => {
  if (isNaN(+page) || +page < 1) {
    page = 1;
  }
  if (isNaN(+limit) || +limit < 1) {
    limit = 6;
  }
  const { data } = await heroApi.get<HeroesByPageResponse>("/", {
    params: { offset: (page - 1) * limit, limit },
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
