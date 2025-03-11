import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmCode() {
    const [checkEmail, setCheckEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
            navigate("/newPassword");
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-50">
            <div className="flex justify-center gap-6 w-[900px] h-[500px] shadow-2xl p-6 rounded-lg shadow shadow-purple-300 shadow-lg bg-white">
                <div className="flex mt-[4em] mb-[4em]">
                

                    <div className="">
                        <section className="text-center">
                            <img src="/logomatioo.png" alt="Logo" className="h-1/3 w-[150px] mx-auto" />
                            <h1 className="text-2xl font-semibold mt-2">
                                Ingresa tu código de confirmación
                            </h1>
                        </section>

                        <section className="mt-[4em]">
                            <form onSubmit={handleSubmit}>
                                <div className="my-3 mt-5 border-1">
                                    <p className="mb-2 mx-2 font-medium"> code </p>
                    
                                </div>

                                <div className="text-end mt-[3em]">
                                    <button type="submit" className="bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[180px] shadow shadow-purple-200 shadow-lg cursor-pointer">
                                        Confirmar código
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
