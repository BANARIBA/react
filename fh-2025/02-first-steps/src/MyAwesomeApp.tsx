import type { CSSProperties } from "react";

export const MyAwesomeApp = () => {
  const name = "Vegeta";
  const lastName = "Perez";
  const favoriteGames = ["Elden Ring", "Smash", "Metal Gear Solid"];
  const isActive = true;
  const address = {
    zipCode: "abc123",
    country: "Canada",
  };
  const myStyles: CSSProperties = {
    backgroundColor: isActive ? "green" : "crimson",
    borderRadius: 10,
    padding: 10,
  };

  return (
    <>
      <h1 data-testid="first-name-title">{name}</h1>
      <h3>{lastName}</h3>
      <h1>{isActive ? "S" : "N"}</h1>
      <p>{favoriteGames.join(", ")}</p>
      <p style={myStyles}>{JSON.stringify(address)}</p>
    </>
  );
};
