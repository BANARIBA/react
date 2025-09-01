import type { GiphyRandomResponse } from "../data/giphy.response";

const API_KEY: string = 'r18me0tEvp6ex7zhMbFNZVOCWmosoBg3';

const myRequest = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`);

const createImageInsideDom = (url: string) => {
  const imageElement = document.createElement('img');
  imageElement.src = url;
  document.body.append(imageElement);
}

myRequest
  .then((response) => response.json())
  .then(({ data }: GiphyRandomResponse) => {
    const imageUrl = data.images.original.url;
    createImageInsideDom(imageUrl);
  })
  .catch((error) => console.error(error));
