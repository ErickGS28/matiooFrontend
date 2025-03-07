import React from "react";

export default function Alert({ message, bgColor, textColor, imageSrc }) {
  return (
    <div className={`flex ${bgColor} p-1 text-center font-semibold ${textColor} items-center justify-center mt-[1em] shadow shadow-purple-200 shadow-md`}>
      <h1 className="mx-[1em]">{message}</h1>
      <img src={imageSrc} alt="" className="w-[1em] h-[1em]" />
    </div>
  );
}
