import React, { useState } from "react";
import { ViewItemDialog } from "@/components/templates/admin/dialog/ViewItemDialog";
import { EditItemDialog } from "@/components/templates/admin/dialog/EditItemDialog";

export default function TableItem({ data }) {
  const [items, setItems] = useState(data);

  const handleSave = (updatedItem) => {
    // Aquí puedes implementar la lógica para guardar los cambios
    // Por ejemplo, actualizar el estado local o enviar una solicitud al servidor
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
              <td className="py-3 px-4 font-semibold text-darkpurple-title">
                {item.brand}
              </td>
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
    </div>
  );
}
