import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../components/CustomJumbotron";
import { ProductsGrid } from "../components/ProductsGrid";
import { products } from "@/mock/products.mock";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();
  const genderLabel =
    gender === "men" ? "Hombre" : gender === "women" ? "Mujeres" : "Ninos";
  return (
    <>
      <CustomJumbotron title={`Todos para ${genderLabel}`} />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={7} />
    </>
  );
};
