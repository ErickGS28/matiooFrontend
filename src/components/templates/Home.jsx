import React from "react";
import AsideBar from "../AsideBar";

export const Home = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AsideBar />
      {/* Contenedor principal centrado */}
      <div className="flex flex-1 items-center justify-center">
        {/* Contenedor del texto e imagen centrado en columna */}
        <div className="flex flex-col items-center justify-center text-center shadow-2xl p-6 rounded-lg">
          <img src="/matioo.png" alt="" className="" />
          <img src="/homeMatioo.png" alt="MatiooHome" className="w-1/2 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default Home;
