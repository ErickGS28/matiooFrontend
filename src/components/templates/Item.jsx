import React, { useState } from "react";
import AsideBar from "../AsideBar";

export default function Item() {
    const [navegar, setNavegar] = useState("");

    return (
        <>
            <div className="flex min-h-screen w-full">
                <AsideBar />
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex flex-col p-20 w-full max-w-full min-h-screen">
                        <div className="flex justify-between items-center">
                            <h1 className="text-darkpurple-title text-[2em] font-semibold">Bienes que ocupas</h1>
                            <img src="/chavotaItem.png" alt="Chavota Item" className="ml-auto w-[5em]" />
                        </div>


                        <div className="my-3 mt-5 w-[30em] flex items-center">
                            <input
                                type="text"
                                value={navegar}
                                onChange={(e) => setNavegar(e.target.value)}
                                className="rounded-full px-8 border-2 shadow shadow-purple-200 shadow-lg flex-grow py-2 bg-gray-100 font-medium"
                                placeholder="Buscar bienes que tengo..."
                            />
                            <div className="w-[1.8em] h-[1.8em] bg-darkpurple-icon rounded-full flex items-center justify-center ml-4">
                                <img src="/find.png" alt="Buscar" className="w-[1.2em]" />
                            </div>
                            <div className="w-[2em] h-[2em] flex items-center justify-center ml-4">
                                <img src="/filter.png" alt="" />
                            </div>


                        </div>

                        <div className="flex items-center justify-center mt-[3em] bg-gray-500">
                            <h1>Tabla</h1>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}