import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";

describe('useCounter', () => {
  // let result;
  // beforeEach(() => {
  //   const initValue: number = 10;
  //   const { result: hookValue } = renderHook(() => useCounter(initValue));
  //   result = hookValue;
  // });

  test('should initialize with default value of 10', () => {
    const initValue: number = 10;
    const { result } = renderHook(() => useCounter(initValue));
    expect(result.current.counter).toBe(initValue);
  });

  test('should increment counter when handleAdd is called', () => {
    const initValue: number = 10;
    const { result } = renderHook(() => useCounter(initValue));
    // Cada vez que se ejecute algo que cause un rerender en react en el testing se usa esto
    act(() => {
      result.current.handleAdd();
    });
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(initValue + 2);
  });

  test('should decrement counter when handleSubstract is called', () => {
    const initValue: number = 10;
    const { result } = renderHook(() => useCounter(initValue));
    act(() => {
      result.current.handleSubstract();
    });
    expect(result.current.counter).toBe(initValue - 1);
  });

  test('should reset counter when handleReset is called', () => {
    const initValue: number = 10;
    const { result } = renderHook(() => useCounter(initValue));
    act(() => {
      result.current.handleAdd();
      result.current.handleAdd();
    });
    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(initValue);
  });
});