import axios from "axios";

export const tesloShopApi = axios.create({
  baseURL: import.meta.env.VITE_API_TESLO_SHOP_URL,
});

tesloShopApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});