import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gits-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const onLabelClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
    } else {
      const gifs = await getGifsByQuery(term);
      setGifs(gifs);
      gifsCache.current[term] = gifs;
    }
  };

  const handleSearch = async (query: string) => {
    if (query.trim().length === 0) return;
    if (previousTerms.includes(query)) return;
    const newPreviusTerms = [
      query.trim().toLowerCase(),
      ...previousTerms,
    ].slice(0, 8);
    setPreviousTerms(newPreviusTerms);
    const gifsData = await getGifsByQuery(query);
    // console.log(gifsData)
    setGifs(gifsData);
    gifsCache.current[query] = gifsData;
  };

  return {
    gifs,
    previousTerms,
    onLabelClicked,
    handleSearch,
  };
}