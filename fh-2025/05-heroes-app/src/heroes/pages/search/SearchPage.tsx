import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotrom title="Busqueda de heroes" />

      <CustomBreadcrumb
        currentPage="Buscador de heroes"
        breadcrumbs={[{ label: "Dashboard", to: "/" }]}
      />

      <HeroStats />

      {/* Filtrado y busqueda */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
