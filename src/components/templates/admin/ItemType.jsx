import React, { useState, useEffect } from "react";
import AsideBar from "../../AsideBar";
import EditItemTypeDialog from "@/components/templates/admin/dialog/EditItemTypeDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import SelectStatus from "../../../components/ui/SelectStatus";
import {
  getAllItemTypes,
  getActiveItemTypes,
  getInactiveItemTypes,
  createItemType,
  changeItemTypeStatus,
} from "../../../services/item_type/itemTypeService";
import { toast, Toaster } from "react-hot-toast";

export default function ItemType() {
  const [itemTypes, setItemTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newTypeName, setNewTypeName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);

  // Fetch item types based on status filter
  useEffect(() => {
    const fetchItemTypes = async () => {
      setLoading(true);
      try {
        let response;
        switch (statusFilter) {
          case "active":
            response = await getActiveItemTypes();
            break;
          case "inactive":
            response = await getInactiveItemTypes();
            break;
          case "all":
          default:
            response = await getAllItemTypes();
            break;
        }

        // Extract the data from the response
        const data = response && response.result ? response.result : response;

        if (Array.isArray(data)) {
          setItemTypes(data);
          setFilteredTypes(data);
        } else {
          console.error("Expected array but got:", data);
          setItemTypes([]);
          setFilteredTypes([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching item types:", err);
        setError(
          "Error al cargar los tipos de bien. Por favor, intente de nuevo."
        );
        setItemTypes([]);
        setFilteredTypes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItemTypes();
  }, [statusFilter]);

  // Filter item types based on search query
  useEffect(() => {
    if (!Array.isArray(itemTypes)) {
      setFilteredTypes([]);
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredTypes(itemTypes);
      return;
    }

    const filtered = itemTypes.filter(
      (type) =>
        type.name && type.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredTypes(filtered);
  }, [searchQuery, itemTypes]);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeItemTypeStatus(id);

      // Update the local state
      setItemTypes((prev) => {
        if (!Array.isArray(prev)) return [];

        return prev.map((type) => {
          if (type.id === id) {
            return { ...type, status: newStatus };
          }
          return type;
        });
      });

      setFilteredTypes((prev) => {
        if (!Array.isArray(prev)) return [];

        return prev.map((type) => {
          if (type.id === id) {
            return { ...type, status: newStatus };
          }
          return type;
        });
      });

      toast.success(
        `Tipo de bien ${newStatus ? "activado" : "desactivado"} correctamente`
      );
    } catch (error) {
      console.error("Error changing item type status:", error);
      toast.error("Error al cambiar el estado del tipo de bien");
    }
  };

  // Handle save (after edit)
  const handleSave = (updatedType) => {
    // Update the local state
    setItemTypes((prev) => {
      if (!Array.isArray(prev)) return [];

      return prev.map((type) => {
        if (type.id === updatedType.id) {
          return { ...type, name: updatedType.name };
        }
        return type;
      });
    });

    setFilteredTypes((prev) => {
      if (!Array.isArray(prev)) return [];

      return prev.map((type) => {
        if (type.id === updatedType.id) {
          return { ...type, name: updatedType.name };
        }
        return type;
      });
    });

    toast.success("Tipo de bien actualizado correctamente");
  };

  // Handle add new item type
  const handleAddType = async () => {
    if (!newTypeName.trim()) {
      toast.error("Por favor ingrese un nombre para el tipo de bien");
      return;
    }

    try {
      const newType = await createItemType(newTypeName);
      console.log("New item type created:", newType);

      // Extract the new type from the result property if it exists
      const newTypeData = newType && newType.result ? newType.result : newType;

      // If we're viewing active types (default for new types), add it to the list
      if (statusFilter === "active" || statusFilter === "all") {
        setItemTypes((prev) => {
          if (!Array.isArray(prev)) return [newTypeData];
          return [...prev, newTypeData];
        });

        setFilteredTypes((prev) => {
          if (!Array.isArray(prev)) return [newTypeData];
          return [...prev, newTypeData];
        });
      }

      setNewTypeName("");
      toast.success("Tipo de bien creado correctamente");

      // Close the popover
      setIsAddPopoverOpen(false);
    } catch (error) {
      console.error("Error creating item type:", error);
      toast.error("Error al crear el tipo de bien");
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="itemType" />
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:p-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Tipos de bien
              </h1>
              <img
                src="/itemType.png"
                alt="Tipo de bien"
                className="ml-auto w-[5em] h-[5em] object-contain"
              />
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="my-3 mt-5 w-full flex flex-col md:flex-row items-center flex-wrap gap-4">
              <div className="flex flex-col sm:flex-row items-center w-full md:w-auto">
                <div className="relative w-full sm:w-[25em] mb-3 sm:mb-0">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                    placeholder="Buscar tipo de bien..."
                  />
                </div>

                {/* Status Filter Component */}
                <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                  <SelectStatus
                    value={statusFilter}
                    onChange={setStatusFilter}
                  />
                </div>
              </div>
              <div className="flex justify-center sm:justify-end flex-grow w-full md:w-auto">
                <Popover
                  open={isAddPopoverOpen}
                  onOpenChange={setIsAddPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <div>
                      <button
                        type="submit"
                        className="flex items-center justify-center bg-green-confirm text-white font-semibold py-1 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer"
                      >
                        <p className="text-[1.5em] mr-2">+</p>
                        Agregar
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className=" w-[20em] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)] transform -translate-x-1/2">
                    <div className="w-[90%] m-auto">
                      <div className="mt-[2em] flex items-center justify-center border-b border-purple-100">
                        <img
                          src="/asidebarIMG/item2.png"
                          alt="Tipo de bien"
                          className="w-[4em] mb-[2em]"
                        />
                      </div>

                      <div className="mt-[1.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="itemTypeName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nombre del tipo de bien
                        </Label>
                        <Input
                          type="text"
                          id="itemTypeName"
                          value={newTypeName}
                          onChange={(e) => setNewTypeName(e.target.value)}
                          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          maxLength={20}
                        />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleAddType}
                          className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
                        >
                          Guardar
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg">Cargando tipos de bien...</p>
              </div>
            )}

            {error && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-red-500">{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading &&
              !error &&
              (!filteredTypes || filteredTypes.length === 0) && (
                <div className="flex flex-col justify-center items-center mt-10">
                  <p className="text-lg">No hay tipos de bien disponibles.</p>
                  <p className="text-md text-gray-500">
                    {searchQuery
                      ? "Intente con otra búsqueda."
                      : "Agregue uno nuevo con el botón +"}
                  </p>
                </div>
              )}

            {/* Cards Container */}
            {!loading &&
              !error &&
              filteredTypes &&
              filteredTypes.length > 0 && (
                <div className="bg-slate-200 p-4 rounded-lg mt-[3em] min-h-[calc(100vh-250px)]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredTypes.map((type, index) => (
                      <div
                        key={type.id || index}
                        className="bg-card-bg rounded-lg shadow-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-300 transform transition-transform duration-300"
                      >
                        <div>
                          <div className="px-4">
                            <img
                              src={type.img || "/defaultItemType.png"}
                              alt={type.name}
                              className="mx-auto mb-4 w-[10em]"
                            />
                            <h3 className="text-[1.8em] font-semibold text-darkpurple-title truncate">
                              {type.name}
                            </h3>
                          </div>

                          <div className="flex justify-between items-center mt-4 bg-indigo-300 p-3 rounded-b-lg border-t-1 border-indigo-400">
                            <EditItemTypeDialog
                              itemType={type}
                              onSave={handleSave}
                            />

                            <div className="flex items-center space-x-2">
                              <Label
                                className={`text-sm ${
                                  type.status ? "" : "text-gray-500"
                                }`}
                              >
                                {type.status ? "Activo" : "Inactivo"}
                              </Label>
                              <Switch
                                className="cursor-pointer"
                                checked={type.status}
                                onCheckedChange={(checked) =>
                                  handleStatusChange(type.id, checked)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(209, 255, 255, 1)", // Azul claro
          },
        }}
      />
    </>
  );
}
