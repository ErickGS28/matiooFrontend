import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import Btn from "../ui/Btn"; // Si necesitas un botón personalizado, mantén este import

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
    } else if (nombre === "admin" && contra === "admin") {
      setError(false); // Si no hay errores, limpia el error
      setUser([nombre]); // Asignar el usuario (aunque no se especifica qué hace esta función)
      navigate("/home"); // Redirigir a la página 'home'
    } else {
    }
    setError(false); // Si no hay errores, limpia el error
    setUser([nombre]); // Asignar el usuario (aunque no se especifica qué hace esta función)
    navigate("/home"); // Redirigir a la página 'home'
  };

  return (
    <>


    
      <div className="flex justify-center m-auto gap-6 w-[800px] shadow-2xl mt-12 p-6 rounded-lg ">

        <div className="w-1/2 m-auto rounded-2xl">
          <img src="/login.png" alt="" className="h-lg  object-cover m-auto rounded-2xl " />
        </div>

        <div className="w-1/2 mx-auto">
          <section className="m-auto">
            <img
              src="/logomatioo.png"
              alt=""
              className="h-1/3 w-[150px] m-auto"
            />
            <h1 className="text-center text-2xl font-semibold mt-2">
              Te damos la bienvenida...
            </h1>
          </section>

          <section>
            <div className="my-3 mt-16">
            <p className="mb-2 mx-2">Ingresa tu usuario </p>
            <input
              type="text"
              className="rounded-full py-2 px-4 border-1 w-full"
            />
            </div>

            <div className="my-2">
            <p className="mb-2 mx-2">Ingresa tu contraseña</p>
            <input
              type="password"
              className="rounded-full  px-4 border-1 w-full py-2"
            />
            </div>
            


          </section>

          <div className="text-right ">
          <button type="submit" className="bg-green-confirm text-white py-2 px-4 rounded-full  mt-12 w-[160px] shadow-lg">
              Continuar
          </button>
          </div>

          
        </div>
      </div>

    </>
  );
};

// <section>
//   <h1 className="text-center text-3xl mb-3 font-bold">Inicia sesión</h1>
//   <form className="formulario" onSubmit={handleSubmit}>
//     <input
//       type="text"
//       placeholder="Ingresa tu usuario"
//       value={nombre}
//       onChange={(e) => setNombre(e.target.value)}
//       className="border-2 border-purple-600 p-2 rounded-lg w-xs"
//     />
//     <br />
//     <br />
//     <input
//       type="password"
//       placeholder="Ingresa tu contraseña"
//       required
//       value={contra}
//       onChange={(e) => setContra(e.target.value)}
//       className="border-2 border-purple-600 p-2 rounded-lg w-xs"
//     />
//     <br />
//     <br />
//     <div className="flex justify-center">
//       {/* Aquí puedes dejar el Btn o usar un botón estándar */}
//       <button
//         type="submit"  // Aseguramos que este sea un submit que ejecute handleSubmit
//         className="py-2 px-4 bg-violet-500 rounded-full text-amber-50"
//       >
//         Entrar
//       </button>
//     </div>
//   </form>
//   {error && (
//     <div className="flex justify-center mt-4">
//       <p className="text-red-500">Todos los campos son obligatorios</p>
//     </div>
//   )}
// </section>
