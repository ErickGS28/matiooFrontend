import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import Btn from "./ui/Btn"; // Si necesitas un botón personalizado, mantén este import

export const Form = ({ setUser }) => {
  const [nombre, setNombre] = useState(""); // Estado para el nombre
  const [contra, setContra] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(false);
  
  const navigate = useNavigate(); // Hook para redirección

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el refresco de la página
    if (nombre === "" || contra === "") {
      setError(true); // Si los campos están vacíos, mostrar error
      return;
    }else if (nombre === "admin" && contra === "admin") {
      setError(false); // Si no hay errores, limpia el error
      setUser([nombre]); // Asignar el usuario (aunque no se especifica qué hace esta función)
      navigate("/home"); // Redirigir a la página 'home'
    }else{

    }
    setError(false); // Si no hay errores, limpia el error
    setUser([nombre]); // Asignar el usuario (aunque no se especifica qué hace esta función)
    navigate("/home"); // Redirigir a la página 'home'
  };

  return (
    <section>
      <h1 className="text-center text-3xl mb-3 font-bold">Inicia sesión</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa tu usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border-2 border-purple-600 p-2 rounded-lg w-xs"
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          required
          value={contra}
          onChange={(e) => setContra(e.target.value)}
          className="border-2 border-purple-600 p-2 rounded-lg w-xs"
        />
        <br />
        <br />
        <div className="flex justify-center">
          {/* Aquí puedes dejar el Btn o usar un botón estándar */}
          <button
            type="submit"  // Aseguramos que este sea un submit que ejecute handleSubmit
            className="py-2 px-4 bg-violet-500 rounded-full text-amber-50"
          >
            Entrar
          </button>
        </div>
      </form>
      {error && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500">Todos los campos son obligatorios</p>
        </div>
      )}
    </section>
  );
};
