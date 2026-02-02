import { tesloShopApi } from "@/api";
import type { ProductsResponse } from "@/interfaces";

export interface Options {
  query?: string; 
  limit?: number | string;
  offset?: number | string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string;
  gender?: string;
}

export const getProducts = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, query, sizes, gender, minPrice, maxPrice } = options;
  const { data } = await tesloShopApi.get<ProductsResponse>("/products", {
    params: {
      q: query,
      sizes,
      gender,
      minPrice,
      maxPrice,
      limit,
      offset,
    },
  });
  return {
    ...data,
    products: data.products.map((p) => ({
      ...p,
      images: p.images.map(
        (img) =>
          `${import.meta.env.VITE_API_TESLO_SHOP_URL + "/files/product/" + img}` as string,
      ),
    })),
  };
};
