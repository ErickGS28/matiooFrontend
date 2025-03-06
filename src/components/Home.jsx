import React from "react";
import Img from "./ui/Img";

const Home = ({ user }) => {
  return (
    <div>
      <h1 className="text-bold text-center text-xl text-darkpurple-title">Bienvenido a la página de inicio</h1>

      <Img />
      <h2>Usuario: {user}</h2>
    </div>
  );
};

export default Home;
