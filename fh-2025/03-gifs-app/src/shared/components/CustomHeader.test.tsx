import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe('Custom Header', () => {
  test('should render the title correctly', () => {
    const title: string = 'Test title';
    render(<CustomHeader title={title} />);
    expect(screen.getByText(title));
  });

  test('should render the description when provided', () => {
    const title: string = 'Test title';
    const description: string = 'Test description';
    render(<CustomHeader title={title} description={description} />);
    expect(screen.getByText(description));
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBeDefined();
  });

  test('should not render description when not provided', () => {
    const title: string = 'Test title';
    const {container} = render(<CustomHeader title={title} />);
    const pElement = container.querySelector("p");
    expect(pElement).toBeFalsy();
  });
});