import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function EstadoDialogUser({ item, isOpen, onClose, onConfirm, onCancel }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Confirmar cambio de estado
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Esta acción cambiará el estado actual del usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-6">
          <Label className="text-darkpurple-title font-medium">
            ¿Estás seguro de que deseas cambiar el estado de {item.name} {item.lastname}?
          </Label>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-darkpurple-title cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              onConfirm(item.name + item.lastname); // Usar el identificador único
              onClose();
            }}
            className="bg-green-confirm hover:bg-green-700 text-white cursor-pointer"
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
