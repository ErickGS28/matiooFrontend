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

export function Assign() {
  // Datos estáticos de los bienes
  const items = [
    { id: 1, name: "Bien 1" },
    { id: 2, name: "Bien 2" },
    { id: 3, name: "Bien 3" },
    // Puedes agregar más bienes aquí
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
          Ver bienes
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Asignar Bienes
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Selecciona los bienes para asignar.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-md">
                <div className="flex flex-col">
                  <h3 className="text-darkpurple-title font-medium mb-2">{item.name}</h3>
                </div>
                <Button className="ml-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                  Asignar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
