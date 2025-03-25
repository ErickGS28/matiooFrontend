import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"


export function AssignItemDialog({ onSave }) {
  const [takeItem, setTakeItem] = React.useState({ name: "" });

  const cardData = [
    { name: "Monitor Yanpol", img: "/defaultItem.png", description: "Monitor chido" },
    { name: "Silla eco", img: "/defaultItem.png", description: "Silla de lo mejor" },
    { name: "Escritorio", img: "/defaultItem.png", description: "Escritorio de Mesk" },
    { name: "Mouse Razer", img: "/defaultItem.png", description: "Mouse del god" },
    { name: "Silla gamer", img: "/defaultItem.png", description: "Silla gamer 100/10" },
    { name: "Escritorio 2", img: "/defaultItem.png", description: "Escritorio de papi Yanpol" },
    { name: "Cubículo 2", img: "/defaultItem.png", description: "Cubículo 2 del Stamatioo" },
    { name: "Silla gamer 2", img: "/defaultCommonArea.png", description: "Silla gamer 2 de Razer" },
  ];

  const handleSave = () => {
    onSave(takeItem);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] hover:scale-105  px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
              Asignar bienes
            </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Asignar bienes
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-12 m-[2em]">
          <div className="flex flex-col">
            <img
              src="/item.png"
              alt="item"
              className="w-full h-auto max-w-[200px] mb-4"
            />
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label className="text-darkpurple-title font-medium mb-2">Bienes disponibles</Label>
                <Select
                  className="w-full"
                  value={takeItem.name}
                  onValueChange={(value) => setTakeItem((prev) => ({ ...prev, name: value }))}
                >
                  <SelectTrigger className="rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                    <SelectValue placeholder="Selecciona un bien" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-purple-900 rounded-[1em] shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
                    {cardData.map((card, index) => (
                      <SelectItem key={index} value={card.name} className="hover:bg-purple-900/10">
                        {card.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>
              <div className="flex justify-end mt-[1em]">
                <Button onClick={handleSave} className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
