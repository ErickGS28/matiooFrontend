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
import { itemService } from "@/services/item/itemService";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export function Assign({ userId, userName }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const fetchUserItems = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const data = await itemService.getItemsByAssignedToId(userId);
      setItems(data);
    } catch (error) {
      console.error("Error al obtener bienes del usuario:", error);
      toast.error("Error al cargar los bienes asignados", {
        duration: 3000,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async (itemId) => {
    try {
      await itemService.unassignItem(itemId);
      toast.success("Bien desasignado correctamente", {
        duration: 3000,
        position: "bottom-right",
      });
      // Actualizar la lista de bienes después de desasignar
      fetchUserItems();
    } catch (error) {
      console.error("Error al desasignar bien:", error);
      toast.error("Error al desasignar el bien", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  // Cargar los bienes cuando se abre el diálogo
  React.useEffect(() => {
    if (open) {
      fetchUserItems();
    }
  }, [open, userId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
          Ver bienes
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Bienes Asignados a {userName || "Usuario"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Aquí puedes ver y desasignar los bienes asignados al usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-darkpurple-title" />
              <span className="ml-2 text-gray-600">Cargando bienes...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Este usuario no tiene bienes asignados.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-md">
                  <div className="flex flex-col">
                    <h3 className="text-darkpurple-title font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">ID: {item.id}</p>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleUnassign(item.id)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-200"
                  >
                    Desasignar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
