import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileDialog } from "./ProfileDialog";
import { AssignItemDialog } from "./AssignItemDialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function InternHome() {
  const [navegar, setNavegar] = useState("");  // Declaramos el estado para 'navegar'
  const navigate = useNavigate();

  const cardData = [
    { name: "Monitor", img: "/defaultItem.png", description: "Monitor chido" },
    { name: "Silla eco", img: "/defaultItem.png", description: "Silla de lo mejor" },
    { name: "Escritorio", img: "/defaultItem.png", description: "Escritorio de Mesk" },
    { name: "Mouse Razer", img: "/defaultItem.png", description: "Mouse del god" },
    { name: "Silla gamer", img: "/defaultItem.png", description: "Silla gamer 100/10" },
    { name: "Escritorio 2", img: "/defaultItem.png", description: "Escritorio de papi Yanpol" },
    { name: "Mousepad", img: "/defaultItem.png", description: "Mouse del Stamatioo" },
  ];

  const handleSave = (formData) => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Datos guardados:', formData);
  };

  return (
    <>
      <nav className="bg-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/internHome")}>
            <img
              src="/logomatioo.png"
              alt="Logo"
              className="h-10"
            />
          </div>

          <div className="flex space-x-6">
            <Link to="/itemIntern">
              <Button className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] hover:scale-105  px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                Ver bienes
              </Button>
            </Link>

            <AssignItemDialog />
            <ProfileDialog user={{ name: "Santiago", password: "123456" }} />
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen w-full mb-[2em] bg-purple-100">
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:px-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Bienes que ocupas
              </h1>
              <img
                src="/itemIntern.png"
                alt="becario"
                className="ml-auto w-[7em] h-[7em] object-contain"
              />
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="search"
                  value={navegar}
                  onChange={(e) => setNavegar(e.target.value)}  // Actualizamos el estado 'navegar'
                  className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                  placeholder="Buscar bien..."
                />
              </div>
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-[3em]">
              {cardData.map((card, index) => (
                <div key={index} className="bg-card-bg rounded-lg shadow-md p-4 hover:scale-105 w-[auto]">
                  <div className="flex justify-center bg-white rounded-2xl">
                    <img src={card.img} alt={card.name} className="mx-auto mb-4 w-[8em]" />
                  </div>
                  <div className="px-3">
                    <h3 className="text-[1.8em] font-semibold text-mdpurple-htext">{card.name}</h3>
                    <div className="flex justify-between gap-4 align-middle">
                      <p className="text-gray-800">{card.description}</p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button className="cursor-pointer py-1 px-3 bg-red-cancel rounded-full text-amber-50">
                        Quitar
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
