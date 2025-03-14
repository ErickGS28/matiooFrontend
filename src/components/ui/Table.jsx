import React, { useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "@/components/ui/switch";
import { ViewUserDialog } from "@/components/ui/ViewUserDialog";
import { EditUserDialog } from "@/components/ui/EditUserDialog";

export default function Table({ data }) {
  const [userStatus, setUserStatus] = useState({});

  const handleStatusChange = (userId) => {
    setUserStatus(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleSave = (formData) => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Datos guardados:', formData);
  };

  return (
    <div className="mt-5 w-full overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg border-separate border-spacing-y-4 min-w-[600px] text-center">
        <thead className="bg-darkpurple-bg-thead text-white">
          <tr className="shadow-md shadow-purple-950">
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Apellidos</th>
            <th className="py-2 px-4">Detalles</th>
            <th className="py-3 px-4">Estado</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-skyblue-row shadow-md shadow-sky-200 rounded-l-2xl rounded-r-2xl"
                                      : "bg-lightpurple-row shadow-md shadow-purple-300 rounded-l-2xl rounded-r-2xl"}>
              <td className="py-3 px-4 rounded-l-2xl font-semibold text-darkpurple-title">{item.name}</td>
              <td className="py-3 px-4 font-semibold text-darkpurple-title">{item.lastname}</td>
              <td className="py-3 px-4">
                <ViewUserDialog 
                  user={{
                    name: item.name,
                    lastname: item.lastname
                  }}
                />
              </td>
              <td className="py-3 px-4 h-[3.5rem] flex items-center justify-center">
                <Switch 
                  checked={userStatus[index]}
                  onCheckedChange={() => handleStatusChange(index)}
                  className={`${userStatus[index] ? 'bg-green-confirm' : 'bg-gray-600'} transition-colors duration-300`}
                />
              </td>
              <td className="py-2 px-4 rounded-r-2xl h-[3.5rem] relative">
                <EditUserDialog 
                  user={{
                    name: item.name,
                    lastname: item.lastname,
                    status: userStatus[index]
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
