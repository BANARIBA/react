import { Navigate, useParams } from "react-router";

export const HeroPage = () => {
  const params = useParams();
  const heroId: string | undefined = params.hero_id;
  if (!heroId) return <Navigate to="/heroes" replace />;
  return <div>HeroPage</div>;
};
