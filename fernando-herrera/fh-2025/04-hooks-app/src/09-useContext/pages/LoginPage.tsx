import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { toast } from "sonner";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [userId, setUserId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = login(+userId);
    if (!result) {
      toast.error('Usuario no encontrado');
      return;
    }
    navigate('/profile');
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl font-bold">Iniciar sesion</h1>
      <hr />
      <form className="flex flex-col gap-2 my-10" onSubmit={handleSubmit}>
        <Input 
          type="number" 
          placeholder="Id del usuario"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <Button type="submit">Iniciar sesion</Button>
        <Link to={"/about"}>
          <Button variant={"ghost"}>Volver a la pagina principal</Button>
        </Link>
      </form>
    </div>
  );
};
