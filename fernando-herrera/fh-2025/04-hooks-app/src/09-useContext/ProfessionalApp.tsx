import { RouterProvider } from "react-router";
import { AppRouter } from "./router/AppRouter";
import { UserContextProvider } from "./providers/UserContextProvider";

export const ProfessionalApp = () => {
  return (
    <UserContextProvider>
      <div className="bg-gradient">
        <RouterProvider router={AppRouter}></RouterProvider>
      </div>
    </UserContextProvider>
  );
};
