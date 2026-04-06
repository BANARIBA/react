import { lazy } from "react";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProdutPage";
import { GenderPage } from "./pages/GenderPage";
import type { RouteObject } from "react-router";

const ShopLayout = lazy(() => import("./layouts/ShopLayout"));

export const shopRoutes: RouteObject = {
  path: "/",
  element: <ShopLayout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "product/:idSlug",
      element: <ProductPage />,
    },
    {
      path: "gender/:gender",
      element: <GenderPage />,
    },
  ],
};
