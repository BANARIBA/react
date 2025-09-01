import type { GiphyRandomResponse } from "../data/giphy.response";

const API_KEY: string = 'r18me0tEvp6ex7zhMbFNZVOCWmosoBg3';

const createImageInsideDom = (url: string) => {
  const imageElement = document.createElement('img');
  imageElement.src = url;
  document.body.append(imageElement);
}

const getImageUrl = async (): Promise<string> => {
  const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`);
  const { data }: GiphyRandomResponse = await res.json();
  return data.images.original.url;
}

getImageUrl()
  .then(url => createImageInsideDom(url));
