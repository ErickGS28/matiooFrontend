import React from "react";
import { Link } from "react-router-dom";
import { ProfileDialog } from "./ProfileDialog";
import { AssignItemDialog } from "./AssignItemDialog";

const Navbar = () => {
  const user = {
    name: "Santiago",
    password: "123456",
  };


  return (
    <nav className="bg-white p-4 shadow-lg shadow-purple-200">
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
            to="/itemIntern"
            className=" text-darkpurple-title font-semibold py-1 px-4 rounded-lg hover:underline"
          >
            Ver bienes
          </Link>

          <AssignItemDialog />

          <ProfileDialog user={user} />
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
