import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ViewItemDialog } from "@/components/templates/admin/dialog/ViewItemDialog";
import { EditItemDialog } from "@/components/templates/admin/dialog/EditItemDialog";
import { EstadoDialog } from "@/components/templates/admin/dialog/EstadoDialog";
import { itemService } from "@/services/item/itemService";
import { toast } from 'react-hot-toast';


export default function TableItem({ data, onUpdateItem }) {
  // Eliminamos el estado local de items y usamos directamente los datos proporcionados por el componente padre
  const [itemStatus, setItemStatus] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [tempStatus, setTempStatus] = useState(null);

  // Inicializar el estado de los switches cuando cambian los datos
  useEffect(() => {
    // Crear un objeto con el estado de cada item basado en su propiedad status
    const initialStatus = {};
    data.forEach(item => {
      initialStatus[item.code] = item.status || false;
    });
    setItemStatus(initialStatus);
  }, [data]);

  const handleStatusChange = (itemCode) => {
    setCurrentItem(data.find(item => item.code === itemCode));
    setTempStatus(itemStatus[itemCode]);
    setIsDialogOpen(true);
  };

  const handleConfirmStatusChange = async (itemCode) => {
    try {
      const item = data.find(item => item.code === itemCode);
      if (item && item.id) {
        await itemService.changeItemStatus(item.id);
  
        setItemStatus((prev) => ({
          ...prev,
          [itemCode]: !prev[itemCode],
        }));
  
        // Mostrar toast de éxito
        toast.success("Cambio de estado del bien exitoso");
      }
    } catch (error) {
      console.error("Error al cambiar el estado del item:", error);
      toast.error("Error al cambiar el estado del bien");
    } finally {
      setIsDialogOpen(false);
    }
  };
  

  const handleCancelStatusChange = () => {
    setItemStatus((prev) => ({
      ...prev,
      [currentItem.code]: tempStatus,
    }));
    setIsDialogOpen(false);
  };

  const handleSave = async (updatedItem) => {

    try {
      // Asegurarnos que todos los campos necesarios estén presentes y sean del tipo correcto
      const itemToUpdate = {
        id: parseInt(updatedItem.id),
        itemTypeId: parseInt(updatedItem.itemTypeId),
        brandId: parseInt(updatedItem.brandId),
        modelId: parseInt(updatedItem.modelId),
        serialNumber: updatedItem.serialNumber,
        code: updatedItem.code,
        ownerId: parseInt(updatedItem.ownerId),
        assignedToId: updatedItem.assignedToId === null ? null : parseInt(updatedItem.assignedToId),
        location: updatedItem.location,
        name: updatedItem.name
      };

      // Llamar a la API para actualizar el item
      const response = await itemService.updateItem(itemToUpdate);

      if (response && response.type === "SUCCESS") {
        
        // Actualizar el estado en el componente padre (Item.jsx) si existe el callback
        if (onUpdateItem && typeof onUpdateItem === 'function') {
          const updatedItemData = response.result || itemToUpdate;
          onUpdateItem(updatedItemData);
        }
      }
    } catch (error) {
      console.error("Error al actualizar el item:", error);
      alert("Error al actualizar el item. Por favor, revisa la consola para más detalles.");
    }
  };

  return (
    <div className="mt-5 w-full flex justify-center overflow-visible">
      <table className="w-11/12 bg-white rounded-lg border-separate border-spacing-y-4 text-center shadow-none">
        <thead className="bg-darkpurple-bg-thead text-white">
          <tr className="shadow-none">
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Marca</th>
            <th className="py-2 px-4">Detalles</th>
            <th className="py-2 px-4">Estado</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`hover:scale-105 ${index % 2 === 0 ? "bg-skyblue-row shadow-md shadow-sky-200" : "bg-lightpurple-row shadow-md shadow-purple-300"} rounded-l-2xl rounded-r-2xl group transform transition-transform duration-300`}

            >
              <td className="py-3 px-4 rounded-l-2xl font-semibold text-darkpurple-title">
                {item.name}
              </td>
              <td className="py-3 px-4 font-semibold text-darkpurple-title">
                {item.brand && item.brand.name ? item.brand.name : 'Sin marca'}
              </td>
              <td className="py-3 px-4">
                <ViewItemDialog
                  item={{
                    id: item.id,
                    itemType: item.itemType,
                    name: item.name,
                    brand: item.brand,
                    model: item.model,
                    code: item.code,
                    location: item.location || "No asignada",
                    serialNumber: item.serialNumber,
                    ownerId: item.ownerId,
                    assignedToId: item.assignedToId,
                    status: item.status,
                    owner: item.owner,
                    assignedTo: item.assignedTo
                  }}
                />
              </td>
              <td className="py-3 px-4 h-[3.5rem] flex items-center justify-center">
                <Switch
                  checked={itemStatus[item.code] || false}
                  onCheckedChange={() => handleStatusChange(item.code)}
                  disabled={isDialogOpen}
                  className={`${itemStatus[item.code] ? 'bg-green-confirm' : 'bg-gray-600'} transition-colors duration-300 cursor-pointer`}
                />
              </td>
              <td className="py-2 px-4 rounded-r-2xl h-[3.5rem] relative">
                <EditItemDialog
                  item={{
                    id: item.id,
                    name: item.name,
                    brand: item.brand,
                    model: item.model,
                    code: item.code,
                    location: item.location || "No asignada",
                    itemType: item.itemType,
                    serialNumber: item.serialNumber,
                    ownerId: item.ownerId,
                    assignedToId: item.assignedToId,
                    owner: item.owner,
                    assignedTo: item.assignedTo,
                    status: item.status
                  }}
                  onSave={handleSave}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Agregamos el EstadoDialog */}
      {currentItem && (
        <EstadoDialog
          item={currentItem}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
    </div>
  );
}