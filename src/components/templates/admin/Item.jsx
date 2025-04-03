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
import SelectStatus from "@/components/ui/SelectStatus"; // Importar SelectStatus

export default function Item() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // Estado para el filtro de estado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Función para cargar los bienes
  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await itemService.getAllItems();

      // La respuesta ya viene procesada como JSON y los items están en response.result
      if (
        response &&
        response.type === "SUCCESS" &&
        Array.isArray(response.result)
      ) {
        setItems(response.result);
        setFilteredItems(response.result);
      } else {
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
    fetchItems();
  }, []);

  // Filtrar los bienes cuando cambia el término de búsqueda o el filtro de estado
  useEffect(() => {
    let filtered = [...items];
    if (statusFilter === "active") {
      filtered = filtered.filter((item) => item.status === true);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((item) => item.status === false);
    }
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.brand &&
            item.brand.name &&
            item.brand.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.code &&
            item.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.serialNumber &&
            item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchTerm, items, statusFilter]);

  // Calcular los índices de los bienes a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Manejar la creación de un nuevo bien
  const handleAddItem = async (newItem) => {
    try {
      const response = await itemService.createItem(newItem);

      // Verificar si la creación fue exitosa
      if (response && response.type === "SUCCESS") {
        // Recargar los bienes después de crear uno nuevo
        fetchItems();
      } else {
        setError(
          `Error al crear el bien: ${response.text || "Error desconocido"}`
        );
      }
    } catch (error) {
      setError(`Error al crear el bien: ${error.message}`);
    }
  };

  // Manejar la actualización de un bien
  const handleUpdateItem = async (updatedItem) => {
    try {
      // Actualizar los arrays de items manteniendo la paginación actual
      const updateItemInArray = (array) => {
        return array.map((item) => {
          if (item.id === updatedItem.id) {
            return { ...item, ...updatedItem };
          }
          return item;
        });
      };

      // Actualizar ambos arrays: items y filteredItems
      setItems((prev) => updateItemInArray(prev));
      setFilteredItems((prev) => updateItemInArray(prev));

      // No cambiamos la página actual para mantener la posición en la paginación
    } catch (error) {
      setError(`Error al actualizar el bien: ${error.message}`);
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

          <div className="my-3 mt-5 w-full flex items-center flex-wrap ">
            <div className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                placeholder="Buscar bien..."
              />
            </div>
            <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
              <SelectStatus value={statusFilter} onChange={setStatusFilter} />
            </div>
            <div className="flex justify-end flex-grow">
              <BtnRegistrarItem onAgregar={handleAddItem} />
            </div>
          </div>

          {/* Estado de carga o error */}
          {loading ? (
            <div className="text-center py-10">
              <p className="text-darkpurple-title font-medium">
                Cargando bienes...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center mt-20">
              <p className="text-lg">No hay bienes disponibles.</p>
              <p className="text-md text-gray-500">
                "Agregue uno nuevo con el botón +"
              </p>
            </div>
          ) : (
            <>
              {/* Tabla */}
              <TableItem data={currentItems} onUpdateItem={handleUpdateItem} />

              {/* Paginación */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        className={
                          currentPage === 1
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }
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
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        className={
                          currentPage === totalPages
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }
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
