import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
  id: number;
  productName: string;
  quantity: number;
}

const itemsInCart: ItemInCart[] = [
  { id: 1, productName: "Nintendo Swtich II", quantity: 1 },
  { id: 2, productName: "Pro Controller", quantity: 0 },
  { id: 3, productName: "Xbox Series S", quantity: 0 },
  { id: 4, productName: "Xbox Series X", quantity: 0 },
  { id: 5, productName: "POCO X7 PRO", quantity: 0 },
];

export const FirstStepsApp = () => {
  return (
    <>
      <h1>Carrito de compras</h1>
      {itemsInCart.map((itemInCart) => (
        <ItemCounter
          key={itemInCart.id}
          quantity={itemInCart.quantity}
          name={itemInCart.productName}
        />
      ))}
    </>
  );
};
