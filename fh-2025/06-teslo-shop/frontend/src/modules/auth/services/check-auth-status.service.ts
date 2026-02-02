import { tesloShopApi } from "@/api";
import type { AuthResponse } from "../interfaces";

export const checkAuthStatus = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  try {
    const { data } = await tesloShopApi.get<AuthResponse>("/auth/check-status");
    localStorage.setItem("token", data.token);
    return data;
  } catch {
    localStorage.removeItem("token");
    throw new Error("Token not valid or expired");
  }
};
