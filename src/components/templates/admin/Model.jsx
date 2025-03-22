import React, { useState } from "react";
import AsideBar from "../../AsideBar";
import EditCommonAreaDialog from "@/components/templates/admin/dialog/EditCommonAreaDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Model() {
  const [userStatus, setUserStatus] = useState({});
  const [navegar, setNavegar] = useState("");

  const handleStatusChange = (userId) => {
    setUserStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const cardData = [
    { name: "L-flat01", img: "/imgDefault.jpg" },
    { name: "L-flat02", img: "/imgDefault.jpg" },
    { name: "L-flat03", img: "/imgDefault.jpg" },
    { name: "L-flat04", img: "/imgDefault.jpg" },
    { name: "L-flat05", img: "/imgDefault.jpg" },
  ];

  const handleSave = (formData) => {
    // Aquí iría la lógica para guardar los cambios
    console.log("Datos guardados:", formData);
  };

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="model" />
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:p-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Modelos
              </h1>
              <img
                src="/model.png"
                alt="becario"
                className="ml-auto w-[5em] h-[5em] object-contain"
              />
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={navegar}
                  onChange={(e) => setNavegar(e.target.value)}
                  className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                  placeholder="Buscar modelo..."
                />
                <div className="w-[1.8em] h-[1.8em] bg-darkpurple-icon rounded-full flex items-center justify-center ml-4">
                  <img src="/find.png" alt="Buscar" className="w-[1.2em]" />
                </div>
                <div className="w-[2em] h-[2em] flex items-center justify-center ml-4">
                  <img src="/filter.png" alt="Filtrar" />
                </div>
              </div>
              <div className="flex justify-end flex-grow">
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <button
                        type="submit"
                        className="flex items-center justify-center ml-auto bg-green-confirm text-white font-semibold py-1 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer"
                      >
                        <p className="text-[1.5em] mr-2">+</p>
                        Agregar
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-4 w-[20em] mr-[12em] bg-white border-1 border-black">
                    <div className="w-[90%] m-auto">
                      <div className="mt-[2em] flex items-center justify-center border-b border-purple-100">
                        <img
                          src="../asidebarIMG/notaChida.png"
                          alt="Cerrar sesión"
                          className="w-[4em] mb-[2em]"
                        />
                      </div>

                      <div className="mt-[0.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="model"
                          className="text-darkpurple-title"
                        >
                          Seleccionar modelo
                        </Label>
                        <Input
                          type="text"
                          id="model"
                          placeholder=""
                          className="border-black"
                        />
                      </div>

                      <div className="mt-[1.5em] mb-[2em] flex justify-center">
                        <Button type="submit" className="bg-green-confirm">
                          Agregar Modelo
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-[3em]">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="bg-card-bg rounded-lg shadow-md p-4"
                >
                  <div className="text-center">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="mx-auto mb-4"
                    />
                  </div>
                  <div className="px-3">
                    <h3 className="text-[1.8em] font-semibold text-darkpurple-title">
                      {card.name}
                    </h3>

                    <div className="flex justify-between">
                      <EditCommonAreaDialog
                        user={{
                          name: card.name,
                          img: card.img,
                          status: userStatus[index],
                        }}
                        onSave={handleSave}
                      />

                      <Button className="py-1 px-3 bg-red-cancel rounded-full text-amber-50 mt-4">
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
