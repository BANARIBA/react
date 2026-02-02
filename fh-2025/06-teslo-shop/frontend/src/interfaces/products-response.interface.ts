import type { Product } from "./products.interface";

export interface ProductsResponse {
  count: number;
  pages: number;
  products: Product[];
}

export type Size = "L" | "M" | "S" | "XL" | "XS" | "XXL";
export type Gender = "kid" | "men" | "women" | "unisex";


