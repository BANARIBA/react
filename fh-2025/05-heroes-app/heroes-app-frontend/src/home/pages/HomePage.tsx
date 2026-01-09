import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "@/heroes/components/SearchControl";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { useSummary } from "@/heroes/hooks/useSummary";
import { useHero } from "@/heroes/hooks/useHero";
import type { HeroActiveTab } from "@/heroes/types";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { summary } = useSummary();

  const page: string = searchParams.get("page") || "1";
  const limit: string = searchParams.get("limit") || "6";
  const category: HeroActiveTab =
    (searchParams.get("category") as HeroActiveTab) || "all";

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
      switch (tab) {
        case "all":
          params.set("category", "all");
          break;
        case "favorites":
          params.set("category", "favorite");
          break;
        case "heroes":
          params.set("category", "hero");
          break;
        case "villains":
          params.set("category", "villain");
          break;
      }
      params.set("page", "1"); // Reset to first page when tab changes
      return params;
    });
  };

  const { data: heroesResponse } = useHero(+page, +limit, category);

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
            {summary?.heroCount && summary?.villainCount ? (
              <TabsTrigger value="all" onClick={() => updateTab("all")}>
                All ({summary?.totalHeroes ?? 0})
              </TabsTrigger>
            ) : (
              <TabsTrigger value="all" onClick={() => updateTab("all")}>
                All
              </TabsTrigger>
            )}

            <TabsTrigger
              value="favorites"
              onClick={() => updateTab("favorites")}
            >
              Favorites (3)
            </TabsTrigger>

            <TabsTrigger value="heroes" onClick={() => updateTab("heroes")}>
              Heroes ({summary?.heroCount ?? 0})
            </TabsTrigger>

            <TabsTrigger value="villains" onClick={() => updateTab("villains")}>
              Villains ({summary?.villainCount ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            <HeroGrid heroes={heroesResponse ? heroesResponse.heroes : []} />
          </TabsContent>

          <TabsContent value="heroes" className="mt-4">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="villains" className="mt-4">
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 0} />
      </>
    </>
  );
};
