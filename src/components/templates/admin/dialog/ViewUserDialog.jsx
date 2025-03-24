import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Ver {translateRole(user.role)}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Información detallada del usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img 
              src={user.role === "INTERN" ? "/becarios.png" : user.role === "RESPONSIBLE" ? "/responsible.png" : "/admin.png"} 
              alt={translateRole(user.role)} 
              className="w-full h-auto max-w-[200px]" 
            />
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-darkpurple-title font-medium">Nombre completo</Label>
                <input
                  type="text"
                  value={user.name + ' ' + user.lastname}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Nombre de usuario</Label>
                <input
                  type="text"
                  value={user.username || ''}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Correo electrónico</Label>
                <input
                  type="text"
                  value={user.email || ''}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Ubicación</Label>
                <input
                  type="text"
                  value={user.location || ''}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Rol</Label>
                <input
                  type="text"
                  value={translateRole(user.role) || ''}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Estado</Label>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      disabled
                      checked={user.status}
                      className="data-[state=checked]:bg-green-confirm data-[state=unchecked]:bg-gray-600"
                    />
                    <span className="text-darkpurple-title">
                      {user.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                  Ver bienes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
