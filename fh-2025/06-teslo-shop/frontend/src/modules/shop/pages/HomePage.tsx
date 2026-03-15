import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../components/CustomJumbotron";
import { ProductsGrid } from "../components/ProductsGrid";
import { products } from "@/mock/products.mock";

export const HomePage = () => {
  return (
    <>
      <CustomJumbotron title={"Todos los Productos"} />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={7} />
    </>
  );
};
