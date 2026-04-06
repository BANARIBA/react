import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";

describe("ItemCounter", () => {
  test("should render with default values", () => {
    const name: string = "Control de Nintendo Switch II";

    render(<ItemCounter name={name} />);

    expect(screen.getByText(name)).toBeDefined();
  });

  test("should render with custom quantity", () => {
    const name: string = "PS5 Controller";
    const quantity: number = 10;

    render(<ItemCounter name={name} quantity={quantity} />);

    expect(screen.getByText(quantity)).toBeDefined();
  });

  test("should increase count when +1 button is pressed", () => {
    const name: string = "PS5 Controller";
    const quantity: number = 10;
    render(<ItemCounter name={name} quantity={quantity} />);

    const [btnAdd] = screen.getAllByRole("button");
    fireEvent.click(btnAdd);

    expect(screen.getByText(`${quantity + 1}`)).toBeDefined();
  });

  test("should decrease count when -1 is pressed and quantity to be equals 5", () => {
    const name: string = "PS5 Controller";
    const quantity: number = 5;
    render(<ItemCounter name={name} quantity={quantity} />);

    const [, btnSubstract] = screen.getAllByRole("button");
    fireEvent.click(btnSubstract);

    expect(screen.getByText(`${quantity - 1}`)).toBeDefined();
  });

  test("should not decrease count when -1 button is pressed and quantity to be equals 1", () => {
    const name: string = "PS5 Controller";
    const quantity: number = 1;

    render(<ItemCounter name={name} quantity={quantity} />);
    const [, btnSubstract] = screen.getAllByRole("button");
    fireEvent.click(btnSubstract);

    expect(screen.getByText(`${quantity}`)).toBeDefined();
  });

  test('should change to red when count is one', () => {
    const name: string = "PS5 Controller";
    const quantity: number = 1;
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    expect(itemText).toBeDefined();
    expect(itemText.style.color).toBe('red');
  });

    test('should change to black when count greather than one', () => {
    const name: string = "PS5 Controller";
    const quantity: number = 2;
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);
    
    expect(itemText).toBeDefined();
    expect(itemText.style.color).toBe('black');
  });
});
