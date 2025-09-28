import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <pre className="my-4 w-[80%]">{JSON.stringify(user, null, 2)}</pre>
      <Button variant={"destructive"} onClick={handleLogout}>Salir</Button>
    </div>
  );
};
