import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRecoveryCode } from "../../../services/users/userService";
import Alert from "../../ui/Alert";

export default function CheckEmail() {
  const [checkEmail, setCheckEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!checkEmail || checkEmail.trim() === "") {
      setError("Por favor ingresa un correo válido");
      setLoading(false);
      return;
    }

    try {
      await sendRecoveryCode(checkEmail);
      localStorage.setItem("recoveryEmail", checkEmail);
      setSuccess("Estamos enviando tu código, revisa tu email...");
      setTimeout(() => navigate("/confirmCode"), 2000);
    } catch (err) {
      setError("Hubo un error al enviar el código. Verifica el correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="flex justify-center gap-6 w-[800px] shadow-2xl p-6 rounded-lg shadow-purple-300 bg-white">
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

            {error && (
              <Alert
                message={error}
                bgColor="bg-red-500"
                textColor="text-white"
                imageSrc="/alertFail.png"
              />
            )}

            {success && (
              <Alert
                message={success}
                bgColor="bg-skyblue-success"
                textColor="text-black"
                showSpinner={true}
              />
            )}

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
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    } bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer`}
                  >
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
