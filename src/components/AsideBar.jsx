import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoAside from "./ui/logoAside";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"




export default function AsideBar({ activePage = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(page);
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const iconClasses = (iconName) => {
    return `flex items-center ${isExpanded ? "justify-start" : "justify-center"} cursor-pointer ${
      activePage === iconName ? "bg-skyblue-bg-icon" : "bg-white"
    } ${isExpanded ? "w-[94%] px-4 py-2 rounded-2xl" : "w-[2.5em] h-[2.5em] rounded-full"} transition-all duration-300 ease-in-out`;
  };

  return (
    <div className="flex bg-white font-semibold">
      <div className={`min-h-full bg-purple-bg-aside shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? "w-54" : "w-20"}`}>
        <div className={`flex ${isExpanded ? "justify-center" : "justify-center"} p-4 bg-white shadow-2xl cursor-pointer transition-all duration-300 ease-in-out`} onClick={() => handleNavigation("/home")}>
          <LogoAside isExpanded={isExpanded} />
        </div>

        <div className="flex flex-col items-center space-y-6 mt-4">
          <div className={iconClasses('responsible')} onClick={() => handleNavigation('/responsible')}>
            <img src="/asidebarIMG/responsible.png" alt="Responsable" className="w-[1.2em]" />
            {isExpanded && <span className="ml-4">Responsables</span>}
          </div>

          <div className={iconClasses('interns')} onClick={() => handleNavigation('/interns')}>
            <img src="/asidebarIMG/interns.png" alt="Becarios" className="w-[1.8em]" />
            {isExpanded && <span className="ml-4">Becarios</span>}
          </div>

          <div className={iconClasses('listItem')} onClick={() => handleNavigation('/listItem')}>
            <img src="/asidebarIMG/listItem.png" alt="Notas" className="w-[1.5em]" />
            {isExpanded && <span className="ml-4">Notas</span>}
          </div>

          <div className={iconClasses('commonArea')} onClick={() => handleNavigation('/commonArea')}>
            <img src="/asidebarIMG/zona.png" alt="Zona" className="w-[1.5em]" />
            {isExpanded && <span className="ml-4">Áreas comunes</span>}
          </div>

          <div className={iconClasses('itemType')} onClick={() => handleNavigation('/itemType')}>
            <img src="/asidebarIMG/item2.png" alt="Item 2" className="w-[1.8em]" />
            {isExpanded && <span className="ml-4">Tipos de bien</span>}
          </div>

          <div className={iconClasses('item')} onClick={() => handleNavigation('/item')}>
            <img src="/asidebarIMG/item.png" alt="Item" className="w-[1.8em]" />
            {isExpanded && <span className="ml-4">Bienes</span>}
          </div>

          <div className={iconClasses('brand')} onClick={() => handleNavigation('/brand')}>
            <img src="/asidebarIMG/brand.png" alt="Marca" className="w-[1.2em]" />
            {isExpanded && <span className="ml-4">Marcas</span>}
          </div>

          <div className={iconClasses('model')} onClick={() => handleNavigation('/model')}>
            <img src="/asidebarIMG/notaChida.png" alt="Nota Chida" className="w-[1.2em]" />
            {isExpanded && <span className="ml-4">Modelos</span>}
          </div>
        </div>

        <div className="mt-8 mb-4 flex flex-col items-center space-y-4">
        <Popover className="mt-10">
            <PopoverTrigger asChild>
              <div
                className={`flex items-center ${isExpanded ? "justify-start" : "justify-center"} cursor-pointer bg-white ${isExpanded ? "w-[94%] px-4 py-2 rounded-2xl" : "w-[2.5em] h-[2.5em] rounded-full"} transition-all duration-300 ease-in-out`}
              >
                <img src="/asidebarIMG/profile.png" alt="Perfil" className="w-[1.5em]" />
                {isExpanded && <span className="ml-4">Mi Perfil</span>}
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-4 ml-[4em]">
              <div>
                <p>Correo: usuario@example.com</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-2 bg-green-confirm">Editar Perfil</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] ">
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
          

          <div
            className={`flex items-center ${isExpanded ? "justify-start" : "justify-center"} cursor-pointer bg-red-bg-icon ${isExpanded ? "w-[94%] px-4 py-2 rounded-2xl" : "w-[2.5em] h-[2.5em] rounded-full"} transition-all duration-300 ease-in-out`}
            onClick={() => handleNavigation("/")}
          >
            <img src="/asidebarIMG/closeAccount.png" alt="Cerrar sesión" className="w-[1.2em]" />
            {isExpanded && <span className="ml-4 text-white">Cerrar sesión</span>}
          </div>
        </div>
      </div>

      <div className="w-[1.8em] ml-2 mt-[1em] cursor-pointer bg-transparent" >
        <img src="/asidebarIMG/barra-lateral.png" alt="Menu"  onClick={toggleMenu}/>
      </div>
    </div>
  );
}