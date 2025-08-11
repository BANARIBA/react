interface Person {
  firstName: string;
  lastName: string;
  age: number;
  address: Address;
}

interface Address {
  postalCode: number;
  country: string;
  city: string;
}

const ironMan: Person = {
  firstName: "Tony",
  lastName: "Stark",
  age: 45,
  address: {
    postalCode: 123456,
    country: "USA",
    city: "New York",
  },
};

const spiderMan: Person = structuredClone(ironMan);

spiderMan.firstName = "Peter";
spiderMan.lastName = "Parker";
spiderMan.age = 18;
spiderMan.address.city = "Queens";

console.log({ ironMan, spiderMan });
