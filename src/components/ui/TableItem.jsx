import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ViewItemDialog } from "@/components/templates/admin/dialog/ViewItemDialog";
import { EditItemDialog } from "@/components/templates/admin/dialog/EditItemDialog";
import { EstadoDialog } from "@/components/templates/admin/dialog/EstadoDialog"; // Importa el nuevo dialog

export default function TableItem({ data }) {
  const [items, setItems] = useState(data);
  const [itemStatus, setItemStatus] = useState({}); // Estado para controlar el Switch de cada ítem
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controla la apertura del dialog
  const [currentItem, setCurrentItem] = useState(null); // El ítem que está siendo modificado
  const [tempStatus, setTempStatus] = useState(null); // Estado temporal del switch antes de confirmar

  const handleStatusChange = (itemCode) => {
    setCurrentItem(items.find(item => item.code === itemCode)); // Establece el ítem actual
    setTempStatus(itemStatus[itemCode]); // Guarda el estado actual para restaurarlo si el usuario cancela
    setIsDialogOpen(true); // Abre el diálogo
  };

  const handleConfirmStatusChange = (itemCode) => {
    // Cambia el estado solo del ítem correspondiente
    setItemStatus((prev) => ({
      ...prev,
      [itemCode]: !prev[itemCode], // Cambia el estado del ítem
    }));
    setIsDialogOpen(false); // Cierra el diálogo después de confirmar
  };

  const handleCancelStatusChange = () => {
    setItemStatus((prev) => ({
      ...prev,
      [currentItem.code]: tempStatus, // Restaura el estado anterior del ítem si se cancela
    }));
    setIsDialogOpen(false); // Cierra el diálogo
  };

  const handleSave = (updatedItem) => {
    setItems(items.map((item) => (item.code === updatedItem.code ? updatedItem : item)));
  };

  return (
    <div className="mt-5 w-full overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg border-separate border-spacing-y-4 min-w-[600px] text-center">
        <thead className="bg-darkpurple-bg-thead text-white">
          <tr className="shadow-md shadow-purple-950">
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Marca</th>
            <th className="py-2 px-4">Detalles</th>
            <th className="py-2 px-4">Estado</th> {/* Aquí está la columna "Estado" */}
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-skyblue-row shadow-md shadow-sky-200 rounded-l-2xl rounded-r-2xl"
                  : "bg-lightpurple-row shadow-md shadow-purple-300 rounded-l-2xl rounded-r-2xl"
              }
            >
              <td className="py-3 px-4 rounded-l-2xl font-semibold text-darkpurple-title">
                {item.name}
              </td>
              <td className="py-3 px-4 font-semibold text-darkpurple-title">{item.brand}</td>
              <td className="py-3 px-4">
                <ViewItemDialog
                  item={{
                    itemType: item.itemType,
                    name: item.name,
                    brand: item.brand,
                    model: item.model,
                    code: item.code,
                  }}
                />
              </td>
              <td className="py-3 px-4 h-[3.5rem] flex items-center justify-center">
                <Switch
                  checked={itemStatus[item.code]} // Asigna el estado específico al ítem
                  onCheckedChange={() => handleStatusChange(item.code)} // Abre el diálogo en lugar de cambiar el estado
                  disabled={isDialogOpen} // Deshabilita el switch hasta que se confirme
                  className={`${itemStatus[item.code] ? 'bg-green-confirm' : 'bg-gray-600'} transition-colors duration-300`}
                />
              </td>
              <td className="py-2 px-4 rounded-r-2xl h-[3.5rem] relative">
                <EditItemDialog
                  item={{
                    name: item.name,
                    brand: item.brand,
                    model: item.model,
                    code: item.code,
                    location: item.location,
                    intern: item.intern,
                    responsible: item.responsible,
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
          onClose={() => setIsDialogOpen(false)} // Cierra el diálogo
          onConfirm={handleConfirmStatusChange} // Ejecuta el cambio de estado
          onCancel={handleCancelStatusChange} // Cancela el cambio y restaura el estado original
        />
      )}
    </div>
  );
}
