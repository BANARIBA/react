import { useState } from "react";

import styles from "./ItemCounter.module.css";

interface ItemCounterProps {
  name: string;
  quantity?: number;
}

export const ItemCounter = ({ name, quantity = 1 }: ItemCounterProps) => {
  const [itemCounter, setItemCounter] = useState<number>(quantity);

  const handleSubstract = (quantity: number) => {
    if (itemCounter === 1) return;
    setItemCounter(itemCounter - quantity);
  };

  const handleAdd = (quantity: number) => {
    setItemCounter(itemCounter + quantity);
  };

  return (
    <section className={styles['item-row']}>
      <span className={styles["item-text"]} style={{ color: itemCounter === 1 ? 'red' : 'black' }}>{name}</span>
      <button onClick={() => handleAdd(1)}>+1</button>
      <span>{itemCounter}</span>
      <button onClick={() => handleSubstract(1)}>-1</button>
    </section>
  );
};
