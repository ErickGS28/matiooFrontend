import React, { useState } from "react";
import AsideBar from "../../AsideBar";
import HeaderCard from "@/components/ui/HeaderCard";
import BtnRegisterHeader from "@/components/ui/BtnRegisterHeader";
import EditCommonAreaDialog from "@/components/ui/EditCommonAreaDialog";

export default function Brand() {
    const [userStatus, setUserStatus] = useState({});

    const handleStatusChange = (userId) => {
        setUserStatus(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const cardData = [
        { name: "Mesk-Yanpol", img: "/imgDefault.jpg" },
        { name: "LG", img: "/imgDefault.jpg" },
        { name: "IKEA", img: "/imgDefault.jpg" },
        { name: "IKEA2", img: "/imgDefault.jpg" },
        { name: "Razer", img: "/imgDefault.jpg" },
    ];

    const handleSave = (formData) => {
        // Aquí iría la lógica para guardar los cambios
        console.log('Datos guardados:', formData);
    };

    return (
        <>
            <div className="flex min-h-screen w-full">
                <AsideBar activePage="brand" />
                <main className="flex-1 flex flex-col">
                    <div className="flex flex-col p-5 md:p-20 w-full">
                        <HeaderCard title="Marcas" image="/commonArea.png" filterInput="Buscar marca..." />
                        <div className="flex justify-end flex-grow">
                            <BtnRegisterHeader tileBtn="Agregar" imgPopover="../asidebarIMG/brand.png" infoLabel="Seleccionar marca" infoBtn="Agregar Marca" />
                        </div>

                        {/* Cards Container */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-[3em]">
                            {cardData.map((card, index) => (
                                <div key={index} className="bg-card-bg rounded-lg shadow-md p-4">
                                    <div className="text-center">
                                        <img src={card.img} alt={card.name} className="mx-auto mb-4" />
                                    </div>
                                    <div className="px-3">
                                        <h3 className="text-[1.8em] font-semibold text-darkpurple-title">{card.name}</h3>

                                        <EditCommonAreaDialog
                                            user={{
                                                name: card.name,
                                                img: card.img,
                                                status: userStatus[index]
                                            }}
                                            onSave={handleSave}
                                        />
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