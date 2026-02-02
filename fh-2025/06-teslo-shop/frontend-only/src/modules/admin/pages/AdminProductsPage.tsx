import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminTitle } from "../components/AdminTitle";
import { Link } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AdminProductsPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos"
        />

        <div className="flex.justify-end.mb-10.gap-4">
          <Link to={"/admin/products/new"}>
            <Button>
              <PlusIcon className="w-4 h-4" /> Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>
      <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <img
                src="https://placehold.co/250x250"
                alt="Producto"
                className="w-20 h-20 object-cover rounded-md"
              />
            </TableCell>
            <TableCell>Producto 1</TableCell>
            <TableCell>$250.00</TableCell>
            <TableCell>Electrónica</TableCell>
            <TableCell>10</TableCell>
            <TableCell>S, M, L, XL</TableCell>
            <TableCell className="text-right">
              <Link
                to="/admin/products/1"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Editar
              </Link>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Eliminar
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CustomPagination totalPages={10} />
    </>
  );
};
