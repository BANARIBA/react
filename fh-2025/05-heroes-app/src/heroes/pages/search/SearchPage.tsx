import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotrom title="Busqueda de heroes" />

      <HeroStats />

      {/* Filtrado y busqueda */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
