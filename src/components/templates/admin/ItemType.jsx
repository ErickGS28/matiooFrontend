import React from "react";
import AsideBar from "../../AsideBar";
import Header from "@/components/ui/Header";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function ItemType() {

    return (
        <>
            <div className="flex min-h-screen w-full">
                <AsideBar activePage="itemType" />
                <main className="flex-1 flex flex-col">
                    <div className="flex flex-col p-5 md:p-20 w-full">
                        <Header title="Tipo de bien" image="/itemType.png" filterInput="Buscar bien..." />

                        {/* Tabla */}
                        <div className="flex items-center justify-center mt-[3em] bg-gray-500">
                            <h1>Tabla</h1>
                        </div>

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