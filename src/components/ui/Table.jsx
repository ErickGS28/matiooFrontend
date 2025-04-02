import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ViewUserDialog } from "@/components/templates/admin/dialog/ViewUserDialog";
import { EditUserDialog } from "@/components/templates/admin/dialog/EditUserDialog";
import { EstadoDialogUser } from "@/components/templates/admin/dialog/EstadoDialogUser";

export default function Table({ data, onStatusChange, onSave, showRoleColumn = false }) {
  const [userStatus, setUserStatus] = useState({}); // Estado para controlar el Switch de cada usuario
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para el diálogo
  const [currentUser, setCurrentUser] = useState(null); // El usuario que está siendo modificado
  const [tempStatus, setTempStatus] = useState(null); // Guardamos el estado temporal del Switch

  // Función para abrir el modal de cambio de estado
  const handleStatusChange = (userId) => {
    const user = data.find((user) => user.id === userId);
    setCurrentUser(user);
    setTempStatus(user.status); // Guarda el estado actual para restaurarlo si el usuario cancela
    setIsDialogOpen(true); // Abre el diálogo
  };

  // Función para confirmar el cambio de estado
  const handleConfirmStatusChange = (userId) => {
    if (onStatusChange) {
      onStatusChange(userId);
    } else {
      setUserStatus((prevState) => ({
        ...prevState,
        [userId]: !prevState[userId], // Cambia el estado solo del usuario correspondiente
      }));
    }
    setIsDialogOpen(false); // Cierra el diálogo después de confirmar
  };

  // Función para cancelar el cambio y restaurar el estado
  const handleCancelStatusChange = () => {
    setIsDialogOpen(false); // Cierra el diálogo
  };

  const handleSaveUser = (formData) => {
    if (onSave) {
      onSave(formData);
    } else {
      
    }
  };

  // Función para traducir los roles a un formato más amigable
  const translateRole = (role) => {
    const roleMap = {
      'ADMIN': 'Admin',
      'INTERN': 'Becario',
      'RESPONSIBLE': 'Responsable'
    };
    return roleMap[role] || role;
  };

  return (
    <div className="mt-5 w-full flex justify-center overflow-visible">
      <table className="w-11/12 bg-white  rounded-lg border-separate border-spacing-y-4 text-center">
        <thead className="bg-darkpurple-bg-thead text-white">
          <tr className="shadow-md shadow-purple-950">
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Correo</th>
            <th className="py-2 px-4">Lugar</th>
            <th className="py-2 px-4">Detalles</th>
            <th className="py-3 px-4">Estado</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={index}
              className={`hover:scale-105 ${index % 2 === 0 ? "bg-skyblue-row shadow-md shadow-sky-200" : "bg-lightpurple-row shadow-md shadow-purple-300"} rounded-l-2xl rounded-r-2xl group transform transition-transform duration-300`}
            >
              <td className="py-3 px-4 rounded-l-2xl font-semibold text-darkpurple-title">
                {user.fullName || `${user.name} ${user.lastname}`.trim()}
              </td>
              <td className="py-3 px-4 font-semibold text-darkpurple-title">{user.email}</td>
              <td className="py-3 px-4 font-semibold text-darkpurple-title">{user.location}</td>
              <td className="py-3 px-4">
                <ViewUserDialog user={user} />
              </td>
              <td className="py-3 px-4 h-[3.5rem] flex items-center justify-center">
                <Switch
                  checked={user.status}
                  onCheckedChange={() => handleStatusChange(user.id)}
                  disabled={isDialogOpen}
                  className={`${user.status ? 'bg-green-confirm' : 'bg-gray-600'} transition-colors duration-300 cursor-pointer`}
                />
              </td>
              <td className="py-2 px-4 rounded-r-2xl h-[3.5rem] relative">
                <EditUserDialog user={user} onSave={handleSaveUser} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Diálogo de confirmación para cambiar estado */}
      {currentUser && (
        <EstadoDialogUser
          item={currentUser}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={() => handleConfirmStatusChange(currentUser.id)}
          onCancel={handleCancelStatusChange}
        />
      )}
    </div>
  );
}