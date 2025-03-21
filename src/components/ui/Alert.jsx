import React from "react";

export default function Alert({ message, bgColor, textColor, imageSrc, showSpinner = false }) {
  return (
    <div className={`flex ${bgColor} p-2 text-center font-semibold ${textColor} items-center justify-center mt-[1em] shadow shadow-purple-200 rounded-lg`}>
   <h1 className="mx-[1em] flex items-center gap-2">
  {message}
  {showSpinner && (
    <span className="w-5 h-5 border-4 border-blue-950 border-t-transparent border-solid rounded-full animate-spin"></span>
  )}
</h1>

      {!showSpinner && imageSrc && <img src={imageSrc} alt="" className="w-[1.5em] h-[1.5em]" />}
    </div>
  );
}
