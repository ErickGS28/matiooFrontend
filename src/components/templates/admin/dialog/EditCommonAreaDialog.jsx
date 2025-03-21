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

export default function EditCommonAreaDialog({ user, onSave }) {
    const [formData, setFormData] = React.useState({
        name: user.name,
        img: user.img,
        status: user.status,
        area: user.area || "sala"
      });
    
      const handleSave = () => {
        onSave(formData);
      };

    return (
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-cyan-200 hover:bg-purple-300 text-gray-800 font-semibold py-1 px-3 rounded-full mt-4">
              Editar
            </button>
          </DialogTrigger>
          <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
            <DialogHeader>
              <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Editar área común</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 mt-[3em] mb-[3em]">
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
                  <div className="flex justify-end mt-[2em]">
                    <Button onClick={handleSave} className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                      Guardar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }