import React, { useState, useEffect } from "react";
import AsideBar from "../../AsideBar";
import Table from "@/components/ui/Table";
import toast, { Toaster } from 'react-hot-toast';
import { getAllUsers, createUser, updateUser, changeUserStatus } from "@/services/users/userService";
import SelectStatus from "../../../components/ui/SelectStatus";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function Interns() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const usersPerPage = 5;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    location: "",
    role: "INTERN"
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      if (response && response.result && Array.isArray(response.result)) {
        const internUsers = response.result.filter(user => user && user.role === "INTERN");
        setUsers(internUsers);
        setFilteredUsers(internUsers);
        setError(null);
      } else {
        setUsers([]);
        setFilteredUsers([]);
        setError("No se pudieron cargar los becarios. Formato de datos inesperado.");
        toast.error("Error: Formato de datos inesperado");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error al cargar los becarios");
      setLoading(false);
      toast.error("Error al cargar los becarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrar usuarios por estado y búsqueda
  useEffect(() => {
    if (!Array.isArray(users)) {
      setFilteredUsers([]);
      return;
    }
    let filtered = [...users];
    if (statusFilter === "active") {
      filtered = filtered.filter(user => user.status === true);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter(user => user.status === false);
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(user =>
        (user.fullName && user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.location && user.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    setFilteredUsers(filtered);
  }, [users, statusFilter, searchQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddIntern = async () => {
    if (!formData.fullName || !formData.username || !formData.password || !formData.email || !formData.location) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }
    if (formData.fullName.length > 100) {
      toast.error("El nombre completo no puede exceder los 100 caracteres.");
      return;
    }
    if (formData.username.length > 50) {
      toast.error("El nombre de usuario no puede exceder los 50 caracteres.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("El correo electrónico no es válido.");
      return;
    }
    if (formData.email.length > 100) {
      toast.error("El correo electrónico no puede exceder los 100 caracteres.");
      return;
    }
    if (formData.password.length < 8 || formData.password.length > 255) {
      toast.error("La contraseña debe tener entre 8 y 255 caracteres.");
      return;
    }

    const userData = {
      fullName: formData.fullName,
      username: formData.username,
      password: formData.password,
      email: formData.email,
      location: formData.location,
      role: "INTERN"
    };

    const response = await createUser(userData);
    fetchUsers();
    resetForm();
    setIsPopoverOpen(false);
    toast.success("Becario agregado correctamente");
  };

  const handleUpdateStatus = async (id) => {
    try {
      await changeUserStatus(id);
      fetchUsers();
      toast.success("Estado del becario actualizado correctamente");
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Error al actualizar el estado del becario");
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await updateUser(userData.id, userData);
      fetchUsers();
      toast.success("Becario actualizado correctamente");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el becario");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      username: "",
      password: "",
      email: "",
      location: "",
      role: "INTERN"
    });
    setShowPassword(false);
  };

  const handleToggleSidebar = (expanded) => {
    setIsExpanded(expanded);
  };

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const transformedData = currentUsers.map(user => ({
    id: user.id,
    name: user.fullName ? user.fullName.split(' ')[0] : '',
    lastname: user.fullName ? user.fullName.split(' ').slice(1).join(' ') : '',
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
    fullName: user.fullName,
    location: user.location
  }));

  // Formulario de usuario con la funcionalidad de mostrar/ocultar contraseña
  const UserForm = () => (
    <div className="grid gap-6 p-4">
      <div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nombre Completo</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Nombre Completo"
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">Nombre de Usuario</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Nombre de Usuario"
              maxLength={50}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 pr-10"
                placeholder="Contraseña"
                maxLength={255}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Correo Electrónico"
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">Ubicación</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Ubicación"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleAddIntern}
            className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="interns" onToggle={handleToggleSidebar} />
        <main className="flex-1 flex flex-col h-screen ">
          <div className="flex flex-col p-5 md:p-20 w-full">
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Becarios
              </h1>
              <img
                src="/becarios.png"
                alt="becario"
                className="ml-auto w-[5em] h-[5em] object-contain"
              />
            </div>
            <div className="my-3 mt-5 w-full flex flex-col md:flex-row items-center flex-wrap gap-4">
              <div className="flex flex-col sm:flex-row items-center w-full md:w-auto">
                <div className="relative w-full sm:w-[25em] mb-3 sm:mb-0">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-50 font-medium"
                    placeholder="Buscar becario..."
                  />
                </div>
                <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                  <SelectStatus
                    value={statusFilter}
                    onChange={setStatusFilter}
                  />
                </div>
              </div>
              <div className="flex justify-center sm:justify-end flex-grow w-full md:w-auto">
                <Popover open={isPopoverOpen} onOpenChange={(open) => {
                  setIsPopoverOpen(open);
                  if (!open) {
                    // Reset form when popover is closed
                    resetForm();
                  }
                }}>
                  <PopoverTrigger asChild>
                    <Button
                      className="bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer"
                    >
                      Registrar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[50%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)] mx-auto left-0 transform -translate-x-1/3 top-0">
                    <div className="flex flex-col h-full">
                      <div className="text-center">
                        <h3 className="text-darkpurple-title text-[1.8em] font-semibold">
                          Agregar Becario
                        </h3>
                        <p id="popover-description" className="text-gray-500 text-sm mt-1">
                          Complete los campos para registrar un nuevo becario.
                        </p>
                      </div>
                      <div className="overflow-y-auto max-h-[50vh]">
                        {UserForm()}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-4">Cargando...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
              <>
                <div className="mt-5 w-full overflow-x-auto">
                  <Table
                    data={transformedData}
                    onStatusChange={handleUpdateStatus}
                    onSave={handleUpdateUser}
                    showRoleColumn={true}
                  />
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "rgba(209, 255, 255, 1)" // Azul claro
                },
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
}
