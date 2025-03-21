import Navbar from "./Navbar";
import React, { useState } from "react";
import EditCommonAreaDialog from "@/components/templates/admin/dialog/EditCommonAreaDialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function InternHome() {
    const [userStatus, setUserStatus] = useState({});
    const [navegar, setNavegar] = useState("");


    const handleStatusChange = (userId) => {
        setUserStatus(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const cardData = [
        { name: "Monitor", img: "/defaultItem.png", description: "Monitor chido" },
        { name: "Silla eco", img: "/defaultItem.png", description: "Silla de lo mejor" },
        { name: "Escritorio", img: "/defaultItem.png", description: "Escritorio de Mesk" },
        { name: "Mouse Razer", img: "/defaultItem.png", description: "Mouse del god" },
        { name: "Silla gamer", img: "/defaultItem.png", description: "Silla gamer 100/10" },
        { name: "Escritorio 2", img: "/defaultItem.png", description: "Escritorio de papi Yanpol" },
        { name: "Cubículo 2", img: "/defaultItem.png", description: "Cubículo 2 del Stamatioo" },
        { name: "Silla gamer 2", img: "/defaultCommonArea.png", description: "Silla gamer 2 de Razer" },
    ];

    const handleSave = (formData) => {
        // Aquí iría la lógica para guardar los cambios
        console.log('Datos guardados:', formData);
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen w-full ">

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
                                    placeholder="Buscar bien..."
                                />
                                <div className="w-[1.8em] h-[1.8em] bg-darkpurple-icon rounded-full flex items-center justify-center ml-4">
                                    <img src="/find.png" alt="Buscar" className="w-[1.2em]" />
                                </div>
                                <div className="w-[2em] h-[2em] flex items-center justify-center ml-4">
                                    <img src="/filter.png" alt="Filtrar" />
                                </div>


                            </div>
                            <div className="flex justify-end flex-grow">

                                
                            </div>
                        </div>


                        {/* Cards Container */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-[3em]">
                            {cardData.map((card, index) => (
                                <div key={index} className="bg-card-bg rounded-lg shadow-md p-4">
                                    <div className="text-center">
                                        <img src={card.img} alt={card.name} className="mx-auto mb-4" />
                                    </div>
                                    <div className="px-3">
                                        <h3 className="text-[1.8em] font-semibold text-mdpurple-htext">{card.name}</h3>

                                        <p className="text-gray-800">{card.description}</p>
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