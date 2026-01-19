import { createBrowserRouter, Navigate } from "react-router";
import { authRoutes } from "./modules/auth/auth.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { shopRoutes } from "./modules/shop/shop.routes";

export const appRouter = createBrowserRouter([
  shopRoutes,
  authRoutes,
  adminRoutes,
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
