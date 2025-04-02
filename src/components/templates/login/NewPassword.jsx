import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services/users/userService";
import Alert from "../../ui/Alert";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function NewPassword() {
  const [newContra, setNewContra] = useState("");
  const [againContra, setAgainContra] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const email = localStorage.getItem("recoveryEmail");

    if (!email) {
      setError("No se encontró el email para resetear la contraseña.");
      setLoading(false);
      return;
    }

    if (!newContra || !againContra) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    if (newContra !== againContra) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      await resetPassword(email, newContra);
      setSuccess("Contraseña actualizada correctamente.");
      localStorage.removeItem("recoveryEmail");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Error al resetear contraseña:", err);
      setError("Hubo un error al cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="flex m-auto justify-center gap-6 w-[900px] h-[600px] shadow-2xl p-6 rounded-lg shadow-purple-300 bg-white">
        <div className="flex mt-[3em] mb-[3em]">
          <div className="flex m-auto w-1/2 rounded-2xl justify-center items-center">
            <img src="/checkEmail/newPass.png" alt="" className="h-lg object-cover rounded-2xl" />
          </div>

          <div className="w-1/2">
            <section className="text-center">
              <img src="/logomatioo.png" alt="" className="h-1/3 w-[150px] mx-auto" />
              <h1 className="text-2xl font-semibold mt-2">Recuerda tu contraseña...</h1>
            </section>

            {error && (
              <Alert message={error} bgColor="bg-red-500" textColor="text-white" imageSrc="/alertFail.png" />
            )}
            {success && (
              <Alert message={success} bgColor="bg-skyblue-success"
              textColor="text-black" showSpinner={true} />
            )}

            <form onSubmit={handleSubmit}>
              <section>
                {/* Nueva contraseña */}
                <div className="my-3 mt-[3em] relative">
                  <p className="mb-2 mx-2 font-medium">Ingresa tu nueva contraseña</p>
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={newContra}
                    onChange={(e) => setNewContra(e.target.value)}
                    className="rounded-full py-2 px-4 border-2 border-purple-900 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-4 top-10 text-gray-600 hover:text-gray-800"
                  >
                    {showNewPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                {/* Confirmar contraseña */}
                <div className="my-2 mt-[1.5em] relative">
                  <p className="mb-2 mx-2 font-medium">Ingresa nuevamente tu nueva contraseña</p>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    value={againContra}
                    onChange={(e) => setAgainContra(e.target.value)}
                    className="rounded-full px-4 border-2 border-purple-900 w-full py-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-4 top-10 text-gray-600 hover:text-gray-800"
                  >
                    {showConfirmPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </section>

              <div className="text-center mt-[3em]">
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }  border-2 hover:bg-indigo-200 hover:scale-105 border-blue-950 font-semibold py-2 px-4 rounded-full w-auto shadow shadow-purple-200 cursor-pointer`}
                >
                  Cambiar contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
