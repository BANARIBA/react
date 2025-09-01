const myPromise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    // resolve(100);
    reject('Ese perro no me pago');
  }, 2000);
});

myPromise
  .then(data => console.log(`I have my money: ${data}`))
  .catch(error => console.error(error))
  .finally(() => console.log('Bueno ya se que clase de persona es!'));