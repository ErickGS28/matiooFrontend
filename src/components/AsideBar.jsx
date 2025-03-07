import React from "react";
import LogoAside from "./ui/logoAside";

export default function AsideBar() {
  return (
    <div className="min-h-full bg-purple-bg-aside shadow flex flex-col">
      {/* Elementos superiores */}
      <div>
        <div className="p-4 bg-white shadow">
          <LogoAside />
        </div>
        <div className="w-[1.8em] m-auto mt-[1em]">
          <img src="/menu.png" alt="Menu" />
        </div>

        <div className="w-[2.5em] h-[2.5em] m-auto mt-[2em] bg-white rounded-full flex items-center justify-center">
          <img src="/caja.png" alt="Caja" className="w-[1.8em]" />
        </div>
      </div>

      {/* Elementos inferiores que deseas abajo */}
      <div className="mt-auto mb-4">
        <div className="w-[2.5em] h-[2.5em] m-auto bg-white rounded-full flex items-center justify-center">
          <img src="/profile.png" alt="Perfil" className="w-[1.5em]" />
        </div>

        <div className="w-[2.5em] h-[2.5em] m-auto mt-[1em] bg-red-bg-icon rounded-full flex items-center justify-center">
          <img src="/closeAccount.png" alt="Cerrar sesión" className="w-[1.2em]" />
        </div>
      </div>
    </div>
  );
}
