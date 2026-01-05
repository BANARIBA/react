import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "@/heroes/components/SearchControl";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { getHeroesByPage } from "@/heroes/services/heroes.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useMemo } from "react";

type HeroActiveTab = "all" | "favorites" | "heroes" | "villains";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page: string = searchParams.get("page") || "1";
  const limit: string = searchParams.get("limit") || "6";

  const activeTab: HeroActiveTab =
    (searchParams.get("tab") as HeroActiveTab) ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs: HeroActiveTab[] = [
      "all",
      "favorites",
      "heroes",
      "villains",
    ];
    if (validTabs.includes(activeTab)) {
      return activeTab;
    }
    return;
  }, [activeTab]);

  const updateTab = (tab: HeroActiveTab) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", tab);
      return params;
    });
  };

  const { data: heroesResponse } = useQuery({
    queryKey: ["heroesByPage", { page: page, limit: limit }],
    queryFn: () => getHeroesByPage(+page, +limit),
    staleTime: 1000 * 60 * 5, // 5 minutes la informacion estara fresca si la llamo en otro lugar en ese tiempo estara cacheada
  });

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotrom
          title={"Universo de superheroes"}
          description={
            "Descubre, explora y administra tus superhéroes y villanos favoritos"
          }
        />

        <CustomBreadcrumbs currentPage="Super heroes" breadcrumbs={[]} />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}
        <SearchControl />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => updateTab("all")}>
              All Characters (16)
            </TabsTrigger>

            <TabsTrigger
              value="favorites"
              onClick={() => updateTab("favorites")}
            >
              Favorites (3)
            </TabsTrigger>

            <TabsTrigger value="heroes" onClick={() => updateTab("heroes")}>
              Heroes (12)
            </TabsTrigger>

            <TabsTrigger value="villains" onClick={() => updateTab("villains")}>
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          {/* <TabsContent value="favorites" className="mt-4">
            <h1>Favoritos</h1>
            <HeroGrid />
          </TabsContent>

          <TabsContent value="heroes" className="mt-4">
            <h1>Heroes</h1>
            <HeroGrid />
          </TabsContent>

          <TabsContent value="villains" className="mt-4">
            <h1>Villanos</h1>
            <HeroGrid />
          </TabsContent> */}
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 0} />
      </>
    </>
  );
};
