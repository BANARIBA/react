import { lazy } from "react";
import { Navigate } from "react-router";
import { SignInPage } from "./pages/SignInPage";
import { NewAccountPage } from "./pages/NewAccountPage";

const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={"/auth/sign-in"} />,
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/new-account",
      element: <NewAccountPage />,
    },
  ],
};
