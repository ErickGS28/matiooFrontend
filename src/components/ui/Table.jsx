import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ViewUserDialog } from "@/components/templates/admin/dialog/ViewUserDialog";
import { EditUserDialog } from "@/components/templates/admin/dialog/EditUserDialog";
import { EstadoDialogUser } from "@/components/templates/admin/dialog/EstadoDialogUser"; // Importa el nuevo dialog

export default function Table({ data }) {
  const [userStatus, setUserStatus] = useState({}); // Estado para controlar el Switch de cada usuario
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para el diálogo
  const [currentUser, setCurrentUser] = useState(null); // El usuario que está siendo modificado
  const [tempStatus, setTempStatus] = useState(null); // Guardamos el estado temporal del Switch

  // Función para abrir el modal de cambio de estado
  const handleStatusChange = (userId) => {
    setCurrentUser(data.find((user) => user.name + user.lastname === userId)); // Establece el usuario actual con un id único
    setTempStatus(userStatus[userId]); // Guarda el estado actual para restaurarlo si el usuario cancela
    setIsDialogOpen(true); // Abre el diálogo
  };

  // Función para confirmar el cambio de estado
  const handleConfirmStatusChange = (userId) => {
    setUserStatus((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId], // Cambia el estado solo del usuario correspondiente
    }));
    setIsDialogOpen(false); // Cierra el diálogo después de confirmar
  };

  // Función para cancelar el cambio y restaurar el estado
  const handleCancelStatusChange = () => {
    setUserStatus((prevState) => ({
      ...prevState,
      [currentUser.name + currentUser.lastname]: tempStatus, // Restaura el estado original del usuario
    }));
    setIsDialogOpen(false); // Cierra el diálogo
  };

  const handleSave = (formData) => {
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
          {data.map((user, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-skyblue-row shadow-md shadow-sky-200 rounded-l-2xl rounded-r-2xl" : "bg-lightpurple-row shadow-md shadow-purple-300 rounded-l-2xl rounded-r-2xl"}
            >
              <td className="py-3 px-4 rounded-l-2xl font-semibold text-darkpurple-title">
                {user.name}
              </td>
              <td className="py-3 px-4 font-semibold text-darkpurple-title">{user.lastname}</td>
              <td className="py-3 px-4">
                <ViewUserDialog user={{ name: user.name, lastname: user.lastname }} />
              </td>
              <td className="py-3 px-4 h-[3.5rem] flex items-center justify-center">
                <Switch
                  checked={userStatus[user.name + user.lastname] || false} // Asigna el estado específico al usuario (evitar undefined)
                  onCheckedChange={() => handleStatusChange(user.name + user.lastname)} // Abre el diálogo en lugar de cambiar el estado
                  disabled={isDialogOpen} // Deshabilita el switch hasta que se confirme
                  className={`${userStatus[user.name + user.lastname] ? 'bg-green-confirm' : 'bg-gray-600'} transition-colors duration-300`}
                />
              </td>
              <td className="py-2 px-4 rounded-r-2xl h-[3.5rem] relative">
                <EditUserDialog user={{ name: user.name, lastname: user.lastname, status: userStatus[user.name + user.lastname] }} onSave={handleSave} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Agregamos el EstadoDialog */}
      {currentUser && (
        <EstadoDialogUser
          item={currentUser}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)} // Cierra el diálogo
          onConfirm={handleConfirmStatusChange} // Ejecuta el cambio de estado
          onCancel={handleCancelStatusChange} // Cancela el cambio y restaura el estado original
        />
      )}
    </div>
  );
}
