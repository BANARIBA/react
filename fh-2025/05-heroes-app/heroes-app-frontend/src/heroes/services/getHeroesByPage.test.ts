import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "@/shared/api/hero.api";
import { getHeroesByPage } from "./heroes.service";

const baseUrl = import.meta.env.VITE_API_URL;

describe("heroes.service.ts arrow function getHeroesPage", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test("should fetch searchHeroBy with options how limit, page etc", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 10,
      pages: 2,
      heroes: [{ image: "1.jpg" }, { image: "2.jpg" }],
    });
    const response = await getHeroesByPage(1, 6, "all");
    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: baseUrl + "/images/1.jpg" },
        { image: baseUrl + "/images/2.jpg" },
      ],
    });
  });

  test('should return the correct heroes when page is not a number', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [], 
    };
    heroesApiMock.onGet('/').reply(200, responseObject);
    heroesApiMock.resetHistory();
    await getHeroesByPage('a' as unknown as number, 6, 'all');
    const params = heroesApiMock.history.get[0].params;
    expect(params).toStrictEqual({ offset: 0, limit: 6, category: 'all' });
  });

  test('should call the api with correct params', async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [], 
    };
    heroesApiMock.onGet('/').reply(200, responseObject);
    heroesApiMock.resetHistory();
    await getHeroesByPage(2, 10, 'heroes');
    const params = heroesApiMock.history.get[0].params;
    expect(params).toStrictEqual({ offset: 10, limit: 10, category: 'heroes' });
  });
});
