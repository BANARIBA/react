import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);
    expect(
      screen.getByRole("heading", {
        level: 1,
      }).innerHTML
    ).toContain("Counter: 0");
    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  test("should increment the counter", () => {
    render(<MyCounterApp />);
    const labelH1 = screen.getByRole('heading', { level: 1 });
    const btnAdd = screen.getByRole('button', { name: '+1' });
    fireEvent.click(btnAdd);
    expect(labelH1.innerHTML).toContain(`Counter: ${1}`)
  });

  test("should decrement the counter", () => {
    render(<MyCounterApp />);
    const labelH1 = screen.getByRole('heading', { level: 1 });
    const btnSubstract = screen.getByRole('button', { name: '-1' });
    fireEvent.click(btnSubstract);
    expect(labelH1.innerHTML).toContain(`Counter: ${-1}`)
  });

  test("should reset the counter", () => {
    render(<MyCounterApp />);
    const labelH1 = screen.getByRole('heading', { level: 1 });
    const btnSubstract = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(btnSubstract);
    expect(labelH1.innerHTML).toContain(`Counter: ${0}`)
  });
});
