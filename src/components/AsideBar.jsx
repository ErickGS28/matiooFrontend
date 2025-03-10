import React from "react";
import { useNavigate } from "react-router-dom";
import LogoAside from "./ui/logoAside";

export default function AsideBar({ activePage = "" }) {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(page);
  };

  const iconClasses = (iconName) => {
    return `w-[2.5em] h-[2.5em] m-auto mt-[1.4em] rounded-full flex items-center justify-center cursor-pointer ${
      activePage === iconName ? 'bg-skyblue-bg-icon' : 'bg-white'
    }`;
  };

  return (
    <div className="min-h-full bg-purple-bg-aside shadow flex flex-col">
      <div>
        <div className="p-4 bg-white shadow cursor-pointer" onClick={() => handleNavigation('/home')}>
          <LogoAside />
        </div>
        <div className="w-[1.8em] m-auto mt-[1em]">
          <img src="/asidebarIMG/menu.png" alt="Menu" />
        </div>

        <div className={iconClasses('responsible')} onClick={() => handleNavigation('/responsible')}>
          <img src="/asidebarIMG/responsible.png" alt="Responsable" className="w-[1.2em]" />
        </div>

        <div className={iconClasses('interns')} onClick={() => handleNavigation('/interns')}>
          <img src="/asidebarIMG/interns.png" alt="Becarios" className="w-[1.8em]" />
        </div>

        <div className={iconClasses('listItem')} onClick={() => handleNavigation('/listItem')}>
          <img src="/asidebarIMG/listItem.png" alt="Notas" className="w-[1.5em]" />
        </div>

        <div className={iconClasses('commonArea')} onClick={() => handleNavigation('/commonArea')}>
          <img src="/asidebarIMG/zona.png" alt="Zona" className="w-[1.5em]" />
        </div>

        <div className={iconClasses('itemType')} onClick={() => handleNavigation('/itemType')}>
          <img src="/asidebarIMG/item2.png" alt="Item 2" className="w-[1.8em]" />
        </div>

        <div className={iconClasses('item')} onClick={() => handleNavigation('/item')}>
          <img src="/asidebarIMG/item.png" alt="Item" className="w-[1.8em]" />
        </div>

        <div className={iconClasses('brand')} onClick={() => handleNavigation('/brand')}>
          <img src="/asidebarIMG/brand.png" alt="Marca" className="w-[1.2em]" />
        </div>

        <div className={iconClasses('model')} onClick={() => handleNavigation('/model')}>
          <img src="/asidebarIMG/notaChida.png" alt="Nota Chida" className="w-[1.2em]" />
        </div>
      </div>

      <div className="mt-auto mb-4">
        <div
          className="w-[2.5em] h-[2.5em] m-auto bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => handleNavigation('/profile')}
        >
          <img src="/asidebarIMG/profile.png" alt="Perfil" className="w-[1.5em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[1em] bg-red-bg-icon rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <img src="/asidebarIMG/closeAccount.png" alt="Cerrar sesión" className="w-[1.2em]" />
        </div>
      </div>
    </div>
  );
}
