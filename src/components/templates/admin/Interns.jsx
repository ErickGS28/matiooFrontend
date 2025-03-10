import React, { useState } from "react";
import AsideBar from "../../AsideBar";
import Pages from "../../ui/Pages";

export default function Interns() {
    const [navegar, setNavegar] = useState("");

    return (
        <>
            <div className="flex min-h-screen w-full">
                <AsideBar activePage="interns" />
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex flex-col p-20 w-full max-w-full min-h-screen">
                        <div className="flex items-center">
                            <h1 className="text-darkpurple-title text-[2.5em] font-semibold">Becarios</h1>
                            <img src="/becarios.png" alt="becario" className="ml-auto w-[5em]" />
                        </div>

                        <div className="my-3 mt-5 w-full flex items-center">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={navegar}
                                    onChange={(e) => setNavegar(e.target.value)}
                                    className="w-[25em] rounded-full px-8 border-2 shadow shadow-purple-200 shadow-lg flex-grow py-2 bg-gray-100 font-medium"
                                    placeholder="Buscar becarios..."
                                />
                                <div className="w-[1.8em] h-[1.8em] bg-darkpurple-icon rounded-full flex items-center justify-center ml-4">
                                    <img src="/find.png" alt="Buscar" className="w-[1.2em]" />
                                </div>
                                <div className="w-[2em] h-[2em] flex items-center justify-center ml-4">
                                    <img src="/filter.png" alt="" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="ml-[37em] bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow shadow-purple-200 shadow-lg ml-4 cursor-pointer"
                            >
                                Registrar
                            </button>
                        </div>

                        <div className="flex items-center justify-center mt-[3em] bg-gray-500">
                            <h1>Tabla</h1>
                        </div>
                        <Pages/>
                    </div>
                </div>
            </div>
        </>
    );
}
