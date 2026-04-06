import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "../components/HeroStats";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { SearchControl } from "../components/SearchControl";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchHeroBy } from "../services/heroes.service";
import { HeroGrid } from "../components/HeroGrid";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data = [] } = useQuery({
    queryKey: ["search-hero-by", { name, strength }],
    queryFn: () => searchHeroBy({ name, strength }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

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

      <SearchControl />

      <HeroGrid heroes={data} />
    </>
  );
};

export default SearchPage;
