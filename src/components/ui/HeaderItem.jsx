import React, { useState } from "react";
import BtnRegistrar from "@/components/ui/btnRegistar";
import BtnRegistrarItem from "./BtnRegistrarItem";

export default function HeaderItem({ title, image, filterInput, onAgregar }) {
  const [navegar, setNavegar] = useState("");

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
          {title}
        </h1>
        <img
          src={image}
          alt="becario"
          className="ml-auto w-[5em] h-[5em] object-contain"
        />
      </div>

      <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
        <div className="flex items-center">
          <input
            type="text"
            value={navegar}
            onChange={(e) => setNavegar(e.target.value)}
            className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
            placeholder={filterInput}
          />
         
        
        </div>
      <div className="flex justify-end flex-grow">
                <BtnRegistrarItem onAgregar={onAgregar} />
              </div>
      </div>
    </>
  );
}
