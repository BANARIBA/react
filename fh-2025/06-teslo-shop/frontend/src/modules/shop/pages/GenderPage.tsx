import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../components/CustomJumbotron";
import { useParams } from "react-router";
import { ProductsGrid } from "../components/ProductsGrid";
import { useProducts } from "../hooks/useProducts";

export const GenderPage = () => {
  const { gender } = useParams();
  const genderLabel =
    gender === "men" ? "Hombre" : gender === "women" ? "Mujeres" : "Ninos";
  const { data: productsResponse } = useProducts();

  return (
    <>
      <CustomJumbotron title={`Todos para ${genderLabel}`} />
      <ProductsGrid products={productsResponse?.products || []} />
      <CustomPagination totalPages={productsResponse?.pages || 0} />
    </>
  );
};
