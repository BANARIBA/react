import { describe, expect, test } from "vitest";
import { getHeroById } from "./heroes.service";
import { AxiosError } from "axios";

describe("heroes.service.ts arrow function getHeroById", () => {
  test("should fetch getHeroById data and return with complete image url", async () => {
    const result = await getHeroById("clark-kent");
    const resultImageUrl = result.image;
    expect(result).toStrictEqual({
      id: "1",
      name: "Clark Kent",
      slug: "clark-kent",
      alias: "Superman",
      powers: [
        "Súper fuerza",
        "Vuelo",
        "Visión de calor",
        "Visión de rayos X",
        "Invulnerabilidad",
        "Súper velocidad",
      ],
      description:
        "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
      strength: 10,
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: "Liga de la Justicia",
      image: "http://localhost:3000/images/1.jpeg",
      firstAppearance: "1938",
      status: "Active",
      category: "Hero",
      universe: "DC",
    });
    expect(resultImageUrl).toContain("http://");
  });

  test("should throw and error if hero is not found", async () => {
    const idSlug: string = "kakaroto";
    const result = await getHeroById(idSlug).catch((error) => {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(AxiosError);
      console.log(error.message);
      expect(error.message).toBe("Request failed with status code 404");
    });
    expect(result).toBeUndefined();
  });
});
