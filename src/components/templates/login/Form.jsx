import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../ui/Alert";
import { API_URL } from "../../../constants";
import Aurora from '../../../../Reactbits/Aurora/Aurora';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export const Form = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Por favor, completa todos los campos");
      setSuccess(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ email, password })
      });


      if (!response.ok) {
        const errorData = await response.text();
        console.error('Login error response:', errorData);
        setError(true);
        setErrorMessage(errorData || "Error en el inicio de sesión");
        setSuccess(false);
        return;
      }

      const token = await response.text();
      if (!token) {
        setError(true);
        setErrorMessage("Token no recibido del servidor");
        setSuccess(false);
        return;
      }

      const formattedToken = token.trim();
      const tokenWithBearer = formattedToken.startsWith('Bearer ') ? formattedToken : `Bearer ${formattedToken}`;
      
      localStorage.setItem('token', tokenWithBearer);
      
      const tokenPayload = decodeToken(tokenWithBearer);
      if (tokenPayload) {
        
        setUser([tokenPayload.email, tokenPayload.role]);
        setError(false);
        setSuccess(true);
        
        setTimeout(() => {
          switch(tokenPayload.role) {
            case "ADMIN":
              navigate("/home");
              break;
            case "RESPONSIBLE":
              navigate("/responsibleHome");
              break;
            case "INTERN":
              navigate("/internHome");
              break;
            default:
              navigate("/home");
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error details:', error);
      setError(true);
      setErrorMessage(error.message || "Error de conexión con el servidor");
      setSuccess(false);
    }
  };

  const decodeToken = (token) => {
    try {
      const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
      const base64Url = tokenWithoutBearer.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleCheckEmailClick = () => {
    navigate("/checkEmail");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-purple-50">
        <div className="flex justify-center gap-6 w-[800px] shadow-2xl p-6 rounded-lg shadow-purple-300 bg-white hover:scale-105 transition-all duration-700 ease-in-out">
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
                Te damos la bienvenida ...
              </h1>
            </section>

            {error && (
              <Alert
                message={errorMessage || "Error al iniciar sesión."}
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
                  <p className="mb-2 mx-2 font-medium">Correo electrónico</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full py-2 px-4 border-2 border-purple-900 w-full"
                    placeholder="user@gmail.com"
                  />
                </div>

                <div className="my-2 relative">
                  <p className="mb-2 mx-2 font-medium">Contraseña</p>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full px-4 border-2 border-purple-900 w-full py-2"
                    placeholder="User1234."
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 mt-9 mr-3 text-gray-600 hover:text-gray-800 py-1.5"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
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
                  className="bg-green-confirm text-white font-semibold py-2 px-4 rounded-full w-[160px] shadow shadow-purple-200 hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
