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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Assign } from "./Assing";

export function ViewUserDialog({ user }) {
  // Función para traducir los roles a un formato más amigable
  const translateRole = (role) => {
    const roleMap = {
      'ADMIN': 'Admin',
      'INTERN': 'Becario',
      'RESPONSIBLE': 'Responsable'
    };
    return roleMap[role] || role;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300 cursor-pointer">Ver</Button>
      </DialogTrigger>
      <DialogContent className="w-[40%] min-w-[425px]  h-[70%]  max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Ver {translateRole(user.role)}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <div className="flex flex-col items-center mt-4">
            {/* Imagen de perfil */}
            <img
              src={user.role === "INTERN" ? "/becarios.png" : user.role === "RESPONSIBLE" ? "/responsible.png" : "/admin.png"}
              alt={translateRole(user.role)}
              className="w-full h-auto max-w-[200px] shadow-lg mb-5"
            />
            <div className="grid grid-cols-2 gap-16 w-full mt-3 px-5">
              {/* Columna 1 */}
              <div className="flex flex-col items-start w-full">
                <div className="grid grid-cols-1 gap-2 w-full mb-2">
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Nombre completo</h3>
                    <p className="text-gray-600">{user.name} {user.lastname}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Nombre de usuario</h3>
                    <p className="text-gray-600">{user.username || "No asignado"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Correo electrónico</h3>
                    <p className="text-gray-600">{user.email || "No asignado"}</p>
                  </div>
                </div>
              </div>
              {/* Columna 2 */}
              <div className="flex flex-col items-start w-full">
                <div className="grid grid-cols-1 gap-2 w-full mb-2">
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Ubicación</h3>
                    <p className="text-gray-600">{user.location || "No asignada"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Rol</h3>
                    <p className="text-gray-600">{translateRole(user.role) || "No especificado"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Estado</h3>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        user.status
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }`}
                    >
                      {user.status ? "Activo" : "Inactivo"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Assign />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
