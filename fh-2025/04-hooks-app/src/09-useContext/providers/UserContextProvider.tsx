import { useEffect, useState } from "react";
import type { AuthStatus } from "../interfaces";
import { users, type User } from "../data/user.data";
import { UserContext } from "../context/UserContext";

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (user_id: number) => {
    const user = users.find((u) => u.id === user_id);
    if (!user) {
      console.log("User not found ", user_id);
      setUser(null);
      setAuthStatus("not-authenticated");
      return false;
    }
    setUser(user);
    setAuthStatus("authenticated");
    localStorage.setItem("user_id", user_id.toString());
    return true;
  };

  const handleLogout = () => {
    console.log("Cerraste sesion");
    setUser(null);
    setAuthStatus("not-authenticated");
    localStorage.removeItem("user_id");
  };

  useEffect(() => {
    const storeUserId = localStorage.getItem("user_id");
    if (storeUserId) {
      handleLogin(+storeUserId);
      return;
    } else {
      handleLogout();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        authStatus: authStatus,
        isAuthenticated: authStatus === "authenticated",
        user: user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
