interface Hero {
  name: string;
  age: number;
  key: string;
  rank?: string;
}

const useContext = (hero: Hero) => {
  const { key, name, age, rank } = hero;
  return {
    keyname: key,
    user: {
      name: name,
      age: age,
    },
    rank: rank,
  };
}

const { rank, keyname, user: { name } } = useContext({
  age: 1000,
  key: 'Thor',
  name: 'Thor Hijo de Odin',
  rank: 'S'
});

console.log({
  rank,
  keyname,
  name
});