import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSummary } from "./useSummary";
import type { PropsWithChildren } from "react";
import { getSummary } from "../services/heroes.service";
import type { SummaryInformationResponse } from "../interfaces";

vi.mock('../services/heroes.service', () => ({
  getSummary: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummary);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSummary.test.ts", () => {
  test("should return the initial state", () => {
    const { result } = renderHook(() => useSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.summary).toBeUndefined();
  });

  test('should return success state when API call succeds', async () => {
    const mockSummaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: '1',
        name: 'Superman'
      },
      smartestHero: {
        id: '2',
        name: 'Batman'
      },
      heroCount: 18,
      villainCount: 2,
    } as SummaryInformationResponse;
    mockGetSummaryAction.mockResolvedValue(mockSummaryData);

    // Esto ejecuta el mock de arriba, con la informacion ficticia
    const { result } = renderHook(() => useSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  test('should return error state when API call fails', async () => {
    const mockError = new Error('Failed to fetch summary');
    mockGetSummaryAction.mockRejectedValue(mockError);
    const { result } = renderHook(() => useSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBeFalsy();
    expect(mockGetSummaryAction).toHaveBeenCalled();
    expect(result.current.error?.message).toBe('Failed to fetch summary');
  });
});
