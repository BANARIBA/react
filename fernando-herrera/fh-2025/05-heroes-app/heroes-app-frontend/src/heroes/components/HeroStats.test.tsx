import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSummary } from "../hooks/useSummary";
import type { SummaryInformationResponse } from "../interfaces";

vi.mock("../hooks/useSummary");
const mockSummaryData: SummaryInformationResponse = {
  totalHeroes: 25,
  strongestHero: {
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
    image: "1.jpeg",
    firstAppearance: "1938",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  smartestHero: {
    id: "2",
    name: "Bruce Wayne",
    slug: "bruce-wayne",
    alias: "Batman",
    powers: [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico",
    ],
    description:
      "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: "Liga de la Justicia",
    image: "2.jpeg",
    firstAppearance: "1939",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  heroCount: 18,
  villainCount: 7,
};
const mockUseSummary = vi.mocked(useSummary);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>) => {
  if (mockData) {
    mockUseSummary.mockReturnValue({
      summary: mockData,
    } as unknown as ReturnType<typeof useSummary>);
  } else {
    mockUseSummary.mockReturnValue({
      summary: undefined,
    } as unknown as ReturnType<typeof useSummary>);
  }

  return render(
    <QueryClientProvider client={queryClient}>
      <HeroStats />
    </QueryClientProvider>,
  );
};

describe("HeroStats.tsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render component with default values", () => {
    const { container } = renderHeroStats();
    // screen.debug();
    expect(screen.getByText("Loading...")).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test("should render component with a real data hero values", () => {
    const { container } = renderHeroStats(mockSummaryData);
    expect(container).toMatchSnapshot();
    screen.debug();
    expect(screen.getByText('Total Characters')).toBeDefined();
    expect(screen.getByText('Favorites')).toBeDefined();
    expect(screen.getByText('Strongest')).toBeDefined();
  });
});
