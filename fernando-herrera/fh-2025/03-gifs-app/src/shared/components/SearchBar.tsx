import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Buscar",
  onQuery,
}: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onQuery(query);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeout);
      // console.log('Limpiando buscador');
    }
  }, [query, onQuery]);

  return (
    <div className="search-container">
      <input
        type="text"
        name=""
        id=""
        placeholder={placeholder}
        value={query}
        onChange={handleInputSearch}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
