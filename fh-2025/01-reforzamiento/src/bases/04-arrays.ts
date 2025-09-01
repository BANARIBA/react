const myArrays: number[] = [1, 2, 3, 4, 5];
const myArray2: number[] = structuredClone(myArrays);

myArrays.push(11);
console.log({ myArrays, myArray2 });
// for (let num of myArrays) {
//   console.log({ num });
// }