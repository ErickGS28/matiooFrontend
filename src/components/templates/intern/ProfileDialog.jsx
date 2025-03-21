import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function ProfileDialog({ item }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
          {item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col">
            <img
              src="/defaultItem.png"
              alt="item"
              className="w-full h-auto max-w-[200px] mb-4"
            />
            <div className="w-full max-w-[200px] mb-4">
              <Label className="text-darkpurple-title font-medium mb-2">
                Ubicación actual
              </Label>
              <Select className="w-full" disabled value={item.location}>
                <SelectTrigger className="rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                  <SelectValue placeholder={item.location} />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-purple-900 rounded-[1em] shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
                  <SelectItem value="Sala" className="hover:bg-purple-900/10">
                    Sala
                  </SelectItem>
                  <SelectItem value="Comedor" className="hover:bg-purple-900/10">
                    Comedor
                  </SelectItem>
                  <SelectItem value="Cubículos" className="hover:bg-purple-900/10">
                    Cubículos
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between w-full max-w-[420px]">
              <div className="w-1/2 pr-2">
                <Label className="text-darkpurple-title font-medium mb-2">
                  Becario
                </Label>
                <Select className="w-full" disabled value={item.intern}>
                  <SelectTrigger className="rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                    <SelectValue placeholder={item.intern} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-purple-900 rounded-[1em] shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
                    <SelectItem value="Erick" className="hover:bg-purple-900/10">
                      Erick
                    </SelectItem>
                    <SelectItem value="Jony" className="hover:bg-purple-900/10">
                      Jony
                    </SelectItem>
                    <SelectItem value="Ximena" className="hover:bg-purple-900/10">
                      Ximena
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2 pl-2">
                <Label className="text-darkpurple-title font-medium mb-2">
                  Responsable
                </Label>
                <Select className="w-full" disabled value={item.responsible}>
                  <SelectTrigger className="rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                    <SelectValue placeholder={item.responsible} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-purple-900 rounded-[1em] shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
                    <SelectItem value="Santiago" className="hover:bg-purple-900/10">
                      Santiago
                    </SelectItem>
                    <SelectItem value="Iván" className="hover:bg-purple-900/10">
                      Iván
                    </SelectItem>
                    <SelectItem value="Jony" className="hover:bg-purple-900/10">
                      Jony
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Tipo de bien
                </Label>
                <input
                  type="text"
                  value={item.itemType}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Marca
                </Label>
                <input
                  type="text"
                  value={item.brand}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Modelo
                </Label>
                <input
                  type="text"
                  value={item.model}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Código
                </Label>
                <input
                  type="text"
                  value={item.code}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
