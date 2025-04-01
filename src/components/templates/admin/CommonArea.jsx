import React, { useState, useEffect } from "react";
import AsideBar from "../../AsideBar";
import EditCommonAreaDialog from "@/components/templates/admin/dialog/EditCommonAreaDialog";
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
  getAllCommonAreas,
  getActiveCommonAreas,
  getInactiveCommonAreas,
  createCommonArea,
  changeCommonAreaStatus
} from "../../../services/common_area/commonAreaService";
import { toast, Toaster } from "react-hot-toast";

export default function CommonArea() {
  const [commonAreas, setCommonAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newAreaName, setNewAreaName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);

  // Fetch common areas based on status filter
  useEffect(() => {
    const fetchCommonAreas = async () => {
      try {
        setLoading(true);
        let response;

        if (statusFilter === "active") {
          response = await getActiveCommonAreas();
        } else if (statusFilter === "inactive") {
          response = await getInactiveCommonAreas();
        } else {
          response = await getAllCommonAreas();
        }

        console.log("API Response:", response);

        // Extract data from the result property of the response
        const data = response && response.result
          ? response.result
          : (Array.isArray(response) ? response : []);

        console.log("Processed data:", data);

        setCommonAreas(data);
        setFilteredAreas(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching common areas:", error);
        setError("Error al cargar las áreas comunes");
        toast.error("Error al cargar las áreas comunes");
        // Initialize with empty arrays to prevent errors
        setCommonAreas([]);
        setFilteredAreas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommonAreas();
  }, [statusFilter]);

  // Filter areas based on search query
  useEffect(() => {
    if (!Array.isArray(commonAreas)) {
      console.error("commonAreas is not an array:", commonAreas);
      setFilteredAreas([]);
      return;
    }

    if (searchQuery.trim() === "") {
      setFilteredAreas(commonAreas);
    } else {
      const filtered = commonAreas.filter(area =>
        area && area.name && area.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAreas(filtered);
    }
  }, [searchQuery, commonAreas]);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeCommonAreaStatus(id);

      // Update the local state to reflect the change
      setCommonAreas(prev => {
        if (!Array.isArray(prev)) return [];
        return prev.map(area =>
          area.id === id ? { ...area, status: newStatus } : area
        );
      });

      // If we're filtering by status, we need to refresh the list
      if (statusFilter !== "all") {
        const response = await (statusFilter === "active"
          ? getActiveCommonAreas()
          : getInactiveCommonAreas());

        // Extract data from the result property of the response
        const updatedAreas = response && response.result
          ? response.result
          : (Array.isArray(response) ? response : []);

        setCommonAreas(updatedAreas);
        setFilteredAreas(updatedAreas);
      }

      toast.success(`Estado actualizado correctamente`);
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Error al cambiar el estado");
    }
  };

  // Handle save after edit
  const handleSave = (updatedArea) => {
    setCommonAreas(prev => {
      if (!Array.isArray(prev)) return [updatedArea];
      return prev.map(area =>
        area.id === updatedArea.id ? updatedArea : area
      );
    });
    toast.success("Área común actualizada correctamente");
  };

  // Handle add new area
  const handleAddArea = async () => {
    if (!newAreaName.trim()) {
      toast.error("Por favor ingrese un nombre para el área");
      return;
    }

    try {
      const newArea = await createCommonArea(newAreaName);
      console.log("New area created:", newArea);

      // Extract the new area from the result property if it exists
      const newAreaData = newArea && newArea.result
        ? newArea.result
        : newArea;

      // If we're viewing active areas (default for new areas), add it to the list
      if (statusFilter === "active" || statusFilter === "all") {
        setCommonAreas(prev => {
          if (!Array.isArray(prev)) return [newAreaData];
          return [...prev, newAreaData];
        });

        setFilteredAreas(prev => {
          if (!Array.isArray(prev)) return [newAreaData];
          return [...prev, newAreaData];
        });
      }

      setNewAreaName("");
      toast.success("Área común creada correctamente");

      // Close the popover
      setIsAddPopoverOpen(false);
    } catch (error) {
      console.error("Error creating common area:", error);
      toast.error("Error al crear el área común");
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="commonArea" />
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:p-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Áreas comunes
              </h1>
              <img
                src="/commonArea.png"
                alt="becario"
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
                    placeholder="Buscar área común..."
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
                <Popover open={isAddPopoverOpen} onOpenChange={setIsAddPopoverOpen}>
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
                  <PopoverContent className="w-[20em] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)] transform -translate-x-1/2">
                    <div className="w-[90%] m-auto">
                      <div className="mt-[2em] flex items-center justify-center border-b border-purple-100">
                        <img
                          src="/commonAreaPopover.png"
                          alt="Área común"
                          className="w-[4em] mb-[2em]"
                        />
                      </div>

                      <div className="mt-[1.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="commonArea"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nombre del área
                        </Label>
                        <Input
                          type="text"
                          id="commonArea"
                          value={newAreaName}
                          onChange={(e) => setNewAreaName(e.target.value)}
                          placeholder="Ej: Sala de juntas"
                          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleAddArea}
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-darkpurple-title"></div>
              </div>
            )}

            {error && !loading && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6" role="alert">
                <p>{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && (!filteredAreas || filteredAreas.length === 0) && (
              <div className="text-center mt-10">
                <p className="text-gray-500 text-lg">
                  {searchQuery
                    ? "No se encontraron áreas comunes que coincidan con la búsqueda."
                    : statusFilter === "active"
                      ? "No hay áreas comunes activas."
                      : "No hay áreas comunes inactivas."}
                </p>
              </div>
            )}

            {/* Cards Container */}
            {!loading && !error && filteredAreas && filteredAreas.length > 0 && (
              <div className="bg-slate-200 p-4 rounded-lg mt-[3em] min-h-[calc(90vh-250px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredAreas.map((area, index) => (
                    <div
                      key={area.id || index}
                      className="bg-card-bg rounded-lg shadow-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-300 transform transition-transform duration-300"
                    >
                      <div>
                        <div className=" px-4">
                          <img
                            src={area.img || "/defaultCommonArea.png"}
                            alt={area.name}
                            className="mx-auto mb-4 w-[10em]"
                          />
                          <h3 className="text-[1.8em] font-semibold text-darkpurple-title">
                            {area.name}
                          </h3>
                        </div>

                        <div className="flex justify-between items-center mt-4 bg-indigo-300 p-3 rounded-b-lg border-t-1 border-indigo-400">
                          <EditCommonAreaDialog
                            user={area}
                            onSave={handleSave}
                            onStatusChange={handleStatusChange}
                          />

                          <div className="flex items-center space-x-2">
                            <Label className={`text-sm ${area.status ? '' : 'text-gray-500'}`}>
                              {area.status ? 'Activo' : 'Inactivo'}
                            </Label>
                            <Switch
                              className="cursor-pointer"
                              checked={area.status}
                              onCheckedChange={(checked) => handleStatusChange(area.id, checked)}
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
            background: "rgba(209, 255, 255, 1)" // Azul claro
          },
        }}
      />
    </>
  );
}
