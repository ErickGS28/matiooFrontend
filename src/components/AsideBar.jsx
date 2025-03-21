import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoAside from "./ui/logoAside";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function AsideBar({ activePage = "", onExpandChange }) {
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('asideBarExpanded');
    return saved ? JSON.parse(saved) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('asideBarExpanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  const handleNavigation = (page) => {
    navigate(page);
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    onExpandChange?.(!isExpanded);
  };

  const iconClasses = (iconName) => {
    return `flex items-center ${isExpanded ? "justify-start gap-4 h-10" : "justify-center"} cursor-pointer ${
      activePage === iconName ? "bg-skyblue-bg-icon" : "bg-white hover:bg-skyblue-bg-icon"
    } ${isExpanded ? "w-[90%] px-4 rounded-2xl" : "w-[2.5em] h-[2.5em] rounded-full"} transition-all duration-300 ease-in-out hover:scale-105`;
  };

  const textClasses = `transition-all duration-200 ease-in-out ${isExpanded ? "opacity-100 delay-200" : "opacity-0 w-0 overflow-hidden"}`;
  
  const imageClasses = "w-[1.3em] min-w-[1.3em] flex-shrink-0";
  
  return (
    <>
      <div className={`fixed left-0 top-0 z-50 ${isExpanded ? "w-[16em]" : "w-[4em]"} transition-all duration-300 ease-in-out`}>
        <div className={`flex flex-col h-screen bg-purple-bg-aside shadow-2xl`}>
          <div className={`flex ${isExpanded ? "justify-center" : "justify-center"} p-4 bg-white shadow-2xl cursor-pointer transition-all duration-300 ease-in-out`} onClick={() => handleNavigation("/home")}>
            <LogoAside isExpanded={isExpanded} />
          </div>

          <div className="flex flex-col flex-grow items-center mt-8 space-y-4 gap-3 font-semibold">
            <div className={iconClasses('responsible')} onClick={() => handleNavigation('/responsible')}>
              <img src="/asidebarIMG/responsible.png" alt="Responsable" className={imageClasses} />
              <span className={textClasses}>Responsables</span>
            </div>

            <div className={iconClasses('interns')} onClick={() => handleNavigation('/interns')}>
              <img src="/asidebarIMG/interns.png" alt="Becarios" className={imageClasses} />
              <span className={textClasses}>Becarios</span>
            </div>

           

            <div className={iconClasses('commonArea')} onClick={() => handleNavigation('/commonArea')}>
              <img src="/asidebarIMG/zona.png" alt="Zona" className={imageClasses} />
              <span className={textClasses}>Áreas comunes</span>
            </div>

            <div className={iconClasses('itemType')} onClick={() => handleNavigation('/itemType')}>
              <img src="/asidebarIMG/item2.png" alt="Item 2" className={imageClasses} />
              <span className={textClasses}>Tipos de bien</span>
            </div>

            <div className={iconClasses('item')} onClick={() => handleNavigation('/item')}>
              <img src="/asidebarIMG/item.png" alt="Item" className={imageClasses} />
              <span className={textClasses}>Bienes</span>
            </div>

            <div className={iconClasses('brand')} onClick={() => handleNavigation('/brand')}>
              <img src="/asidebarIMG/brand.png" alt="Marca" className={imageClasses} />
              <span className={textClasses}>Marcas</span>
            </div>

            <div className={iconClasses('model')} onClick={() => handleNavigation('/model')}>
              <img src="/asidebarIMG/notaChida.png" alt="Nota Chida" className={imageClasses} />
              <span className={textClasses}>Modelos</span>
            </div>

            <div className="mt-[4em] mb-4 flex flex-col items-center space-y-4 w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <div className={`flex items-center ${isExpanded ? "justify-start gap-4 h-10 w-[90%] px-4 rounded-2xl" : "justify-center w-[2.5em] h-[2.5em] rounded-full"} cursor-pointer bg-white hover:bg-skyblue-bg-icon transition-all duration-300 ease-in-out hover:scale-105`}>
                    <img src="/asidebarIMG/profile.png" alt="Perfil" className={imageClasses} />
                    <span className={textClasses}>Mi Perfil</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-6 ml-[4em] bg-white rounded-2xl shadow-lg border border-purple-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
                      <img src="/asidebarIMG/profile.png" alt="Perfil" className="w-10 h-10 p-2 bg-purple-50 rounded-full" />
                      <div>
                        <h3 className="font-semibold text-darkpurple-title">Mi Perfil</h3>
                        <p className="text-sm text-gray-600">usuario@example.com</p>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="mt-2 bg-green-confirm"
                          onClick={() => document.body.click()}
                        >
                          Editar Perfil
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Editar Perfil</DialogTitle>
                          <DialogDescription>
                            Correo: usuario@example.com
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="usuario" className="text-right text-[1em]">
                              Usuario
                            </Label>
                            <Input id="usuario" value="Jony Boy" className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right text-[1em]">
                              Correo
                            </Label>
                            <Input id="email" value="usuario@example.com" className="col-span-3 rounded-[1em] py-2 px-4 border-2 border-purple-900 w-full" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-green-confirm">Guardar cambios</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <div className={`flex items-center ${isExpanded ? "justify-start gap-4 h-10 w-[90%] px-4 rounded-2xl" : "justify-center w-[2.5em] h-[2.5em] rounded-full"} cursor-pointer bg-red-bg-icon transition-all duration-300 ease-in-out hover:scale-105`}>
                    <img src="/asidebarIMG/closeAccount.png" alt="Cerrar sesión" className={imageClasses} />
                    <span className={`${textClasses} text-white`}>Cerrar sesión</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-4 ml-[4em] bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-gray-800">¿Estás seguro que deseas cerrar sesión?</p>
                    <div className="flex justify-end">
                      <button 
                        className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        onClick={() => handleNavigation("/")}
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

        <div className={`absolute ${isExpanded ? "right-[-2.5em]" : "right-[-2.5em]"} top-[1em] cursor-pointer bg-transparent !important`}> 
          <img 
            src="/asidebarIMG/barra-lateral.png" 
            alt="Menu" 
            onClick={toggleMenu}
            className="w-[1.8em] h-[1.8em] hover:scale-110 transition-transform duration-200" 
          />
        </div>
      </div>

      <div className={`w-[4em] shrink-0 transition-all duration-300 ease-in-out ${isExpanded ? "w-[16em]" : "w-[4em]"}`} />
    </>
  );
}