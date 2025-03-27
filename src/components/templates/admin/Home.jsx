import React from "react";
import AsideBar from "../../AsideBar";
import SplashCursor from "../../../../Reactbits/SplashCursor/SplashCursor";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="h-screen sticky top-0 z-10">
        <AsideBar />
      </aside>
      <main className="flex-1 bg-white relative">
        {/* SplashCursor solo en el contenido central */}
        <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
          <SplashCursor />
        </div>

        <div className="flex flex-col items-center justify-center text-center p-6 min-h-screen">
          <img src="/matioo.png" alt="" className="w-[32em]" />
          <h2 className="text-[1.5em] font-semibold">Tu gestor de bienes preferido :)</h2>
          <img src="/homeMatioo.png" alt="MatiooHome" className="h-[28em] mt-4" />
        </div>
      </main>
    </div>
  );
}
