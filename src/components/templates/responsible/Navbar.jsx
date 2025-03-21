import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        
        <div className="flex items-center">
          <img
            src="/logomatioo.png" 
            alt="Logo"
            className="h-10" 
          />
        </div>

       
        <div className="flex space-x-6">
          <Link
            to="/profile"
            className=" text-darkpurple-title font-semibold py-1 px-3 rounded-lg hover:underline"
          >
            Perfil
          </Link>
          <Link
            to="/settings"
            className=" text-darkpurple-title font-semibold py-1 px-4 rounded-lg hover:underline"
          >
            Configuración
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
