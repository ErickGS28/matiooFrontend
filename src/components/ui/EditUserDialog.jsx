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

export function EditUserDialog({ user, onSave }) {
  const [formData, setFormData] = React.useState({
    name: user.name,
    lastname: user.lastname,
    status: user.status,
    area: user.area || "sala"
  });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src="/action.png" alt="Actions" className="w-[1.25em] h-[1.25em] cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Editar responsable</DialogTitle>
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
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Apellidos</Label>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Estado</Label>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={formData.status}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
                      className="data-[state=checked]:bg-green-confirm data-[state=unchecked]:bg-gray-600"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium mb-2">Área común</Label>
                <Select className="w-full" value={formData.area} onValueChange={(value) => setFormData(prev => ({ ...prev, area: value }))}>
                  <SelectTrigger className="rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                    <SelectValue />
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
              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
