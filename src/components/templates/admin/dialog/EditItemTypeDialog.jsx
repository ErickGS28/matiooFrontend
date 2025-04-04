import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { updateItemType } from "../../../../services/item_type/itemTypeService"

export default function EditItemTypeDialog({ itemType, onSave }) {
    // Initialize formData with default values
    const [formData, setFormData] = React.useState({
        id: itemType?.id || 0,
        name: itemType?.name || '',
        img: itemType?.img || '/defaultItemType.png',
        status: itemType?.status || false,
    });
    
    const [isOpen, setIsOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // Update formData when itemType prop changes
    // Use JSON.stringify to compare objects and prevent infinite loops
    React.useEffect(() => {
        // Only update if the itemType prop actually changed
        const newItemTypeData = {
            id: itemType?.id || 0,
            name: itemType?.name || '',
            img: itemType?.img || '/defaultItemType.png',
            status: itemType?.status || false,
        };
        
        // Compare current formData with new data from props
        if (JSON.stringify(newItemTypeData) !== JSON.stringify({
            id: formData.id,
            name: formData.name,
            img: formData.img,
            status: formData.status
        })) {
            setFormData(newItemTypeData);
        }
    }, [itemType?.id, itemType?.name, itemType?.img, itemType?.status]);

    const handleSave = async () => {
      try {
        setLoading(true);
        if (!formData.id) {
          console.error("Cannot update: Missing ID");
          return;
        }
        
        await updateItemType(formData.id, formData.name);
        
        if (onSave && typeof onSave === 'function') {
          onSave(formData);
        }
        
        setIsOpen(false);
      } catch (error) {
        console.error("Error updating item type:", error);
      } finally {
        setLoading(false);
      }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button className="bg-purple-950 hover:bg-purple-700 text-white font-semibold py-1 p-6 rounded-full mt-4 cursor-pointer">
              Editar
            </button>
          </DialogTrigger>
          <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
            <DialogHeader>
              <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Editar tipo de bien</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 mt-[3em] mb-[3em]">
              <div className="flex items-center justify-center">
                <img src={formData.img || "/defaultItemType.png"} alt="Tipo de bien" className="w-full h-auto max-w-[200px]" />
              </div>
              <div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label className="text-darkpurple-title font-medium">Nombre</Label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                    />
                  </div>
                  <div className="flex justify-end mt-[2em]">
                    <Button 
                      onClick={handleSave} 
                      className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
