import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphy.api', () => {
  test('should be configure correctly', () => {
    expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
    expect(giphyApi.defaults.params).toStrictEqual({
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
      lang: 'es',
    });
  });
});