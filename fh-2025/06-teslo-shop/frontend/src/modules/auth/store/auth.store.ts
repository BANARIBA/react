import type { User } from "@/interfaces";
import { create } from "zustand";
import { checkAuthStatus, signIn } from "../services";

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  isAdmin: () => boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  checkAuthStatus: () => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",
  isAdmin: () => {
    const userRoles = get().user?.roles || [];
    return userRoles.includes("admin");
  },
  signIn: async (email: string, password: string) => {
    try {
      const data = await signIn(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      localStorage.removeItem("token");
      return false;
    }
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthStatus();
      localStorage.setItem("token", token);
      set({ user: user, token: token, authStatus: "authenticated" });
      return true;
    } catch {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      localStorage.removeItem("token");
      return false;
    }
  },
  logout: () => {
    set({ user: null, token: null, authStatus: "not-authenticated" });
    localStorage.removeItem("token");
  },
}));
