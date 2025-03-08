import React from "react";
import { useNavigate } from "react-router-dom";
import LogoAside from "./ui/logoAside";

export default function AsideBar() {
  const navigate = useNavigate();

  

  const handleHome = () => {
    navigate('/home');
  };

  const handleResponsible = () => {
    navigate('/responsible');
  };

  const handleInterns = () => {
    navigate('/interns');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-full bg-purple-bg-aside shadow flex flex-col">
      <div>
        <div className="p-4 bg-white shadow cursor-pointer" onClick={handleHome}>
          <LogoAside />
        </div>
        <div className="w-[1.8em] m-auto mt-[1em]">
          <img src="/asidebarIMG/menu.png" alt="Menu" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleResponsible}
        >
          <img src="/asidebarIMG/responsible.png" alt="Caja" className="w-[1.2em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleInterns}
        >
          <img src="/asidebarIMG/interns.png" alt="Caja" className="w-[1.8em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleHome}
        >
          <img src="/asidebarIMG/notes.png" alt="Caja" className="w-[1.5em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleHome}
        >
          <img src="/asidebarIMG/zona.png" alt="Caja" className="w-[1.5em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleHome}
        >
          <img src="/asidebarIMG/item2.png" alt="Caja" className="w-[1.8em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleHome}
        >
          <img src="/asidebarIMG/item.png" alt="Caja" className="w-[1.8em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleHome}
        >
          <img src="/asidebarIMG/notaChida.png" alt="Caja" className="w-[1.2em]" />
        </div>
      </div>

      <div className="mt-auto mb-4">
        <div
          className="w-[2.5em] h-[2.5em] m-auto bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleProfileClick}
        >
          <img src="/asidebarIMG/profile.png" alt="Perfil" className="w-[1.5em]" />
        </div>

        <div
          className="w-[2.5em] h-[2.5em] m-auto mt-[1em] bg-red-bg-icon rounded-full flex items-center justify-center cursor-pointer"
          onClick={handleLogout}
        >
          <img src="/asidebarIMG/closeAccount.png" alt="Cerrar sesión" className="w-[1.2em]" />
        </div>
      </div>
    </div>
  );
}
