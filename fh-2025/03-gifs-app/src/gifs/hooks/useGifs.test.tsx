import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useGifs } from "./useGifs";

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
});
