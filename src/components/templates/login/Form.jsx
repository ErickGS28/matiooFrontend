import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../ui/Alert";

export const Form = ({ setUser }) => {
  const [nombre, setNombre] = useState("");
  const [contra, setContra] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre === "" || contra === "") {
      setError(true);
      setSuccess(false);
      return;
    } else if (nombre === "admin" && contra === "admin") {
      setError(false);
      setSuccess(true);
      setUser([nombre]);
      // Muestra el mensaje de éxito por un breve tiempo antes de redirigir
      setTimeout(() => {
        navigate("/home");
      }, 2000); // 2 segundos de demora
    } else {
      setError(true);
      setSuccess(false);
    }
  };

  const handleCheckEmailClick = () => {
    navigate("/checkEmail");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="flex justify-center gap-6 w-[800px] shadow-2xl p-6 rounded-lg  shadow-purple-300  bg-white">
        <div className="w-1/2 rounded-2xl">
          <img
            src="/login.png"
            alt=""
            className="h-lg object-cover rounded-2xl"
          />
        </div>

        <div className="w-1/2">
          <section className="text-center">
            <img
              src="/logomatioo.png"
              alt=""
              className="h-1/3 w-[150px] mx-auto"
            />
            <h1 className="text-2xl font-semibold mt-2">
              Te damos la bienvenida...
            </h1>
          </section>

          {error && (
            <Alert
              message="Error al iniciar sesión."
              bgColor="bg-red-fail"
              textColor="text-white"
              imageSrc="/alertFail.png"
            />
          )}

          {success && (
            <Alert
              message="Iniciando sesión..."
              bgColor="bg-skyblue-success"
              textColor="text-black"
              showSpinner={true}
            />
          )}

          <form onSubmit={handleSubmit}>
            <section className="mt-8">
              <div className="my-3 mt-2">
                <p className="mb-2 mx-2 font-medium">Ingresa tu usuario</p>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="rounded-full py-2 px-4 border-2 border-purple-900 w-full"
                />
              </div>

              <div className="my-2">
                <p className="mb-2 mx-2 font-medium">Ingresa tu contraseña</p>
                <input
                  type="password"
                  value={contra}
                  onChange={(e) => setContra(e.target.value)}
                  className="rounded-full px-4 border-2 border-purple-900 w-full py-2"
                />
              </div>
            </section>

            <div className="flex mt-[2em] justify-start">
              <img
                src="/forgetPassword.png"
                alt=""
                className="w-[2em] mx-[1em]"
              />
              <span
                onClick={handleCheckEmailClick}
                className="underline font-semibold text-mdpurple-htext cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </span>
            </div>

            <div className="text-end mt-6">
              <button
                type="submit"
                className="bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow shadow-purple-200 shadow-lg cursor-pointer"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
