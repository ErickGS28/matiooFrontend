import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../ui/Alert";

export default function NewPassword() {
    const [newContra, setnewContra] = useState("");
    const [againContra, setAgainContra] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newContra === "" || newContra === null || againContra === "" || againContra === null) {
            console.log("Contra inválida");
            return;
        } else {
            console.log("Contra válida");
            navigate("/");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-50">
            <div className="flex m-auto justify-center gap-6 w-[900px] h-[600px] shadow-2xl p-6 rounded-lg shadow shadow-purple-300 shadow-lg bg-white">
                <div className="flex mt-[3em] mb-[3em]">
                    <div className="flex m-auto w-1/2 rounded-2xl justify-center items-center">
                        <img src="/checkEmail/newPass.png" alt="" className="h-lg object-cover rounded-2xl" />
                    </div>

                    <div className="w-1/2">
                        <section className="text-center">
                            <img src="/logomatioo.png" alt="" className="h-1/3 w-[150px] mx-auto" />
                            <h1 className="text-2xl font-semibold mt-2">
                                Recuerda tu contraseña...
                            </h1>
                        </section>

                        <form onSubmit={handleSubmit}>
                            <section>
                                <div className="my-3 mt-[3em]">
                                    <p className="mb-2 mx-2 font-medium">Ingresa tu nueva contraseña</p>
                                    <input
                                        type="password"
                                        value={newContra}
                                        onChange={(e) => setnewContra(e.target.value)}
                                        className="rounded-full py-2 px-4 border-2 border-purple-900 w-full"
                                    />
                                </div>

                                <div className="my-2 mt-[1.5em]">
                                    <p className="mb-2 mx-2 font-medium">Ingresa nuevamente tu nueva contraseña</p>
                                    <input
                                        type="password"
                                        value={againContra}
                                        onChange={(e) => setAgainContra(e.target.value)}
                                        className="rounded-full px-4 border-2 border-purple-900 w-full py-2"
                                    />
                                </div>
                            </section>

                            <div className="text-center mt-[3em]">
                                <button type="submit" className="bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[200px] shadow shadow-purple-200 shadow-lg cursor-pointer">
                                    Cambiar contraseña
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
};
