import { useState } from "react";

export const useCounter = (counterInitValue: number) => {

  const [counter, setCounter] = useState(counterInitValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleSubstract = () => {
    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(counterInitValue);
  };

  return {
    handleAdd,
    handleSubstract,
    handleReset,
    counter,
  };
}