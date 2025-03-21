import React, { useState } from "react";
import AsideBar from "../../AsideBar";
import Header from "@/components/ui/Header";
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



export default function Responsible() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandChange = (expanded) => {
    setIsExpanded(expanded);
  };

  const tableData = [
    { name: "Erick", lastname: "Salgado", details: "..." },
    { name: "Ivan", lastname: "Matinez", details: "..." },
    { name: "Santiago", lastname: "Murga", details: "..." },
    { name: "Jony", lastname: "Ocampo", details: "..." },
    { name: "Ximena", lastname: "Guitierrez", details: "..." },
  ];

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="responsible" />
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="flex flex-col p-5 md:p-14 w-full">
            <Header title="Responsables" image="/responsible.png" filterInput="Buscar responsables..." />

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
        </main>
      </div>
    </>
  );
}
