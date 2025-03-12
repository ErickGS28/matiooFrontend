import React from "react";
import { Button } from "@/components/ui/button";


export default function Table({ data }) {
  return (
    <div className="mt-5 w-full overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg border-separate border-spacing-y-4 min-w-[600px] text-center">
        <thead className="bg-darkpurple-bg-thead text-white">
          <tr>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Marca</th>
            <th className="py-2 px-4">Detalles</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-skyblue-row" : "bg-lightpurple-row"}>
              <td className="py-2 px-4 rounded-l-2xl font-semibold">{item.name}</td>
              <td className="py-2 px-4 font-semibold" >{item.brand}</td>
              <td className="py-2 px-4 font-semibold">{item.details}</td>
              <td className="py-2 px-4 rounded-r-2xl">
                <Button className='bg-purple-row-btn '>Desasignar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
