import React, { useState, useEffect } from "react";
import AsideBar from "../../AsideBar";
import EditBrandDialog from "@/components/templates/admin/dialog/EditBrandDialog";
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
  getAllBrands,
  getActiveBrands,
  getInactiveBrands,
  createBrand,
  changeBrandStatus,
} from "../../../services/brand/brandService";
import { toast, Toaster } from "react-hot-toast";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newBrandName, setNewBrandName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);

  // Fetch brands based on status filter
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        let response;
        switch (statusFilter) {
          case "active":
            response = await getActiveBrands();
            break;
          case "inactive":
            response = await getInactiveBrands();
            break;
          case "all":
          default:
            response = await getAllBrands();
            break;
        }

        // Extract the data from the response
        const data = response && response.result ? response.result : response;

        if (Array.isArray(data)) {
          setBrands(data);
          setFilteredBrands(data);
        } else {
          console.error("Expected array but got:", data);
          setBrands([]);
          setFilteredBrands([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError("Error al cargar las marcas. Por favor, intente de nuevo.");
        setBrands([]);
        setFilteredBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [statusFilter]);

  // Filter brands based on search query
  useEffect(() => {
    if (!Array.isArray(brands)) {
      setFilteredBrands([]);
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredBrands(brands);
      return;
    }

    const filtered = brands.filter(
      (brand) =>
        brand.name &&
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredBrands(filtered);
  }, [searchQuery, brands]);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await changeBrandStatus(id);

      // Update the local state
      setBrands((prev) => {
        if (!Array.isArray(prev)) return [];

        return prev.map((brand) => {
          if (brand.id === id) {
            return { ...brand, status: newStatus };
          }
          return brand;
        });
      });

      setFilteredBrands((prev) => {
        if (!Array.isArray(prev)) return [];

        return prev.map((brand) => {
          if (brand.id === id) {
            return { ...brand, status: newStatus };
          }
          return brand;
        });
      });

      toast.success(
        `Marca ${newStatus ? "activada" : "desactivada"} correctamente`
      );
    } catch (error) {
      console.error("Error changing brand status:", error);
      toast.error("Error al cambiar el estado de la marca");
    }
  };

  // Handle save (after edit)
  const handleSave = (updatedBrand) => {
    // Update the local state
    setBrands((prev) => {
      if (!Array.isArray(prev)) return [];

      return prev.map((brand) => {
        if (brand.id === updatedBrand.id) {
          return { ...brand, name: updatedBrand.name };
        }
        return brand;
      });
    });

    setFilteredBrands((prev) => {
      if (!Array.isArray(prev)) return [];

      return prev.map((brand) => {
        if (brand.id === updatedBrand.id) {
          return { ...brand, name: updatedBrand.name };
        }
        return brand;
      });
    });

    toast.success("Marca actualizada correctamente");
  };

  // Handle add new brand
  const handleAddBrand = async () => {
    if (!newBrandName.trim()) {
      toast.error("Por favor ingrese un nombre para la marca");
      return;
    }

    try {
      const newBrand = await createBrand(newBrandName);

      // Extract the new brand from the result property if it exists
      const newBrandData =
        newBrand && newBrand.result ? newBrand.result : newBrand;

      // If we're viewing active brands (default for new brands), add it to the list
      if (statusFilter === "active" || statusFilter === "all") {
        setBrands((prev) => {
          if (!Array.isArray(prev)) return [newBrandData];
          return [...prev, newBrandData];
        });

        setFilteredBrands((prev) => {
          if (!Array.isArray(prev)) return [newBrandData];
          return [...prev, newBrandData];
        });
      }

      setNewBrandName("");
      toast.success("Marca creada correctamente");

      // Close the popover
      setIsAddPopoverOpen(false);
    } catch (error) {
      console.error("Error creating brand:", error);
      toast.error("Error al crear la marca");
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full">
        <AsideBar activePage="brand" />
        <main className="flex-1 flex flex-col">
          <div className="flex flex-col p-5 md:p-20 w-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Marcas
              </h1>
              <img
                src="/listItem.png"
                alt="Marca"
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
                    placeholder="Buscar marca..."
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
                  <PopoverContent className="w-[20em] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)] transform -translate-x-1/2">
                    <div className="w-[90%] m-auto">
                      <div className="mt-[2em] flex items-center justify-center border-b border-purple-100">
                        <img
                          src="/asidebarIMG/brand.png"
                          alt="Marca"
                          className="w-[4em] mb-[2em]"
                        />
                      </div>

                      <div className="mt-[1.5em] grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="brandName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nombre de la marca
                        </Label>
                        <Input
                          type="text"
                          id="brandName"
                          value={newBrandName}
                          onChange={(e) => setNewBrandName(e.target.value)}
                          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          maxLength={20}
                        />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleAddBrand}
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
                <p className="text-lg">Cargando marcas...</p>
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
              (!filteredBrands || filteredBrands.length === 0) && (
                <div className="flex flex-col justify-center items-center mt-20">
                  <p className="text-lg">No hay marcas disponibles.</p>
                  <p className="text-md text-gray-500">
                    {searchQuery
                      ? "Intente con otra búsqueda."
                      : "Agregue una nueva con el botón +"}
                  </p>
                </div>
              )}

            {/* Cards Container */}
            {!loading &&
              !error &&
              filteredBrands &&
              filteredBrands.length > 0 && (
                <div className="bg-slate-200 p-4 rounded-lg mt-[3em] min-h-[calc(90vh-250px)]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBrands.map((brand, index) => (
                      <div
                        key={brand.id || index}
                        className="bg-card-bg rounded-lg shadow-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-300 transform transition-transform duration-300"
                      >
                        <div>
                          <div className="p-4">
                            <h3 className="text-[1.8em] font-semibold text-darkpurple-title truncate">
                              {brand.name}
                            </h3>
                          </div>

                          <div className="flex justify-between items-center mt-4 bg-indigo-300 p-3 rounded-b-lg border-t-1 border-indigo-400">
                            <EditBrandDialog
                              brand={brand}
                              onSave={handleSave}
                            />

                            <div className="flex items-center space-x-2 mt-4">
                              <Label
                                className={`text-sm ${
                                  brand.status ? "" : "text-gray-500"
                                }`}
                              >
                                {brand.status ? "Activo" : "Inactivo"}
                              </Label>
                              <Switch
                                className="cursor-pointer"
                                checked={brand.status}
                                onCheckedChange={(checked) =>
                                  handleStatusChange(brand.id, checked)
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
            // background: "rgba(209, 255, 255, 1)", // Azul claro
          },
        }}
      />
    </>
  );
}
