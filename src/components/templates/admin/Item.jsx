import React, { useState, useEffect } from "react";
import AsideBar from "@/components/AsideBar";
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
import { itemService } from "@/services/item/itemService";
import BtnRegistrarItem from "@/components/ui/BtnRegistrarItem";

export default function Item() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Función para cargar los bienes
    const fetchItems = async () => {
        try {
            console.log("Iniciando fetchItems()");
            setLoading(true);
            setError(null);

            // Verificar que itemService esté disponible
            console.log("itemService:", itemService);
            console.log("itemService.getAllItems:", itemService.getAllItems);

            const response = await itemService.getAllItems();
            console.log("Respuesta completa de getAllItems:", response);

            // La respuesta ya viene procesada como JSON y los items están en response.result
            if (response && response.type === "SUCCESS" && Array.isArray(response.result)) {
                console.log("Items obtenidos:", response.result);
                setItems(response.result);
                setFilteredItems(response.result);
            } else {
                console.error("Estructura de datos inesperada:", response);
                setError("La estructura de datos recibida no es la esperada");
            }
        } catch (error) {
            console.error("Error al cargar los bienes:", error);
            setError(`Error al cargar los bienes: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Cargar los bienes al montar el componente
    useEffect(() => {
        console.log("Componente Item montado, llamando a fetchItems()");
        fetchItems();
    }, []);

    // Filtrar los bienes cuando cambia el término de búsqueda
    useEffect(() => {
        if (searchTerm.trim() === "") {
            console.log("Término de búsqueda vacío, mostrando todos los items:", items.length);
            setFilteredItems(items);
        } else {
            console.log("Filtrando por término:", searchTerm);
            const filtered = items.filter(
                (item) =>
                    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (item.brand && item.brand.name && item.brand.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (item.serialNumber && item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            console.log("Items filtrados:", filtered.length);
            setFilteredItems(filtered);
        }
        setCurrentPage(1);
    }, [searchTerm, items]);

    // Calcular los índices de los bienes a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    console.log("Items para la página actual:", currentItems.length);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Manejar la creación de un nuevo bien
    const handleAddItem = async (newItem) => {
        try {
            console.log("Creando nuevo item:", newItem);
            const response = await itemService.createItem(newItem);
            console.log("Respuesta de createItem:", response);

            // Verificar si la creación fue exitosa
            if (response && response.type === "SUCCESS") {
                console.log("Item creado exitosamente");
                // Recargar los bienes después de crear uno nuevo
                fetchItems();
            } else {
                console.error("Error al crear el item:", response);
                setError(`Error al crear el bien: ${response.text || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error("Error al crear el item:", error);
            setError(`Error al crear el bien: ${error.message}`);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            <AsideBar activePage="item" />
            <main className="flex-1 flex flex-col">
                <div className="flex flex-col p-5 md:p-20 w-full">
                    {/* Título y barra de búsqueda */}
                    <div className="flex items-center">
                        <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                            Bienes
                        </h1>
                        <img
                            src="/item.png"
                            alt="becario"
                            className="ml-auto w-[5em] h-[5em] object-contain"
                        />
                    </div>


                    <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                                placeholder="Buscar bien..."
                            />

                        </div>
                        <div className="flex justify-end flex-grow">
                            <BtnRegistrarItem onAgregar={handleAddItem} />
                        </div>
                    </div>

                    {/* Estado de carga o error */}
                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-darkpurple-title font-medium">Cargando bienes...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <p className="text-red-500 font-medium">{error}</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-darkpurple-title font-medium">No se encontraron bienes</p>
                        </div>
                    ) : (
                        <>
                            {/* Tabla */}
                            <TableItem data={currentItems} />

                            {/* Paginación */}
                            {totalPages > 1 && (
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                className={currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>

                                        {[...Array(totalPages)].map((_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    onClick={() => setCurrentPage(i + 1)}
                                                    isActive={currentPage === i + 1}
                                                    className="cursor-pointer"
                                                >
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}