import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { itemService } from "@/services/item/itemService";
import { toast } from "react-hot-toast";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AssignItemsDialog({ userId, userName }) {
  const [items, setItems] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [assigning, setAssigning] = React.useState(false);

  const fetchUnassignedItems = async () => {
    setLoading(true);
    try {
      const response = await itemService.getUnassignedItems();

      if (response && response.result) {
        setItems(response.result);
        setFilteredItems(response.result);
      } else {
        setItems([]);
        setFilteredItems([]);
      }
    } catch (error) {
      console.error("Error al obtener bienes no asignados:", error);
      toast.error("Error al cargar los bienes disponibles", {
        duration: 3000,
        position: "bottom-right",
      });
      setItems([]);
      setFilteredItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar filteredItems cuando cambia el término de búsqueda
  React.useEffect(() => {
    if (items.length > 0) {
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.id?.toString() || '').includes(searchTerm)
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleAssignItems = async () => {
    if (selectedItems.length === 0) {
      toast.error("Selecciona al menos un bien para asignar", {
        duration: 3000,
        position: "bottom-right",
      });
      return;
    }

    setAssigning(true);
    try {
      // Asignar cada item seleccionado al usuario
      const promises = selectedItems.map(itemId =>
        itemService.assignItem(itemId, userId)
      );

      await Promise.all(promises);

      toast.success(`${selectedItems.length} bien(es) asignado(s) correctamente a ${userName}`, {
        duration: 3000,
        position: "bottom-right",
      });

      // Actualizar la lista de items después de asignar
      const updatedItems = items.filter(item => !selectedItems.includes(item.id));
      setItems(updatedItems);
      setFilteredItems(updatedItems);

      // Limpiar selección
      setSelectedItems([]);
    } catch (error) {
      console.error("Error al asignar bienes:", error);
      toast.error("Error al asignar los bienes seleccionados", {
        duration: 3000,
        position: "bottom-right",
      });
    } finally {
      setAssigning(false);
    }
  };

  // Cargar los bienes no asignados cuando se abre el diálogo
  React.useEffect(() => {
    if (open) {
      fetchUnassignedItems();
      setSelectedItems([]);
      setSearchTerm("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-[1em] px-4 py-2 hover:shadow-lg hover:shadow-purple-300 cursor-pointer transition-colors duration-300 ml-2">
          Asignar bienes
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[40%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Asignar Bienes a {userName || "Usuario"}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Selecciona los bienes que deseas asignar al usuario.
          </DialogDescription>
        </DialogHeader>

        {/* Barra de búsqueda */}
        <div className="relative mb-1 mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar bienes..."
            className="pl-8 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-darkpurple-title" />
              <span className="ml-2 text-gray-600">Cargando bienes disponibles...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {items.length === 0
                ? "No hay bienes disponibles para asignar."
                : "No se encontraron bienes que coincidan con la búsqueda."}
            </div>
          ) : (
            <div className="space-y-3 p-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-start p-2 border rounded-lg hover:bg-slate-100 shadow-md shadow-purple-100 overflow-hidden hover:scale-104">
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mt-1 w-4 h-4 text-darkpurple-title border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="ml-3 flex-1">
                    <label
                      htmlFor={`item-${item.id}`}
                      className="text-darkpurple-title font-medium cursor-pointer"
                    >
                      {item.name}
                    </label>
                    <div className="text-sm text-gray-600">ID: {item.id}</div>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                    {item.code && (
                      <p className="text-xs text-gray-500 mt-1">Código: {item.code}</p>
                    )}
                    {item.status && (
                      <p className="text-xs text-gray-500">Estado: {item.status}</p>
                    )}
                    {item.brand && (
                      <p className="text-xs text-gray-500">Marca: {item.brand.name}</p>
                    )}
                    {item.model && (
                      <p className="text-xs text-gray-500">Modelo: {item.model.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-lg hover:shadow-purple-200 cursor-pointer"
          >
            Regresar
          </Button>
          <Button
            onClick={handleAssignItems}
            disabled={selectedItems.length === 0 || assigning}
            className="bg-green-600 hover:bg-green-700 text-white hover:shadow-lg hover:shadow-purple-200 cursor-pointer"
          >
            {assigning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Asignando...
              </>
            ) : (
              `Asignar ${selectedItems.length > 0 ? `(${selectedItems.length})` : ''}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
