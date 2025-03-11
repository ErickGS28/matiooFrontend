import React, { useState } from "react";
import AsideBar from "../../AsideBar";
import Pages from "../../ui/Pages";

export default function Responsible() {
  const [navegar, setNavegar] = useState("");

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="responsible" />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col p-5 md:p-20 w-full max-w-full min-h-screen">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Responsables
              </h1>
              <img
                src="/responsible.png"
                alt="becario"
                className="ml-auto w-[5em]"
              />
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={navegar}
                  onChange={(e) => setNavegar(e.target.value)}
                  className="w-[25em] rounded-full px-8 border-2 shadow shadow-purple-200 flex-grow py-2 bg-gray-100 font-medium"
                  placeholder="Buscar responsables..."
                />
                <div className="w-[1.8em] h-[1.8em] bg-darkpurple-icon rounded-full flex items-center justify-center ml-4">
                  <img src="/find.png" alt="Buscar" className="w-[1.2em]" />
                </div>
                <div className="w-[2em] h-[2em] flex items-center justify-center ml-4">
                  <img src="/filter.png" alt="Filtrar" />
                </div>
              </div>
              <button
                type="submit"
                className="ml-auto bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer"
              >
                Registrar
              </button>
            </div>

            {/* Contenedor con scroll horizontal SOLO para la tabla */}
            <div className="mt-5 w-full overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg border-separate border-spacing-y-4 min-w-[600px]">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="py-2 px-4">Nombre</th>
                    <th className="py-2 px-4">Marca</th>
                    <th className="py-2 px-4">Detalles</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100">
                    <td className="py-2 px-4 rounded-l-2xl">Monitor</td>
                    <td className="py-2 px-4">LG</td>
                    <td className="py-2 px-4">...</td>
                    <td className="py-2 px-4 rounded-r-2xl">...</td>
                  </tr>
                  <tr className="bg-purple-100">
                    <td className="py-2 px-4 rounded-l-2xl">Silla plegable</td>
                    <td className="py-2 px-4">IKEA</td>
                    <td className="py-2 px-4">...</td>
                    <td className="py-2 px-4 rounded-r-2xl">...</td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td className="py-2 px-4 rounded-l-2xl">Escritorio</td>
                    <td className="py-2 px-4">Yanpol</td>
                    <td className="py-2 px-4">...</td>
                    <td className="py-2 px-4 rounded-r-2xl">...</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <Pages />
          </div>
        </div>
      </div>
    </>
  );
}
