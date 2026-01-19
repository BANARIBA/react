import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { FavoriteHeroProvider } from "../provider/FavoriteHeroProvider";
import { FavoriteHeroContext } from "./FavoriteHeroContext";
import { use } from "react";
import type { Hero } from "@/heroes/interfaces";

const mockHero = {
  id: "1",
  name: "batman",
};

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>
      <div data-testid="favorite-list">
        {favorites.map((f) => (
          <div key={f.id} data-testid={`hero-${f.id}`}>
            {f.name}
          </div>
        ))}
      </div>

      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHero as Hero)}
      >
        Toggle Favorite
      </button>
      <div data-testid="is-favorite">{isFavorite(mockHero.id).toString()}</div>
    </div>
  );
};

const renderContextTestComponent = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>,
  );
};

describe("FavoriteHeroContextProps.tsx", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("should initialize with default values", () => {
    renderContextTestComponent();
    // screen.debug()
    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  test("should add hero to favorites when togglefavorite is called with new hero", () => {
    renderContextTestComponent();
    const btn = screen.getByTestId("toggle-favorite");
    fireEvent.click(btn);
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");
    expect(localStorage.getItem('favoriteHeroes')).toBe('[{"id":"1","name":"batman"}]');
  });

  test("should remove hero to favorites when togglefavorite is called with hero", () => {
    localStorage.setItem('favoriteHeroes', JSON.stringify([mockHero]));
    
    
    renderContextTestComponent();
    expect(screen.getByTestId('favorite-count').textContent).toBe('1');
    expect(screen.getByTestId('is-favorite').textContent).toBe('true');
    expect(screen.getByTestId('hero-1').textContent).toBe('batman');
    
    screen.debug();
    const btn = screen.getByTestId("toggle-favorite");
    fireEvent.click(btn);

    expect(screen.getByTestId('favorite-count').textContent).toBe('0');
    expect(screen.getByTestId('is-favorite').textContent).toBe('false');
    expect(screen.queryByTestId('hero-1')).toBeNull();

  });
});
