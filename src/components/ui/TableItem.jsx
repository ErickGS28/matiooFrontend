import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ViewItemDialog } from "@/components/templates/admin/dialog/ViewItemDialog";
import { EditItemDialog } from "@/components/templates/admin/dialog/EditItemDialog";
import { EstadoDialog } from "@/components/templates/admin/dialog/EstadoDialog";
import { itemService } from "@/services/item/itemService";

export default function TableItem({ data }) {
  const [items, setItems] = useState(data);
  const [itemStatus, setItemStatus] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [tempStatus, setTempStatus] = useState(null);

  // Inicializar el estado de los switches cuando cambian los datos
  useEffect(() => {
    setItems(data);
    // Crear un objeto con el estado de cada item basado en su propiedad status
    const initialStatus = {};
    data.forEach(item => {
      initialStatus[item.code] = item.status || false;
    });
    setItemStatus(initialStatus);
  }, [data]);

  const handleStatusChange = (itemCode) => {
    setCurrentItem(items.find(item => item.code === itemCode));
    setTempStatus(itemStatus[itemCode]);
    setIsDialogOpen(true);
  };

  const handleConfirmStatusChange = async (itemCode) => {
    try {
      // Obtener el ID del item para llamar a la API
      const item = items.find(item => item.code === itemCode);
      if (item && item.id) {
        // Llamar a la API para cambiar el estado
        await itemService.changeItemStatus(item.id);

        // Actualizar el estado local
        setItemStatus((prev) => ({
          ...prev,
          [itemCode]: !prev[itemCode],
        }));
      }
    } catch (error) {
      console.error("Error al cambiar el estado del item:", error);
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
    console.log("TableItem recibió para actualizar:", updatedItem);

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

      console.log("Objeto formateado para enviar al backend:", itemToUpdate);

      // Llamar a la API para actualizar el item
      const response = await itemService.updateItem(itemToUpdate);
      console.log("Respuesta completa de updateItem:", response);

      if (response && response.type === "SUCCESS") {
        console.log("Actualización exitosa, actualizando estado local");

        // Para asegurar que los datos están actualizados, refrescar desde el backend
        const allItemsResponse = await itemService.getAllItems();
        if (allItemsResponse && allItemsResponse.type === "SUCCESS") {
          setItems(allItemsResponse.result);

          // Actualizar también el estado de los switches
          const newStatus = {};
          allItemsResponse.result.forEach(item => {
            newStatus[item.code] = item.status || false;
          });
          setItemStatus(newStatus);
        } else {
          // Si no podemos refrescar todos los items, al menos actualizamos el que se modificó
          setItems(prevItems =>
            prevItems.map(item =>
              item.id === itemToUpdate.id ? { ...item, ...response.result } : item
            )
          );
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
          {items.map((item, index) => (
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
                    itemType: item.itemType,
                    name: item.name,
                    brand: item.brand,
                    model: item.model,
                    code: item.code,
                    location: item.location || "No asignada",
                    serialNumber: item.serialNumber
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
                    intern: item.assignedTo || "No asignado",
                    responsible: item.responsible || "No asignado",
                    itemType: item.itemType,
                    serialNumber: item.serialNumber,
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