import React from "react";
import { useNavigate } from "react-router-dom";
import LogoAside from "./ui/logoAside";

export default function AsideBar({ activePage = "" }) {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(page);
  };

  const iconClasses = (iconName) => {
    console.log("activePage:", activePage, "iconName:", iconName);
    return `w-[2.5em] h-[2.5em] m-auto mt-[1.4em] rounded-full flex items-center justify-center cursor-pointer ${
      activePage === iconName ? "bg-skyblue-bg-icon" : "bg-white"
    }`;
  };
  

  return (
    <div className="min-h-full bg-purple-bg-aside shadow flex flex-col">
      <div>
        <div
          className="p-4 bg-white shadow cursor-pointer"
          onClick={() => handleNavigation("/home")}
        >
          <LogoAside />
        </div>

        <div className="w-[1.8em] m-auto mt-[1em]">
          <img src="/asidebarIMG/menu.png" alt="Menu" />
        </div>

        {[
          { label: "Responsable", icon: "responsible", path: "/responsible" },
          { label: "Becarios", icon: "interns", path: "/interns" },
          { label: "Notas", icon: "listItem", path: "/listitem" },
          { label: "Zona común", icon: "zona", path: "/commonArea" },
          { label: "Item 2", icon: "item2", path: "/itemType" },
          { label: "Item", icon: "item", path: "/item" },
          { label: "Marca", icon: "brand", path: "/brand" },
          { label: "Nota Chida", icon: "notaChida", path: "/model" },
        ].map(({ label, icon, path }) => (
          <div key={icon} className={iconClasses(icon)} onClick={() => handleNavigation(path)}>
            <img src={`/asidebarIMG/${icon}.png`} alt={label} className="w-[1.5em]" />
          </div>
        ))}
      </div>

      <div className="mt-auto mb-4">
        <div
          className="w-[2.5em] h-[2.5em] m-auto bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => handleNavigation("/profile")}
        >
          <img src="/asidebarIMG/profile.png" alt="Perfil" className="w-[1.5em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[1em] bg-red-bg-icon rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <img src="/asidebarIMG/closeAccount.png" alt="Cerrar sesión" className="w-[1.2em]" />
        </div>
      </div>
    </div>
  );
}
