import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileDialog } from "./ProfileDialog";
import { AssignItemDialog } from "./AssignItemDialog";
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Al hacer clic en el botón, cambiamos el estado para que no se vuelva a mostrar
    setButtonClicked(true);
  };

  const handleNavigation = (page) => {
    navigate(page);
  };

  return (
    <nav className="bg-white p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">

        <div className="flex items-center cursor-pointer" onClick={() => handleNavigation("/home")}>
          <img
            src="/logomatioo.png"
            alt="Logo"
            className="h-10"
          />
          
        </div>

        <div className="flex space-x-6">
          {/* Solo muestra el botón si no ha sido clickeado */}
          {!buttonClicked && (
            <Link to="/itemIntern" onClick={handleButtonClick}>
              <Button className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-bl-[1.4em] rounded-br-[1.4em] rounded-tl-[0.5em] rounded-tr-[0.5em] hover:scale-105  px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                Ver bienes
              </Button>
            </Link>
          )}

          <AssignItemDialog />
          <ProfileDialog user={{ name: "Santiago", password: "123456" }} />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
