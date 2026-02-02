import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../components/CustomJumbotron";
import { ProductsGrid } from "../components/ProductsGrid";
import { useProducts } from "../hooks/useProducts";

export const HomePage = () => {
  const { data: productsResponse } = useProducts();
  return (
    <>
      <CustomJumbotron title={"Todos los Productos"} />
      <ProductsGrid products={productsResponse?.products || []} />
      <CustomPagination totalPages={productsResponse?.pages || 0} />
    </>
  );
};
