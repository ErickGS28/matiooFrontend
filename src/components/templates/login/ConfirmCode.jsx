import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyRecoveryCode } from "../../../services/users/userService";
import Alert from "../../ui/Alert";

export default function ConfirmCode() {
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("recoveryEmail");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const fullCode = digits.join("");
    if (fullCode.length !== 6) {
      setError("El código debe tener 6 dígitos.");
      setLoading(false);
      return;
    }

    try {
      await verifyRecoveryCode(email, fullCode);
      setSuccess("✅ Código verificado correctamente.");
      setTimeout(() => navigate("/newPassword"), 2000);
    } catch (err) {
      setError("❌ Código inválido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="flex justify-center gap-6 w-3xl h-[500px] shadow-2xl p-6 rounded-2xl shadow-purple-300 bg-white">
        <div className="flex mt-[4em] mb-[4em]">
          <div>
            <section className="text-center">
              <img src="/logomatioo.png" alt="Logo" className="h-1/3 w-[150px] mx-auto" />
              <h1 className="text-2xl font-semibold mt-2">Ingresa tu código de confirmación</h1>
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

            <section className="mt-[2em]">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center gap-4 mb-6">
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="w-16 h-16 text-2xl text-center border-2 border-purple-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-slate-100 transition duration-200"
                    />
                  ))}
                </div>

                <div className="text-center mt-[3em]">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }   border-2 hover:bg-indigo-200 hover:scale-105 border-blue-950 font-semibold py-2 px-4 rounded-full w-[180px] shadow shadow-purple-200 cursor-pointer`}
                  >
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
