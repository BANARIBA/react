import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should render correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  // Probar el debourcer
  test("Should call onQuery with the correct value after typing in 700ms", async () => {
    const onQuery = vi.fn();
    const term: string = "Saitama";
    render(<SearchBar onQuery={onQuery} />);
    const inputHtm: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(inputHtm, { target: { value: term } });
    // screen.debug();

    // await new Promise((r) => setTimeout(r, 701));
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith(term);
    });
  });

  // Probar el efecto de limpiar el en el useeffect
  test("should call only once with the last value debouced", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const inputHtml: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(inputHtml, { target: { value: "t" } });
    fireEvent.change(inputHtml, { target: { value: "te" } });
    fireEvent.change(inputHtml, { target: { value: "tes" } });
    fireEvent.change(inputHtml, { target: { value: "test" } });
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call onQuery when button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const inputHtml: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.change(inputHtml, { target: { value: "test" } });

    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test");
  });

  test('should the input has the correct placeholder value', () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} placeholder="busca tus gifs favoritas aqui"/>);
    expect(screen.getByPlaceholderText('busca tus gifs favoritas aqui')).toBeDefined();
  });
});
