import React, { useState, useEffect } from "react";
import AsideBar from "../../AsideBar";
import EditModelDialog from "@/components/templates/admin/dialog/EditModelDialog";
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
  getAllModels, 
  getActiveModels, 
  getInactiveModels, 
  createModel,
  changeModelStatus
} from "../../../services/model/modelService";
import { toast, Toaster } from "react-hot-toast";

export default function Model() {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newModelName, setNewModelName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);

  // Fetch models based on status filter
  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        let response;
        switch (statusFilter) {
          case "active":
            response = await getActiveModels();
            break;
          case "inactive":
            response = await getInactiveModels();
            break;
          case "all":
          default:
            response = await getAllModels();
            break;
        }
        
        // Extract the data from the response
        const data = response && response.result ? response.result : response;
        
        if (Array.isArray(data)) {
          setModels(data);
          setFilteredModels(data);
        } else {
          console.error("Expected array but got:", data);
          setModels([]);
          setFilteredModels([]);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching models:", err);
        setError("Error al cargar los modelos. Por favor, intente de nuevo.");
        setModels([]);
        setFilteredModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [statusFilter]);

  // Filter models based on search query
  useEffect(() => {
    if (!Array.isArray(models)) {
      setFilteredModels([]);
      return;
    }
    
    if (!searchQuery.trim()) {
      setFilteredModels(models);
      return;
    }
    
    const filtered = models.filter(model => 
      model.name && model.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredModels(filtered);
  }, [searchQuery, models]);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeModelStatus(id);
      
      // Update the local state
      setModels(prev => {
        if (!Array.isArray(prev)) return [];
        
        return prev.map(model => {
          if (model.id === id) {
            return { ...model, status: newStatus };
          }
          return model;
        });
      });
      
      setFilteredModels(prev => {
        if (!Array.isArray(prev)) return [];
        
        return prev.map(model => {
          if (model.id === id) {
            return { ...model, status: newStatus };
          }
          return model;
        });
      });
      
      toast.success(`Modelo ${newStatus ? 'activado' : 'desactivado'} correctamente`);
    } catch (error) {
      console.error("Error changing model status:", error);
      toast.error("Error al cambiar el estado del modelo");
    }
  };

  // Handle save (after edit)
  const handleSave = (updatedModel) => {
    // Update the local state
    setModels(prev => {
      if (!Array.isArray(prev)) return [];
      
      return prev.map(model => {
        if (model.id === updatedModel.id) {
          return { ...model, name: updatedModel.name };
        }
        return model;
      });
    });
    
    setFilteredModels(prev => {
      if (!Array.isArray(prev)) return [];
      
      return prev.map(model => {
        if (model.id === updatedModel.id) {
          return { ...model, name: updatedModel.name };
        }
        return model;
      });
    });
    
    toast.success("Modelo actualizado correctamente");
  };

  // Handle add new model
  const handleAddModel = async () => {
    if (!newModelName.trim()) {
      toast.error("Por favor ingrese un nombre para el modelo");
      return;
    }

    try {
      const newModel = await createModel(newModelName);
      console.log("New model created:", newModel);
      
      // Extract the new model from the result property if it exists
      const newModelData = newModel && newModel.result 
        ? newModel.result 
        : newModel;
      
      // If we're viewing active models (default for new models), add it to the list
      if (statusFilter === "active" || statusFilter === "all") {
        setModels(prev => {
          if (!Array.isArray(prev)) return [newModelData];
          return [...prev, newModelData];
        });
        
        setFilteredModels(prev => {
          if (!Array.isArray(prev)) return [newModelData];
          return [...prev, newModelData];
        });
      }
      
      setNewModelName("");
      toast.success("Modelo creado correctamente");
      
      // Close the popover
      setIsAddPopoverOpen(false);
    } catch (error) {
      console.error("Error creating model:", error);
      toast.error("Error al crear el modelo");
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="model" />
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:p-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Modelos
              </h1>
              <img
                src="/model.png"
                alt="Modelo"
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
                    placeholder="Buscar modelo..."
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
                  <PopoverContent className="p-4 w-[20em] bg-white border-1 border-black transform -translate-x-1/2">
                    <div className="w-[90%] m-auto">
                      <div className="mt-[2em] flex items-center justify-center border-b border-purple-100">
                        <img
                          src="/asidebarIMG/notaChida.png"
                          alt="Modelo"
                          className="w-[4em] mb-[2em]"
                        />
                      </div>

                      <div className="mt-[0.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="modelName"
                          className="text-darkpurple-title"
                        >
                          Nombre del modelo
                        </Label>
                        <Input
                          type="text"
                          id="modelName"
                          value={newModelName}
                          onChange={(e) => setNewModelName(e.target.value)}
                          className="border-black"
                        />
                      </div>

                      <div className="mt-[1.5em] mb-[2em] flex justify-center">
                        <Button 
                          onClick={handleAddModel} 
                          className="bg-green-confirm"
                        >
                          Agregar Modelo
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
                <p className="text-lg">Cargando modelos...</p>
              </div>
            )}
            
            {error && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-red-500">{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && (!filteredModels || filteredModels.length === 0) && (
              <div className="flex flex-col justify-center items-center mt-10">
                <p className="text-lg">No hay modelos disponibles.</p>
                <p className="text-md text-gray-500">
                  {searchQuery ? "Intente con otra búsqueda." : "Agregue uno nuevo con el botón +"}
                </p>
              </div>
            )}

            {/* Cards Container */}
            {!loading && !error && filteredModels && filteredModels.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[3em]">
                {filteredModels.map((model, index) => (
                  <div
                    key={model.id || index}
                    className="bg-card-bg rounded-lg shadow-md p-4"
                  >
                    <div className="px-3">
                      <h3 className="text-[1.8em] font-semibold text-darkpurple-title">
                        {model.name}
                      </h3>

                      <div className="flex justify-between items-center mt-4">
                        <EditModelDialog
                          model={model}
                          onSave={handleSave}
                        />

                        <div className="flex items-center space-x-2">
                          <Label className={`text-sm ${model.status ? 'text-green-confirm' : 'text-gray-500'}`}>
                            {model.status ? 'Activo' : 'Inactivo'}
                          </Label>
                          <Switch 
                            checked={model.status} 
                            onCheckedChange={(checked) => handleStatusChange(model.id, checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
