import React, { useState } from "react";
import AsideBar from "../../AsideBar";
import Pages from "../../ui/Pages";
import Table from "@/components/ui/Table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BtnRegistrar from "@/components/ui/btnRegistar";

export default function Responsible() {
  const [navegar, setNavegar] = useState("");

  const tableData = [
    { name: "Monitor", brand: "LG", details: "..." },
    { name: "Silla plegable", brand: "IKEA", details: "..." },
    { name: "Escritorio", brand: "Yanpol", details: "..." },
    { name: "Monitor", brand: "LG", details: "..." },
    { name: "Silla plegable", brand: "IKEA", details: "..." },
  ];

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="responsible" />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col p-5 md:p-20 w-full max-w-full min-h-screen">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Responsables
              </h1>
              <img
                src="/responsible.png"
                alt="becario"
                className="ml-auto w-[5em]"
              />
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={navegar}
                  onChange={(e) => setNavegar(e.target.value)}
                  className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                  placeholder="Buscar responsables..."
                />
                <div className="w-[1.8em] h-[1.8em] bg-darkpurple-icon rounded-full flex items-center justify-center ml-4">
                  <img src="/find.png" alt="Buscar" className="w-[1.2em]" />
                </div>
                <div className="w-[2em] h-[2em] flex items-center justify-center ml-4">
                  <img src="/filter.png" alt="Filtrar" />
                </div>
              </div>
              <div className="flex justify-end flex-grow">
                <BtnRegistrar />
              </div>
            </div>



            {/* Tabla */}
            <Table data={tableData} />

            {/* Paginación */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>


                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>


                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
