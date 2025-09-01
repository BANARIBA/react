const charactersNames = ['Goku', 'Vegeta', 'Trunks'];

const [goku, , trunks] = charactersNames;

console.log({ goku, trunks });

const arrayToFn = () => {
  return [123, 'ABC'];
}

const [numbers, letters] = arrayToFn();

console.log({ numbers, letters });