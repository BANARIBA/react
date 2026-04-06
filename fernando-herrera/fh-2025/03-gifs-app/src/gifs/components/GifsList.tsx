import type { FC } from "react";
import type { Gif } from "../interfaces/gif.interface";
// import type { Gif } from "../../data/gifs.data";

interface GifsListProps {
  gifs: Gif[];
}

export const GifsList: FC<GifsListProps> = ({ gifs = [] }) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img src={gif.url} alt={gif.title} />
          <h3>{gif.title}</h3>
          <p>
            {gif.width}x{gif.height} (1.5mb)
          </p>
        </div>
      ))}
    </div>
  );
};
