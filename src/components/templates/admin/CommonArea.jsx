import React from "react";
import AsideBar from "../../AsideBar";
import HeaderCard from "@/components/ui/HeaderCard";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function CommonArea() {
    const cardData = [
        { name: "Sala", img: "/defaultCommonArea.png" },
        { name: "Comedor", img: "/defaultCommonArea.png" },
        { name: "Cubículo 1", img: "/defaultCommonArea.png" },
        { name: "Cubículo 2", img: "/defaultCommonArea.png" },
        { name: "Cubículo 3", img: "/defaultCommonArea.png" },
    ];

    return (
        <>
            <div className="flex min-h-screen w-full">
                <AsideBar activePage="commonArea" />
                <main className="flex-1 flex flex-col">
                    <div className="flex flex-col p-5 md:p-20 w-full">
                        <HeaderCard title="Áreas comunes" image="/commonArea.png" filterInput="Buscar bien..." />

                        {/* Cards Container */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-[3em]">
                            {cardData.map((card, index) => (
                                <div key={index} className="bg-card-bg rounded-lg shadow-md p-4">
                                    <div className="text-center">
                                        <img src={card.img} alt={card.name} className="mx-auto mb-4" />
                                    </div>
                                    <div className="px-3">
                                        <h3 className="text-[1.8em] font-semibold text-darkpurple-title">{card.name}</h3>
                                        
                                        <button className="bg-cyan-200 hover:bg-purple-300 text-gray-800 font-semibold py-1 px-3 rounded-full mt-4">
                                            Editar
                                        </button>
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