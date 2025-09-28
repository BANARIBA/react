import { createBrowserRouter, Navigate } from "react-router";
import { AboutPage } from "../pages/AboutPage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />,
  },
  {
    path: "/profile",
    element: <PrivateRoutes element={<ProfilePage />} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
