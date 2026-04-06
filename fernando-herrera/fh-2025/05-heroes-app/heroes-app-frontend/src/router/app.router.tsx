import { adminRouter } from "@/admin/admin.routes";
import { heroesRouter } from "@/heroes/heroes.routes";
import { createBrowserRouter, Navigate } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/heroes" />,
  },
  ...adminRouter,
  ...heroesRouter,
]);
