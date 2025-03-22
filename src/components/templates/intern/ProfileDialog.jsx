import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Asegúrate de tener estos iconos disponibles

export function ProfileDialog({ user }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link
          className="text-darkpurple-title font-semibold py-1 px-3 rounded-lg hover:underline"
        >
          Perfil
        </Link>
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
