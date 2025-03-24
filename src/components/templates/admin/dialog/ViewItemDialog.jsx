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

export function ViewItemDialog({ item }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-full flex items-center justify-center cursor-pointer">
          <img
            src="/view.png"
            alt="View"
            className="w-[1.25em] h-[1.25em]"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            {item.name}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Detalles del bien
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col">
              <img
                src="/defaultItem.png"
                alt="item"
                className="w-full h-auto max-w-[200px] mb-4"
              />
              <div className="w-full max-w-[200px] mb-4">
                <h3 className="text-darkpurple-title font-medium mb-2">
                  Ubicación actual
                </h3>
                <p className="text-gray-600">{item.location || "No asignada"}</p>
              </div>
              <div className="flex items-center justify-between w-full max-w-[420px]">
                <div className="w-1/2 pr-2">
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Dueño
                  </h3>
                  <p className="text-gray-600">
                    {item.owner ? `${item.owner.name} ${item.owner.surname}` : "No asignado"}
                  </p>
                </div>
                <div className="w-1/2 pl-2">
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Asignado a
                  </h3>
                  <p className="text-gray-600">
                    {item.assignedTo ? `${item.assignedTo.name} ${item.assignedTo.surname}` : "No asignado"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Tipo de bien
                  </h3>
                  <p className="text-gray-600">{item.itemType ? item.itemType.name : "No especificado"}</p>
                </div>
                <div>
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Marca
                  </h3>
                  <p className="text-gray-600">{item.brand ? item.brand.name : "No especificada"}</p>
                </div>
                <div>
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Modelo
                  </h3>
                  <p className="text-gray-600">{item.model ? item.model.name : "No especificado"}</p>
                </div>
                <div>
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Código
                  </h3>
                  <p className="text-gray-600">{item.code || "No especificado"}</p>
                </div>
                <div>
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Número de Serie
                  </h3>
                  <p className="text-gray-600">{item.serialNumber || "No especificado"}</p>
                </div>
                <div>
                  <h3 className="text-darkpurple-title font-medium mb-2">
                    Estado
                  </h3>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      item.status
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
      </DialogContent>
    </Dialog>
  );
}
