import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useHero } from "./useHero";
import { getHeroesByPage } from "../services/heroes.service";

vi.mock("../services/heroes.service", () => ({
  getHeroesByPage: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPage);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tanStackCustomProvider = () => {

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHero.tsx", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

  test("should return the initial state", () => {
    const { result } = renderHook(() => useHero(1, 6, "all"), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  test("should return success state with data when API call succeds", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => useHero(1, 6, "all"), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');
  });

  test("should call getHeroesByPage with arguments", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => useHero(1, 6, "heroes"), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'heroes');
  });
});
