import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoAside from "./ui/logoAside";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { logout } from "@/services/utils/authUtils";
import { updateUserProfile, getUserById } from "@/services/users/userService";
import { decodeAndDisplayToken } from "@/services/auth/authService";
import { toast } from "react-hot-toast";

export default function AsideBar({ activePage = "", onToggle }) {
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("asideBarExpanded");
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    username: "",
    email: "",
    location: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("asideBarExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const handleNavigation = (page) => {
    navigate(page);
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    onToggle?.(!isExpanded);
  };

  const iconClasses = (iconName) => {
    const isActive = activePage === iconName;
    return `flex items-center ${isExpanded ? "justify-start gap-4 h-10" : "justify-center"
      } cursor-pointer ${isActive
        ? "bg-skyblue-bg-icon font-bold shadow-md"
        : "bg-white hover:bg-skyblue-bg-icon"
      } ${isExpanded ? "w-[90%] px-4 rounded-2xl" : "w-[2.5em] h-[2.5em] rounded-full"
      } transition-all duration-300 ease-in-out hover:scale-105`;
  };

  const textClasses = `transition-all duration-200 ease-in-out ${isExpanded ? "opacity-100 delay-200" : "opacity-0 w-0 overflow-hidden"
    }`;

  const imageClasses = "w-[1.3em] min-w-[1.3em] flex-shrink-0";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [id]: value
    }));
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
          location: updatedUserData.result.location
        };
        setUserData(newProfileData);

        // Usar un ID único para el toast para evitar duplicados
        toast.success("Perfil actualizado correctamente", {
          id: "profile-update-success",
          duration: 3000
        });
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error(error.message || "Error al actualizar el perfil", {
        id: "profile-update-error",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load user data from token when component mounts or dialog opens
  useEffect(() => {
    const loadUserData = async () => {
      let loaded = false;
  
      try {
        const tokenData = decodeAndDisplayToken();
  
        if (tokenData?.id) {
          localStorage.setItem('userId', tokenData.id);
          const response = await getUserById(tokenData.id);
  
          if (response?.result) {
            const profileData = {
              id: response.result.id,
              fullName: response.result.fullName,
              username: response.result.username,
              email: response.result.email,
              location: response.result.location,
            };
            setUserData(profileData);
            loaded = true;
          }
        }
      } catch (err) {
        // Error silencioso en producción
      }
  
      if (!loaded) {
        try {
          const savedUserId = localStorage.getItem('userId');
          if (savedUserId) {
            const response = await getUserById(savedUserId);
  
            if (response?.result) {
              const profileData = {
                id: response.result.id,
                fullName: response.result.fullName,
                username: response.result.username,
                email: response.result.email,
                location: response.result.location,
              };
              setUserData(profileData);
              loaded = true;
            }
          }
        } catch (err) {
          // Error silencioso en producción
        }
      }
  
      if (!loaded) {
        toast.error("No se pudieron cargar los datos del perfil", {
          id: "profile-load-error",
          duration: 3000
        });
      }
    };
  
    loadUserData();
  }, [dialogOpen]);
  
  
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 ${isExpanded ? "w-[16em]" : "w-[4em]"
          } transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-screen bg-purple-bg-aside shadow-2xl">
          {/* Logo y navegación principal */}
          <div
            className="flex justify-center p-4 bg-white shadow-2xl cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => handleNavigation("/home")}
          >
            <LogoAside isExpanded={isExpanded} />
          </div>

          {/* Contenedor principal: Menú superior y sección inferior fija */}
          <div className="flex flex-col flex-grow justify-between">
            {/* Menú superior */}
            <div className="flex flex-col items-center mt-8 space-y-4 gap-3 font-semibold">
              <div
                className={iconClasses("responsible")}
                onClick={() => handleNavigation("/responsible")}
              >
                <img
                  src="/asidebarIMG/responsible.png"
                  alt="Responsable"
                  className={imageClasses}
                />
                <span className={textClasses}>Responsables</span>
              </div>

              <div
                className={iconClasses("interns")}
                onClick={() => handleNavigation("/interns")}
              >
                <img
                  src="/asidebarIMG/interns.png"
                  alt="Becarios"
                  className={imageClasses}
                />
                <span className={textClasses}>Becarios</span>
              </div>

              <div
                className={iconClasses("item")}
                onClick={() => handleNavigation("/item")}
              >
                <img
                  src="/asidebarIMG/item.png"
                  alt="Item"
                  className={imageClasses}
                />
                <span className={textClasses}>Bienes</span>
              </div>

              <div
                className={iconClasses("itemType")}
                onClick={() => handleNavigation("/itemType")}
              >
                <img
                  src="/asidebarIMG/item2.png"
                  alt="Item 2"
                  className={imageClasses}
                />
                <span className={textClasses}>Tipos de bien</span>
              </div>

              <div
                className={iconClasses("brand")}
                onClick={() => handleNavigation("/brand")}
              >
                <img
                  src="/asidebarIMG/brand.png"
                  alt="Marca"
                  className={imageClasses}
                />
                <span className={textClasses}>Marcas</span>
              </div>

              <div
                className={iconClasses("model")}
                onClick={() => handleNavigation("/model")}
              >
                <img
                  src="/asidebarIMG/notaChida.png"
                  alt="Nota Chida"
                  className={imageClasses}
                />
                <span className={textClasses}>Modelos</span>
              </div>

              <div
                className={iconClasses("commonArea")}
                onClick={() => handleNavigation("/commonArea")}
              >
                <img
                  src="/asidebarIMG/zona.png"
                  alt="Zona"
                  className={imageClasses}
                />
                <span className={textClasses}>Áreas comunes</span>
              </div>
            </div>

            {/* Sección inferior fija: Mi Perfil y Cerrar sesión */}
            <div className="flex flex-col items-center space-y-4 w-full pb-6 border-t border-purple-200 pt-6">
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={`flex items-center ${isExpanded
                      ? "justify-start gap-4 h-10 w-[90%] px-4 rounded-2xl"
                      : "justify-center w-[2.5em] h-[2.5em] rounded-full"
                      } cursor-pointer bg-white hover:bg-skyblue-bg-icon transition-all duration-300 ease-in-out hover:scale-105`}
                  >
                    <img
                      src="/asidebarIMG/profile.png"
                      alt="Perfil"
                      className={imageClasses}
                    />
                    <span className={textClasses}>Mi Perfil</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-6 bg-white rounded-2xl shadow-lg border border-purple-100 transform translate-x-1/9">
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

                    <Dialog open={dialogOpen} onOpenChange={(open) => {
                      setDialogOpen(open);
                      // Si se cierra el diálogo, resetear cualquier error
                      if (!open) {
                        setIsLoading(false);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <div className="flex justify-end">
                          <Button
                            className=" cursor-pointer bg-green-confirm"
                            onClick={() => document.body.click()}
                          >
                            Editar Perfil
                          </Button>
                        </div>

                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] p-8">
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
                              <Label htmlFor="fullName" className="text-left text-[1em]">
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
                              <Label htmlFor="username" className="text-left text-[1em]">
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
                              <Label htmlFor="email" className="text-left text-[1em]">
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
                              <Label htmlFor="location" className="text-left text-[1em]">
                                Ubicación
                              </Label>
                              <Input
                                id="location"
                                value={userData.location || ""}
                                onChange={handleInputChange}
                                placeholder="Ingrese su ubicación"
                                className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full"
                                required
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              className="cursor-pointer bg-green-confirm"
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

              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={`flex items-center ${isExpanded
                      ? "justify-start gap-4 h-10 w-[90%] px-4 rounded-2xl"
                      : "justify-center w-[2.5em] h-[2.5em] rounded-full"
                      } cursor-pointer bg-red-bg-icon transition-all duration-300 ease-in-out hover:scale-105`}
                  >
                    <img
                      src="/asidebarIMG/closeAccount.png"
                      alt="Cerrar sesión"
                      className={imageClasses}
                    />
                    <span className={`${textClasses} text-white`}>
                      Cerrar sesión
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 transform translate-x-1/9">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-800">
                      ¿Estás seguro que deseas cerrar sesión?
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="cursor-pointer px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
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
        </div>

        {/* Botón para contraer/expandir el AsideBar */}
        <div
          className={`absolute ${isExpanded ? "right-[-2.5em]" : "right-[-2.5em]"
            } top-[1em] cursor-pointer bg-transparent`}
        >
          <img
            src="/asidebarIMG/barra-lateral.png"
            alt="Menu"
            onClick={toggleMenu}
            className="w-[1.8em] h-[1.8em] hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>

      {/* Espaciador para evitar que el contenido se solape */}
      <div
        className={`w-[4em] shrink-0 transition-all duration-300 ease-in-out ${isExpanded ? "w-[16em]" : "w-[4em]"
          }`}
      />
    </>
  );
}
