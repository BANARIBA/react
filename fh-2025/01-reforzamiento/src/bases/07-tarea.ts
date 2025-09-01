/*
  La funcion debe llamarse useState
  Debe retornar un arreglo con dos elementos
  #1 Un string el valor inicial
  #2 Una funcion anonima de flecha que
    recibe un string
    imprime un string
*/  

const useState = (name: string): [string, (newName: string) => void] => {
  return [name, (newName: string) => console.log(newName)];
}

const [name, setName] = useState('Goku');

console.log(name);
setName('Vegetta');