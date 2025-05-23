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
import { API_URL } from "../../../constants";
import {
  getAllModels,
  getActiveModels,
  getInactiveModels,
  createModel,
  createModelWithImage,
  changeModelStatus,
  getModelImageUrl,
  fetchModelImage
} from "../../../services/model/modelService";
import { toast, Toaster } from "react-hot-toast";

const Model = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newModelName, setNewModelName] = useState("");
  const [newModelImage, setNewModelImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  const [modelImages, setModelImages] = useState({});

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
          
          // Fetch images for all models
          const imagePromises = data.map(async (model) => {
            if (model.id) {
              try {
                // Solo intentamos cargar la imagen si el modelo tiene la propiedad photo
                if (model.photo) {
                  const imageUrl = await fetchModelImage(model.id);
                  return { id: model.id, imageUrl };
                } else {
                  return { id: model.id, imageUrl: "/defaultModel.png" };
                }
              } catch (error) {
                console.error(`Error fetching image for model ${model.id}:`, error);
                return { id: model.id, imageUrl: "/defaultModel.png" };
              }
            }
            return { id: model.id, imageUrl: "/defaultModel.png" };
          });
          
          const images = await Promise.all(imagePromises);
          const imagesMap = {};
          images.forEach(item => {
            imagesMap[item.id] = item.imageUrl;
          });
          
          setModelImages(imagesMap);
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
  const handleSave = async (updatedModel) => {
    // Update the local state
    setModels(prev => {
      if (!Array.isArray(prev)) return [];

      return prev.map(model => {
        if (model.id === updatedModel.id) {
          return { ...updatedModel };
        }
        return model;
      });
    });

    setFilteredModels(prev => {
      if (!Array.isArray(prev)) return [];

      return prev.map(model => {
        if (model.id === updatedModel.id) {
          return { ...updatedModel };
        }
        return model;
      });
    });
    
    // Update the image for the edited model
    try {
      const imageUrl = await fetchModelImage(updatedModel.id);
      setModelImages(prev => ({
        ...prev,
        [updatedModel.id]: imageUrl
      }));
    } catch (error) {
      console.error(`Error fetching updated image for model ${updatedModel.id}:`, error);
    }

    toast.success("Modelo actualizado correctamente");
  };

  // Handle file change for new model image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño de archivo (1MB = 1048576 bytes)
      const maxSize = 1048576; // 1MB
      if (file.size > maxSize) {
        toast.error("La imagen es demasiado grande. El tamaño máximo permitido es 1MB.");
        e.target.value = ''; // Limpiar el input
        setNewModelImage(null);
        setImagePreview(null);
        return;
      }

      setNewModelImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add new model
  const handleAddModel = async () => {
    if (!newModelName.trim()) {
      toast.error("Por favor ingrese un nombre para el modelo");
      return;
    }

    try {
      let newModel;
      
      if (newModelImage) {
        // Create model with image
        newModel = await createModelWithImage({ name: newModelName }, newModelImage);
      } else {
        // Create model without image
        newModel = await createModel(newModelName);
      }
      
      // Extract the new model from the result property if it exists
      const newModelData = newModel && newModel.result ? newModel.result : newModel;

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
        
        // Fetch the image for the new model
        if (newModelData.id) {
          try {
            const imageUrl = await fetchModelImage(newModelData.id);
            setModelImages(prev => ({
              ...prev,
              [newModelData.id]: imageUrl
            }));
          } catch (error) {
            console.error(`Error fetching image for new model ${newModelData.id}:`, error);
          }
        }
      }

      // Reset form
      setNewModelName("");
      setNewModelImage(null);
      setImagePreview(null);
      
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
                    className="w-full rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-50 font-medium"
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
                  <PopoverContent className="w-[22em] p-6 bg-white rounded-2xl shadow-lg transform -translate-x-1/2">
                  <div className="max-h-[24em] overflow-y-auto pr-2">
                  <div className="mt-[2em] flex items-center justify-center border-b border-purple-100">
                        <img
                          src="/asidebarIMG/notaChida.png"
                          alt="Modelo"
                          className="w-[4em] mb-[2em]"
                        />
                      </div>

                      <div className="mt-[1.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="modelName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nombre del modelo
                        </Label>
                        <Input
                          type="text"
                          id="modelName"
                          value={newModelName}
                          onChange={(e) => setNewModelName(e.target.value)}
                          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          maxLength={20}
                        />
                      </div>

                      <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="modelImage"
                          className="text-sm font-medium text-gray-700"
                        >
                          Imagen (opcional)
                        </Label>
                        <Input
                          type="file"
                          id="modelImage"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="cursor-pointer w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                        {imagePreview && (
                          <div className="mt-2">
                            <img 
                              src={imagePreview} 
                              alt="Vista previa" 
                              className="w-full max-h-40 object-contain rounded-md"
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleAddModel}
                          className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
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
              <div className="flex flex-col justify-center items-center mt-20">
                <p className="text-lg">No hay modelos disponibles.</p>
                <p className="text-md text-gray-500">
                  {searchQuery ? "Intente con otra búsqueda." : "Agregue uno nuevo con el botón +"}
                </p>
              </div>
            )}

            {/* Cards Container */}
            {!loading && !error && filteredModels && filteredModels.length > 0 && (
              <div className="bg-slate-200 p-4 rounded-lg mt-[3em] min-h-[calc(90vh-250px)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredModels.map((model, index) => (
                    <div
                      key={model.id || index}
                      className="bg-card-bg rounded-lg shadow-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-300 transform transition-transform duration-300"
                    >
                      <div>
                        <div className="p-4">
                          <img
                            src={modelImages[model.id] || "/defaultModel.png"}
                            alt={model.name}
                            className="mx-auto mb-4 w-[10em] h-[10em] object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/defaultModel.png";
                            }}
                          />
                          <h3 className="text-[1.8em] font-semibold text-darkpurple-title truncate">
                            {model.name}
                          </h3>
                        </div>

                        <div className="flex justify-between items-center mt-4 bg-indigo-300 p-3 rounded-b-lg border-t-1 border-indigo-400">
                          <EditModelDialog model={model} onSave={handleSave} />

                          <div className="flex items-center space-x-2">
                            <Label className={`text-sm ${model.status ? '' : 'text-gray-500'}`}>
                              {model.status ? 'Activo' : 'Inactivo'}
                            </Label>
                            <Switch
                              className="cursor-pointer"
                              checked={model.status}
                              onCheckedChange={(checked) => handleStatusChange(model.id, checked)}
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
            // background: "rgba(209, 255, 255, 1)" // Azul claro
          },
        }}
      />
    </>
  );
};

export default Model;
