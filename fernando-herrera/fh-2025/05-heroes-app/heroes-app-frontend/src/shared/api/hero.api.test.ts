import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

describe("hero.api.ts", () => {
  test("should be configure the pointing to the testing server.", () => {
    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${import.meta.env.VITE_API_URL}/api/heroes`);
    expect(import.meta.env.VITE_API_URL).toContain('3000');
  });
});
