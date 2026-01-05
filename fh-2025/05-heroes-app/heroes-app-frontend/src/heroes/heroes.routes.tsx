import { Navigate } from "react-router";
import { HeroesLayout } from "./HeroesLayout";
import { HeroPage } from "./pages/HeroPage";
import { lazy } from "react";
import { HomePage } from "@/home/pages/HomePage";

const SearchPage = lazy(() => import("./pages/SearchPage"));

export const heroesRouter = [
  {
    path: "/heroes",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "hero/:hero_id",
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "",
        element: <Navigate to="/heroes" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/heroes" />,
      },    ],
  },
];
