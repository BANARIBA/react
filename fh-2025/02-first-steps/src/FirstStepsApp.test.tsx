/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { FirstStepsApp } from "./FirstStepsApp";

// Funcion que cuando se llama, puede hacer retornos pero de data ficticia
const mockItemCounter = vi.fn((_props: unknown) => {
  return <div data-testid="ItemCounter" />;
});

vi.mock("./shopping-cart/ItemCounter.tsx", () => ({
  ItemCounter: (props: unknown) => mockItemCounter(props),
}));

// Creacion de mock data
// vi.mock("./shopping-cart/ItemCounter.tsx", () => ({
//   ItemCounter: (props: unknown) => <div data-testid="ItemCounter" name={props.name} quantity={props.quantity} />
// }));

describe("FirstStepsApp", () => {
  afterEach(() => vi.clearAllMocks()); // limpia los mocks por que yo aqui hago 3 test y el mock tiene 5 datos, por ende se llamaria 3*5 = 15 veses

  test("should match snapshot", () => {
    const { container } = render(<FirstStepsApp />);
    expect(container).toMatchSnapshot();
  });

  test("should render the correct number of ItemCounter components", () => {
    render(<FirstStepsApp />);
    // Usando el mock data
    const itemCounters = screen.getAllByTestId("ItemCounter");
    expect(itemCounters.length).toBe(5);
  });

  test("should render ItemCounter with correct props", () => {
    render(<FirstStepsApp />);
    expect(mockItemCounter).toHaveBeenCalledTimes(5);
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Nintendo Swtich II",
      quantity: 1,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Pro Controller",
      quantity: 0,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Xbox Series S",
      quantity: 0,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Xbox Series X",
      quantity: 0,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "POCO X7 PRO",
      quantity: 0,
    });
  });
});
