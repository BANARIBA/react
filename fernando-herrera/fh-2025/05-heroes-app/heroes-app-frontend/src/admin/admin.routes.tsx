import { lazy } from "react";
import { AdminLayout } from "./AdminLayout";

const AdminPage = lazy(() => import("./pages/AdminPage"));

export const adminRouter = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ index: true, element: <AdminPage /> }],
  },
];
