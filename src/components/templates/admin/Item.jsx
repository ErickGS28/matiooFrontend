import React from "react";
import AsideBar from "../../AsideBar";
import TableItem from "@/components/ui/TableItem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import HeaderItem from "@/components/ui/HeaderItem";


export default function Item() {
    const tableData = [
        { itemType: "Electrónico", name: "Monitor", brand: "LG", model: "L-flat01", code: "1667 1234 5673 4567", location: "Sala", intern: "Erick", responsible: "Santiago" },
        { itemType: "Mueble", name: "Silla eco", brand: "IKEA", model: "L-flat02", code: "2667 1234 5673 4567", location: "Comedor", intern: "Erick", responsible: "Santiago" },
        { itemType: "Mueble", name: "Escritorio", brand: "Mesk-Yanpol", model: "L-flat03", code: "3667 1234 5673 4567", location: "Area 1", intern: "Erick", responsible: "Santiago" },
        { itemType: "Mueble", name: "Mesa", brand: "IKEA", model: "L-flat04", code: "4667 1234 5673 4567", location: "Area 2", intern: "Xime", responsible: "Iván" },
        { itemType: "Mueble", name: "Silla gamer", brand: "Razer", model: "L-flat05", code: "5667 1234 5673 4567", location: "Area 3", intern: "Iván", responsible: "Santiago" },
    ];



    return (
        <>
            <div className="flex min-h-screen w-full">
                <AsideBar activePage="item" />
                <main className="flex-1 flex flex-col">
                    <div className="flex flex-col p-5 md:p-20 w-full">
                        <HeaderItem title="Bienes" image="/item.png" filterInput="Buscar bien..." />


                        {/* Tabla */}
                        <TableItem data={tableData} />

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