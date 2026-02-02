import { tesloShopApi } from "@/api";
import type { AuthResponse } from "../interfaces";

export const signIn = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloShopApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
