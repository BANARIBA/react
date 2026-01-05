import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "../components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotrom
        title={"Universo de superheroes"}
        description={
          "Descubre, explora y administra tus superhéroes y villanos favoritos"
        }
      />

      <CustomBreadcrumbs
        currentPage="Buscador de heroes"
        breadcrumbs={[
          {
            label: "home",
            to: "/",
          },
          {
            label: "home dos",
            to: "/2",
          },
          {
            label: "home tres",
            to: "/3",
          },
        ]}
      />

      <HeroStats />

      <div>SearchPage</div>
    </>
  );
};

export default SearchPage;
