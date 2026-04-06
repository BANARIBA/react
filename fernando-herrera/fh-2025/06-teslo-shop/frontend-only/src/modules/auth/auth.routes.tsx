import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router";
import { SignInPage } from "./pages/SignInPage";
import { NewAccountPage } from "./pages/NewAccountPage";

const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

export const authRoutes: RouteObject = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="sign-in" />,
    },
    {
      path: "sign-in",
      element: <SignInPage />,
    },
    {
      path: "new-account",
      element: <NewAccountPage />,
    },
  ],
};
