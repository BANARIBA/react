import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifsActions from "../actions/get-gits-by-query.action";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());
    expect(result.current.gifs).toBeDefined();
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.onLabelClicked).toBeDefined();
    expect(result.current.previousTerms).toBeDefined();
    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());
    const term: string = "satoru gojo";
    await act(async () => {
      await result.current.handleSearch(term);
    });
    result.current.gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.url).toBe("string");
    });
  });

  test("should return a list of gifs when handle term click is called", async () => {
    const { result } = renderHook(() => useGifs());
    const query: string = "goku";
    await act(async () => {
      await result.current.onLabelClicked(query);
    });
    result.current.gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.url).toBe("string");
    });
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.onLabelClicked("naruto");
    });

    expect(result.current.gifs.length).toBeLessThanOrEqual(10);
    vi.spyOn(gifsActions, "getGifsByQuery").mockRejectedValue(
      new Error("getGifsByQuery should not be called")
    );

    await act(async () => {
      await result.current.onLabelClicked("naruto");
    });
  });

  test("should return not more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifsActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("naruto");
    });

    await act(async () => {
      await result.current.handleSearch("goku");
    });
    await act(async () => {
      await result.current.handleSearch("luffy");
    });
    await act(async () => {
      await result.current.handleSearch("vegeta");
    });
    await act(async () => {
      await result.current.handleSearch("sasuke");
    });
    await act(async () => {
      await result.current.handleSearch("kakashi");
    });
    await act(async () => {
      await result.current.handleSearch("itachi");
    });
    await act(async () => {
      await result.current.handleSearch("minato");
    });
    await act(async () => {
      await result.current.handleSearch("satoru gojo");
    });
    expect(result.current.previousTerms).toStrictEqual([
      "satoru gojo",
      "minato",
      "itachi",
      "kakashi",
      "sasuke",
      "vegeta",
      "luffy",
      "goku",
    ]);
  });
});
