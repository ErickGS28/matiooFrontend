import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ViewUserDialog({ user }) {
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">Ver</Button>
  </DialogTrigger>
  <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
    <DialogHeader>
      <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Ver responsable</DialogTitle>
    </DialogHeader>
    <div className="grid grid-cols-2 gap-6">
      <div className="flex items-center justify-center">
        <img src="/becarios.png" alt="Becarios" className="w-full h-auto max-w-[200px]" />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label className="text-darkpurple-title font-medium">Nombre</Label>
            <input
              type="text"
              value={user.name}
              className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
              readOnly
            />
          </div>
          <div>
            <Label className="text-darkpurple-title font-medium">Apellidos</Label>
            <input
              type="text"
              value={user.lastname}
              className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
              readOnly
            />
          </div>
          <div>
            <Label className="text-darkpurple-title font-medium">Estado</Label>
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <Switch
                disabled
                  checked={true}
                  className="data-[state=checked]:bg-green-confirm data-[state=unchecked]:bg-gray-600"
                />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-darkpurple-title font-medium mb-2">Área común</Label>
            <Select className="w-full" disabled>
              <SelectTrigger className="rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                <SelectValue placeholder="Sala" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-purple-900 rounded-[1em] shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
                <SelectItem value="sala" className="hover:bg-purple-900/10">
                  Sala
                </SelectItem>
                <SelectItem value="comedor" className="hover:bg-purple-900/10">
                  Comedor
                </SelectItem>
                <SelectItem value="cubículos" className="hover:bg-purple-900/10">
                  Cubículos
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>


  )
}
