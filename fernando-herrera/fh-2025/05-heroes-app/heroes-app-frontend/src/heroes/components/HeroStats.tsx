import { Badge } from "@/components/ui/badge";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatsCard } from "./HeroStatsCard";
import { useSummary } from "../hooks/useSummary";
import { use } from "react";
import { FavoriteHeroContext } from "@/store/context/FavoriteHeroContext";

export const HeroStats = () => {
  const { favoriteCount } = use(FavoriteHeroContext);
  const { summary } = useSummary();

  if (!summary) return (
    <div>Loading...</div>
  );
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatsCard
        title={"Total Characters"}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{summary?.totalHeroes ?? 0}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount ?? 0} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount ?? 0} Villains
          </Badge>
        </div>
      </HeroStatsCard>

      <HeroStatsCard
        title={"Favorites"}
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">
          {favoriteCount > 0 && summary?.totalHeroes ? Math.round((favoriteCount / summary.totalHeroes) * 100).toFixed(2) : 0.00}% of total
        </p>
      </HeroStatsCard>

      <HeroStatsCard
        title={"Strongest"}
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.strongestHero?.alias}</div>
        <p className="text-xs text-muted-foreground">
          Strength: 10/{summary?.strongestHero?.strength}
        </p>
      </HeroStatsCard>

      <HeroStatsCard
        title={"Smartest"}
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.smartestHero?.alias}</div>
        <p className="text-xs text-muted-foreground">
          Intelligence: 10/{summary?.smartestHero?.intelligence}
        </p>
      </HeroStatsCard>
    </div>
  );
};
