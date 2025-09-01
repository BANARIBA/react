import { CustomHeader } from "./shared/components/CustomHeader";
import { PreviusSearches } from "./gifs/components/PreviusSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifsList } from "./gifs/components/GifsList";
import { useGifs } from "./gifs/hooks/useGifs";
export const GifsApp = () => {
  const { handleSearch, onLabelClicked, gifs, previousTerms } = useGifs();

  return (
    <>
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />

      <SearchBar placeholder="Buscar gifs" onQuery={handleSearch} />

      <PreviusSearches
        searches={previousTerms}
        onLabelClicked={onLabelClicked}
      />

      <GifsList gifs={gifs} />
    </>
  );
};
