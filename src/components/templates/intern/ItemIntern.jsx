import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { itemService } from "@/services/item/itemService";
import { decodeAndDisplayToken } from "@/services/auth/authService";
import { toast } from "react-hot-toast";
import { logout } from "@/services/utils/authUtils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateUserProfile, getUserById } from "@/services/users/userService";
import { Button } from "@/components/ui/button";

export default function ItemIntern() {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [navegar, setNavegar] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    username: "",
    email: "",
    location: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cargar los items no asignados al montar el componente
  useEffect(() => {
    const fetchUnassignedItems = async () => {
      try {
        setLoading(true);

        // Obtener el ID del usuario actual desde el token
        const userData = decodeAndDisplayToken();
        if (userData && userData.id) {
          setCurrentUserId(userData.id);
        } else {
          console.warn("No se pudo obtener el ID del usuario desde el token");
          toast.error("Error al obtener información del usuario");
        }

        // Obtener los items no asignados
        const response = await itemService.getUnassignedItems();

        if (response && response.result) {
          setItems(response.result);
          setFilteredItems(response.result);
        } else {
          setItems([]);
          setFilteredItems([]);
        }
      } catch (error) {
        console.error("Error al cargar los items no asignados:", error);
        toast.error("Error al cargar los bienes disponibles", {
          id: "load-error",
          duration: 3000,
        });
        setItems([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUnassignedItems();
  }, []);

  // Cargar datos del usuario para el perfil
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Obtener el ID del usuario desde el token
        const tokenData = decodeAndDisplayToken();

        if (tokenData && tokenData.id) {
          // Guardar el ID en localStorage para futuras referencias
          localStorage.setItem("userId", tokenData.id);

          // Obtener los datos completos del usuario usando getUserById
          const response = await getUserById(tokenData.id);

          if (response && response.result) {
            const userData = response.result;
            setUserData({
              id: userData.id,
              fullName: userData.fullName || "",
              username: userData.username || "",
              email: userData.email || "",
              location: userData.location || "",
            });
          }
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
      }
    };

    loadUserData();
  }, [dialogOpen]);

  // Filtrar items cuando cambia el término de búsqueda
  useEffect(() => {
    if (items.length > 0) {
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().includes(navegar.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(navegar.toLowerCase()))
      );
      setFilteredItems(filtered);
    }
  }, [navegar, items]);

  const handleSearchChange = (e) => {
    setNavegar(e.target.value);
  };

  const handleNavigation = (page) => {
    navigate(page);
  };

  const handleAssignItem = async (itemId) => {
    try {
      if (!currentUserId) {
        toast.error("No se pudo identificar al usuario actual", {
          id: "user-error",
          duration: 3000,
        });
        return;
      }

      // Confirmar con el usuario antes de asignar
      if (
        window.confirm(
          "¿Estás seguro de que deseas asignar este bien a tu cuenta?"
        )
      ) {
        // Llamar al método assignItem del itemService
        const response = await itemService.assignItem(itemId, currentUserId);

        // Mostrar mensaje de éxito
        toast.success("Bien asignado correctamente", {
          id: "assign-success",
          duration: 3000,
        });

        // Actualizar la lista de items (eliminar el item asignado)
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        setFilteredItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      }
    } catch (error) {
      console.error("Error al asignar el item:", error);
      toast.error("Error al asignar el bien", {
        id: "assign-error",
        duration: 3000,
      });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateUserProfile(userData);
      setDialogOpen(false);

      // Recargar los datos del usuario después de actualizar
      const updatedUserData = await getUserById(userData.id);
      if (updatedUserData && updatedUserData.result) {
        const newProfileData = {
          id: updatedUserData.result.id,
          fullName: updatedUserData.result.fullName,
          username: updatedUserData.result.username,
          email: updatedUserData.result.email,
          location: updatedUserData.result.location,
        };
        setUserData(newProfileData);

        // Usar un ID único para el toast para evitar duplicados
        toast.success("Perfil actualizado correctamente", {
          id: "profile-update-success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error(error.message || "Error al actualizar el perfil", {
        id: "profile-update-error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      <nav className="bg-white p-4">
        <div className="flex justify-between items-center mx-auto px-5">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation("/internHome")}
          >
            <img src="/logomatioo.png" alt="Logo" className="h-10" />
          </div>

          <div className="flex space-x-6">
            <Link to="/internHome">
              <Button className="cursor-pointer text-sm bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] hover:scale-105  px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                Volver a tus bienes
              </Button>
            </Link>

            {/* Botón Mi Perfil con Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center  gap-4 h-10 px-4 rounded-2xl cursor-pointer bg-white hover:bg-skyblue-bg-icon transition-all duration-300 ease-in-out hover:scale-105 rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] border-1 border-gray-500">
                  <img
                    src="/asidebarIMG/profile.png"
                    alt="Perfil"
                    className="w-[1.3em] min-w-[1.3em] flex-shrink-0"
                  />
                  <span className="transition-all duration-200 ease-in-out opacity-100 delay-200">
                    Mi Perfil
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-6 ml-[4em] bg-white rounded-2xl shadow-lg border border-purple-100 transform -translate-x-1/2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
                    <img
                      src="/asidebarIMG/profile.png"
                      alt="Perfil"
                      className="w-10 h-10 p-2 bg-purple-50 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-darkpurple-title">
                        Mi Perfil
                      </h3>
                      <p className="text-sm text-gray-600">
                        {userData.email || "Cargando..."}
                      </p>
                    </div>
                  </div>

                  <Dialog
                    open={dialogOpen}
                    onOpenChange={(open) => {
                      setDialogOpen(open);
                      // Si se cierra el diálogo, resetear cualquier error
                      if (!open) {
                        setIsLoading(false);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="mt-2 bg-green-confirm cursor-pointer"
                        onClick={() => document.body.click()}
                      >
                        Editar Perfil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
                          Editar Perfil
                        </DialogTitle>
                        <DialogDescription>
                          Correo: {userData.email || "Cargando..."}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleProfileUpdate}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="fullName"
                              className="text-right text-[1em]"
                            >
                              Nombre Completo
                            </Label>
                            <Input
                              id="fullName"
                              value={userData.fullName || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su nombre completo"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="username"
                              className="text-right text-[1em]"
                            >
                              Usuario
                            </Label>
                            <Input
                              id="username"
                              value={userData.username || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su nombre de usuario"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="email"
                              className="text-right text-[1em]"
                            >
                              Correo
                            </Label>
                            <Input
                              id="email"
                              value={userData.email || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su correo electrónico"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="location"
                              className="text-right text-[1em]"
                            >
                              Ubicación
                            </Label>
                            <Input
                              id="location"
                              value={userData.location || ""}
                              onChange={handleInputChange}
                              placeholder="Ingrese su ubicación"
                              className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="bg-green-confirm"
                            disabled={isLoading}
                          >
                            {isLoading ? "Guardando..." : "Guardar cambios"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </PopoverContent>
            </Popover>

            {/* Botón Cerrar sesión */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center justify-center gap-4 h-10 px-4 rounded-2xl cursor-pointer bg-red-bg-icon transition-all duration-300 ease-in-out hover:scale-105 rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em]">
                  <img
                    src="/asidebarIMG/closeAccount.png"
                    alt="Cerrar sesión"
                    className="w-[1.3em] min-w-[1.3em] flex-shrink-0"
                  />
                  <span className="text-white">Cerrar sesión</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-4 ml-[4em] bg-white rounded-lg shadow-lg border border-gray-200 transform -translate-x-1/4">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-gray-800">
                    ¿Estás seguro que deseas cerrar sesión?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                      onClick={handleLogout}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
      <div className="flex min-h-screen w-full pb-2 bg-linear-to-b/srgb from-white to-purple-400">
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:px-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Bienes disponibles
              </h1>
              <img
                src="/itemIII.png"
                alt="becario"
                className="ml-auto w-[7em] h-[7em] object-contain"
              />
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="search"
                  value={navegar}
                  onChange={handleSearchChange}
                  className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-50 font-medium"
                  placeholder="Buscar bien..."
                />
              </div>
              <div className="flex justify-end flex-grow"></div>
            </div>

            {/* Estado de carga */}
            {loading && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-gray-600">
                  Cargando bienes disponibles...
                </p>
              </div>
            )}

            {/* Mensaje si no hay items */}
            {!loading && filteredItems.length === 0 && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-gray-600">
                  No hay bienes disponibles para asignar.
                </p>
              </div>
            )}

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-[3em]">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card-bg rounded-lg shadow-md hover:scale-105 w-[auto]"
                >
                  <div className="flex justify-center bg-white rounded-lg p-2">
                    <img
                      src={item.imageUrl || "/defaultItem.png"}
                      alt={item.name}
                      className="mx-auto mb-4 w-[8em]"
                      onError={(e) => {
                        e.target.src = "/defaultItem.png";
                      }}
                    />
                  </div>
                  <div className="px-4 py-3 bg-purple-800 rounded-b-lg border-t-2 border-purple-950">
                    <h3 className="text-[1.8em] font-semibold text-white">
                      {item.name}
                    </h3>

                    <div className="flex justify-between gap-4 align-middle">
                      <p className="text-white">{item.description}</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <p className="text-sm text-gray-200">
                        Código: {item.code}
                      </p>
                      
                    </div>

                    <div className="flex justify-end mt-2">
                      <Button
                        className="py-1 px-3 bg-green-confirm rounded-full text-amber-50"
                        onClick={() => {
                          setSelectedItemId(item.id);
                          setConfirmDialogOpen(true);
                        }}
                      >
                        Asignar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Dialog
              open={confirmDialogOpen}
              onOpenChange={setConfirmDialogOpen}
            >
              <DialogContent className="max-w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-darkpurple-title text-[1.5em] font-semibold">
                    Confirmar asignación
                  </DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que deseas asignar este bien a tu cuenta?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setConfirmDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-green-confirm text-white"
                    onClick={async () => {
                      try {
                        const response = await itemService.assignItem(
                          selectedItemId,
                          currentUserId
                        );

                        toast.success("Bien asignado correctamente", {
                          id: "assign-success",
                          duration: 3000,
                        });

                        // Remover el item asignado
                        setItems((prev) =>
                          prev.filter((i) => i.id !== selectedItemId)
                        );
                        setFilteredItems((prev) =>
                          prev.filter((i) => i.id !== selectedItemId)
                        );
                      } catch (error) {
                        console.error("Error al asignar el bien:", error);
                        toast.error("Error al asignar el bien", {
                          id: "assign-error",
                          duration: 3000,
                        });
                      } finally {
                        setConfirmDialogOpen(false);
                      }
                    }}
                  >
                    Confirmar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </>
  );
}
