import React from "react";
import AsideBar from "../../AsideBar";

export const Home = () => {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <AsideBar />
      <div className="flex flex-1 items-center justify-center bg-transparent"> {/* Asegúrate de que este contenedor no tenga un fondo gris */}
        <div className="flex flex-col items-center justify-center text-center shadow-2xl p-6 rounded-lg w-full max-w-full min-h-screen bg-transparent"> {/* Asegúrate de que este contenedor no tenga un fondo gris */}
          <img src="/matioo.png" alt="" className="w-[32em]" />
          <h2 className="text-[1.5em] font-semibold">Tu gestor de bienes preferido :)</h2>
          <img src="/homeMatioo.png" alt="MatiooHome" className="h-[28em] mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Home;
