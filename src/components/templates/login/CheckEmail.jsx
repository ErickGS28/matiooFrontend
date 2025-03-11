import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckEmail() {
    const [checkEmail, setCheckEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkEmail === "" || checkEmail === null) {
            console.log("Email inválido");
            return;
        } else {
            console.log("Email válido");
            navigate("/confirmCode");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-50">
            <div className="flex justify-center gap-6 w-[800px] shadow-2xl p-6 rounded-lg shadow shadow-purple-300 shadow-lg bg-white">
                <div className="flex mt-[4em] mb-[4em]">
                    <div className="w-1/2 rounded-2xl">
                        <img src="/checkEmail/checkEmail.png" alt="Login" className="h-lg object-cover rounded-2xl" />
                    </div>

                    <div className="w-1/2">
                        <section className="text-center">
                            <img src="/logomatioo.png" alt="Logo" className="h-1/3 w-[150px] mx-auto" />
                            <h1 className="text-2xl font-semibold mt-2">
                                Verifica tu email...
                            </h1>
                        </section>

                        <section className="mt-[4em]">
                            <form onSubmit={handleSubmit}>
                                <div className="my-3 mt-5">
                                    <p className="mb-2 mx-2 font-medium">Ingresa tu email</p>
                                    <input
                                        type="email"
                                        value={checkEmail}
                                        onChange={(e) => setCheckEmail(e.target.value)}
                                        className="rounded-full py-2 px-4 border-2 border-purple-900 w-full"
                                    />
                                </div>

                                <div className="text-center mt-[3em]">
                                    <button type="submit" className="bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow shadow-purple-200 shadow-lg cursor-pointer">
                                        Recibir código
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
