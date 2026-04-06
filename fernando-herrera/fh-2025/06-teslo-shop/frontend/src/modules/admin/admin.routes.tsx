import { lazy } from "react";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminProductsPage } from "./pages/AdminProductsPage";
import { AdminProductPage } from "./pages/AdminProductPage";
import type { RouteObject } from "react-router";

const AdminLayout = lazy(() => import("./layouts/AdminLayout"));

export const adminRoutes: RouteObject = {
  path: "admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <DashboardPage />,
    },
    {
      path: "products",
      element: <AdminProductsPage />,
    },
    {
      path: "products/:id",
      element: <AdminProductPage />,
    },
  ],
};
