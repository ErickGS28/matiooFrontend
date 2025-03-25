import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Asegúrate de tener estos iconos disponibles
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { logout } from "@/services/utils/authUtils";

export function ProfileDialog({ user }) {
  const navigate = useNavigate();

  const isExpanded = true;

  const [showPassword, setShowPassword] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    // Eliminar el token del localStorage
    logout();
    // Redirigir a la página de inicio de sesión
    navigate("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] hover:scale-105  px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
              Perfil
            </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Perfil
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-12 m-[2em]">
          <div className="flex flex-col">
            <img
              src="/interDialog.png"
              alt="inter"
              className="w-full h-auto max-w-[200px] mb-4"
            />
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Usuario
                </Label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                />
              </div>
              <div className="relative">
                <Label className="text-darkpurple-title font-medium">
                  Contraseña
                </Label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={editedUser.password}
                  onChange={handleInputChange}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-9 mr-3 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={`flex items-center mt-3 ${
                      isExpanded
                        ? "justify-start gap-4 h-10 w-[90%] px-4 rounded-2xl"
                        : "justify-center w-[2.5em] h-[2.5em] rounded-full"
                    } cursor-pointer bg-red-bg-icon transition-all duration-300 ease-in-out hover:scale-105`}
                  >
                    <img
                      src="/asidebarIMG/closeAccount.png"
                      alt="Cerrar sesión"
                      className="w-[1em] min-w-[1em] flex-shrink-0"
                    />
                    <span className="text-white">Cerrar sesión</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-4 ml-[4em] bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-800">
                      ¿Estás seguro que deseas cerrar sesión?
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        onClick={handleLogout}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
