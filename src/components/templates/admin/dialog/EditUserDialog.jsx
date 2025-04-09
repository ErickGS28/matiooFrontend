import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function EditUserDialog({ user, onSave }) {
  const [formData, setFormData] = React.useState({
    id: user.id,
    fullName: `${user.name} ${user.lastname}`.trim(),
    username: user.username || "",
    email: user.email || "",
    location: user.location || "",
    role: user.role || "RESPONSIBLE",
  });

  React.useEffect(() => {
    setFormData({
      id: user.id,
      fullName: `${user.name} ${user.lastname}`.trim(),
      username: user.username || "",
      email: user.email || "",
      location: user.location || "",
      role: user.role || "RESPONSIBLE",
    });
  }, [user]);

  const handleSave = () => {
    const userData = {
      id: formData.id,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      location: formData.location,
      role: formData.role,
    };

    onSave(userData);
  };

  const translateRole = (role) => {
    const roleMap = {
      ADMIN: "Admin",
      INTERN: "Becario",
      RESPONSIBLE: "Responsable",
    };
    return roleMap[role] || role;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src="/action.png"
          alt="Actions"
          className="w-[1.25em] h-[1.25em] cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </DialogTrigger>
      <DialogContent className="w-[30%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Editar {translateRole(user.role)}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Complete los campos para editar la información del usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Nombre completo</Label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="border-purple-900 shadow-sm rounded-md focus:border-purple-500 focus:ring-purple-500 mt-2 mb-1 w-full border-1 px-4 py-1 bg-transparent"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Nombre de usuario</Label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                className="border-purple-900 shadow-sm rounded-md focus:border-purple-500 focus:ring-purple-500 mt-2 mb-1 w-full border-1 px-4 py-1 bg-transparent"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Correo electrónico</Label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="border-purple-900 shadow-sm rounded-md focus:border-purple-500 focus:ring-purple-500 mt-2 mb-1 w-full border-1 px-4 py-1 bg-transparent"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Lugar</Label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="border-purple-900 shadow-sm rounded-md focus:border-purple-500 focus:ring-purple-500 mt-2 mb-1 w-full border-1 px-4 py-1 bg-transparent"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
