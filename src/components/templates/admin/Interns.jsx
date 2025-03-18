import React from "react";
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


export default function Interns() {

    const tableData = [
        { name: "Santi", lastname: "Salgado", details: "..." },
        { name: "Xime", lastname: "Matinez", details: "..." },
        { name: "Eri", lastname: "Murga", details: "..." },
        { name: "Sagan", lastname: "Ocampo", details: "..." },
        { name: "Iván", lastname: "Guitierrez", details: "..." },
      ];


    return (
        <>
            <div className="flex min-h-screen w-full">
                <AsideBar activePage="interns" />
                <main className="flex-1 flex flex-col">
                    <div className="flex flex-col p-5 md:p-20 w-full">
                        <Header title="Becarios" image="/becarios.png" filterInput="Buscar becarios..." />

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
