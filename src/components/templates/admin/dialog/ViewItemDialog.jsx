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
import { getUserById } from "@/services/users/userService";

export function ViewItemDialog({ item }) {
  const [isOpen, setIsOpen] = React.useState(false);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-full flex items-center justify-center cursor-pointer">
          <Button className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300 cursor-pointer">Ver</Button>

        </div>
      </DialogTrigger>
      <DialogContent className="w-[45%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Detalles del bien - {item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <div className="flex flex-col items-center">
            {/* Imagen en la parte superior */}
            <img
              src="/defaultItem.png"
              alt="item"
              className="w-full h-auto max-w-[200px] mb-4"
            />
            <div className="grid grid-cols-2 gap-16 w-3/4">
              {/* Columna 1 */}
              <div className="flex flex-col items-start w-full">
                <div className="grid grid-cols-1 gap-2 w-full mb-2">
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Ubicación actual</h3>
                    <p className="text-gray-600 text-right">{item.location || "No asignada"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Dueño</h3>
                    <p className="text-gray-600 text-right">
                      {item.owner ? (item.owner.fullName || `${item.owner.name || ''} ${item.owner.surname || ''}`) : "No asignado"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Tipo de bien</h3>
                    <p className="text-gray-600 text-right">{item.itemType ? item.itemType.name : "No especificado"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Marca</h3>
                    <p className="text-gray-600 text-right">{item.brand ? item.brand.name : "No especificada"}</p>
                  </div>
                </div>
              </div>
              {/* Columna 2 */}
              <div className="flex flex-col items-start w-full">
                <div className="grid grid-cols-1 gap-2 w-full mb-2">
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Asignado a</h3>
                    <p className="text-gray-600 text-right">
                      {item.assignedTo ? (item.assignedTo.fullName || `${item.assignedTo.name || ''} ${item.assignedTo.surname || ''}`) : "No asignado"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Modelo</h3>
                    <p className="text-gray-600 text-right">{item.model ? item.model.name : "No especificado"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Código</h3>
                    <p className="text-gray-600 text-right">{item.code || "No especificado"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Número de Serie</h3>
                    <p className="text-gray-600 text-right">{item.serialNumber || "No especificado"}</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-darkpurple-title font-medium">Estado</h3>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-right ${item.status
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                    >
                      {item.status ? "Activo" : "Inactivo"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </DialogContent>


    </Dialog>
  );
}
