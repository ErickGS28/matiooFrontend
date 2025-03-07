import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../ui/Alert";

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

  return (
    <div className="flex justify-center m-auto gap-6 w-[800px] shadow-2xl mt-12 p-6 rounded-lg shadow shadow-purple-300 shadow-lg">
      <div className="w-1/2 m-auto rounded-2xl">
        <img src="/login.png" alt="" className="h-lg object-cover m-auto rounded-2xl" />
      </div>

      <div className="w-1/2 mx-auto">
        <section className="m-auto">
          <img src="/logomatioo.png" alt="" className="h-1/3 w-[150px] m-auto" />
          <h1 className="text-center text-2xl font-semibold mt-2">
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
            message="Iniciando sesión correctamente."
            bgColor="bg-skyblue-success"
            textColor="text-black"
            imageSrc="/alertSuccess.png"
          />
        )}

        <form onSubmit={handleSubmit}>
          <section>
            <div className="my-3 mt-5">
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

          <div className="flex mt-[3em]">
            <img src="/forgetPassword.png" alt="" className="w-[2em] mx-[1em]"/>
            <a href="https://tailwindcss.com/docs/text-decoration-line" className="text-decoration-line: underline font-semibold text-mdpurple-htext">¿Olvidaste tu contraseña?</a>
          </div>

          <div className="text-right">
            <button type="submit" className="bg-green-confirm text-white font-semibold py-2 px-4 rounded-full mt-12 w-[160px] shadow shadow-purple-200 shadow-lg">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
