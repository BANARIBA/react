import { use } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

interface Props {
  element: React.JSX.Element;
}

export const PrivateRoutes = ({ element }: Props) => {
  const { authStatus } = use(UserContext);

  if (authStatus === "checking") return <div>Loading...</div>;
  if (authStatus === "authenticated") return element;
  return <Navigate to={"login"} replace />;
};
