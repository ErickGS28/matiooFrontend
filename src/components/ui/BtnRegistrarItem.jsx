import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getActiveUsers } from "@/services/users/userService";
import { getActiveCommonAreas } from "@/services/common_area/commonAreaService";
import { getActiveBrands } from "@/services/brand/brandService";
import { getActiveItemTypes } from "@/services/item_type/itemTypeService";
import { getActiveModels } from "@/services/model/modelService";
import toast, { Toaster } from "react-hot-toast"; // Toaster para alertas

export default function BtnRegistrarItem({ onAgregar }) {
  const [name, setName] = useState("");
  const [itemTypeId, setItemTypeId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [useCommonArea, setUseCommonArea] = useState(false);
  const [commonAreas, setCommonAreas] = useState([]);
  const [commonAreaId, setCommonAreaId] = useState("");
  const [responsibleUsers, setResponsibleUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar todos los datos cuando se abre el popover
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          console.log("Cargando datos para el formulario de registro...");

          // Cargar usuarios activos
          const usersResponse = await getActiveUsers();
          if (usersResponse && usersResponse.type === "SUCCESS" && Array.isArray(usersResponse.result)) {
            const users = usersResponse.result;

            // Filtrar usuarios con rol RESPONSIBLE
            const responsible = users.filter(
              (user) => user.role && user.role === "RESPONSIBLE"
            );

            setResponsibleUsers(responsible);
            setAllUsers(users);
          }

          // Cargar áreas comunes
          const areasResponse = await getActiveCommonAreas();
          if (areasResponse && areasResponse.type === "SUCCESS" && Array.isArray(areasResponse.result)) {
            setCommonAreas(areasResponse.result);
          }

          // Cargar marcas
          const brandsResponse = await getActiveBrands();
          if (brandsResponse && brandsResponse.type === "SUCCESS" && Array.isArray(brandsResponse.result)) {
            setBrands(brandsResponse.result);
          }

          // Cargar tipos de item
          const typesResponse = await getActiveItemTypes();
          if (typesResponse && typesResponse.type === "SUCCESS" && Array.isArray(typesResponse.result)) {
            setItemTypes(typesResponse.result);
          }

          // Cargar modelos
          const modelsResponse = await getActiveModels();
          if (modelsResponse && modelsResponse.type === "SUCCESS" && Array.isArray(modelsResponse.result)) {
            setModels(modelsResponse.result);
          }
        } catch (error) {
          console.error("Error al cargar datos:", error);
          setFormError("Error al cargar datos. Por favor, inténtalo de nuevo.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen]);

  const resetForm = () => {
    setName("");
    setItemTypeId("");
    setBrandId("");
    setModelId("");
    setSerialNumber("");
    setCode("");
    setLocation("");
    setOwnerId("");
    setAssignedToId("");
    setFormError("");
    setUseCommonArea(false);
    setCommonAreaId("");
  };

  const handleClick = () => {
    if (!itemTypeId || !brandId || !modelId || !name || !code || !serialNumber) {
      setFormError("Por favor, completa todos los campos requeridos.");
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }

    let finalLocation = location;
    if (useCommonArea && commonAreaId) {
      // Buscar el objeto que coincide con ese ID
      const areaSeleccionada = commonAreas.find(
        (area) => area.id === parseInt(commonAreaId)
      );
      // Tomamos su nombre como la “ubicación”
      finalLocation = areaSeleccionada ? areaSeleccionada.name : "";
    }

    const payload = {
      name,
      code,
      serialNumber,
      status: true,
      itemTypeId: parseInt(itemTypeId),
      brandId: parseInt(brandId),
      modelId: parseInt(modelId),
      ownerId: ownerId && ownerId !== "none" ? parseInt(ownerId) : null,
      assignedToId: assignedToId && assignedToId !== "none"
        ? parseInt(assignedToId)
        : null,
      location: finalLocation,
    };

    console.log("Payload enviado para crear item:", JSON.stringify(payload));

    if (onAgregar) {
      onAgregar(payload);
      setIsOpen(false);
      resetForm();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          <button
            type="button"
            className="flex items-center justify-center ml-auto bg-green-confirm text-white font-semibold py-1 px-4 rounded-full w-[160px] shadow-purple-200 shadow-lg cursor-pointer"
          >
            <p className="text-[1.5em] mr-2">+</p>
            <p>Agregar</p>
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[50%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)] mx-auto transform -translate-x-1/3"
        aria-describedby="popover-description"
      >
        <div className="flex justify-center">
          <div className="w-full">
            {/* Título y descripción fijos */}
            <div className="text-center mb-4">
              <h3 className="text-darkpurple-title text-[1.8em] font-semibold">
                Registrar Bien
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Completa el formulario para registrar un nuevo bien
              </p>
            </div>

            {/* Formulario con scroll */}
            <div className="max-h-[50vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 gap-6">
              

                {isLoading ? (
                  <div className="text-center py-4">
                    <p>Cargando datos...</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="name" className="text-darkpurple-title font-medium">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                        placeholder="Nombre del bien"
                      />
                    </div>

                    <div>
                      <Label htmlFor="itemType" className="text-darkpurple-title font-medium">
                        Tipo de bien
                      </Label>
                      <Select value={itemTypeId} onValueChange={setItemTypeId}>
                        <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {itemTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id.toString()}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="brand" className="text-darkpurple-title font-medium">
                        Marca
                      </Label>
                      <Select value={brandId} onValueChange={setBrandId}>
                        <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                          <SelectValue placeholder="Selecciona una marca" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id.toString()}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="model" className="text-darkpurple-title font-medium">
                        Modelo
                      </Label>
                      <Select value={modelId} onValueChange={setModelId}>
                        <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                          <SelectValue placeholder="Selecciona un modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model.id} value={model.id.toString()}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="code" className="text-darkpurple-title font-medium">
                        Código
                      </Label>
                      <Input
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                        placeholder="Código único del bien"
                      />
                    </div>

                    <div>
                      <Label htmlFor="serialNumber" className="text-darkpurple-title font-medium">
                        Número de Serie
                      </Label>
                      <Input
                        id="serialNumber"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                        placeholder="Número de serie del bien"
                      />
                    </div>

                    <div>
                      <Label htmlFor="owner" className="text-darkpurple-title font-medium">
                        Dueño
                      </Label>
                      <Select value={ownerId || "none"} onValueChange={setOwnerId}>
                        <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                          <SelectValue placeholder="Selecciona un dueño" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sin dueño</SelectItem>
                          {responsibleUsers && responsibleUsers.length > 0 ? (
                            responsibleUsers.map((user) => (
                              <SelectItem
                                key={user.id}
                                value={user.id.toString()}
                              >
                                {user.fullName ||
                                  `${user.name || ""} ${user.surname || ""}`}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-users" disabled>
                              No hay responsables disponibles
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="assignedTo" className="text-darkpurple-title font-medium">
                        Asignado a
                      </Label>
                      <Select value={assignedToId || "none"} onValueChange={setAssignedToId}>
                        <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                          <SelectValue placeholder="Selecciona un usuario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sin asignar</SelectItem>
                          {allUsers && allUsers.length > 0 ? (
                            allUsers.map((user) => (
                              <SelectItem
                                key={user.id}
                                value={user.id.toString()}
                              >
                                {user.fullName ||
                                  `${user.name || ""} ${user.surname || ""}`}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-users" disabled>
                              No hay usuarios disponibles
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-purple-900">
                        <input
                          type="checkbox"
                          id="useCommonArea"
                          checked={useCommonArea}
                          onChange={(e) => setUseCommonArea(e.target.checked)}
                          className="h-4 w-4 cursor-pointer"
                        />
                      </div>
                      <Label
                        htmlFor="useCommonArea"
                        className="text-darkpurple-title font-medium cursor-pointer"
                      >
                        Usar área común
                      </Label>
                    </div>

                    {useCommonArea ? (
                      <div>
                        <Label
                          htmlFor="commonArea"
                          className="text-darkpurple-title font-medium"
                        >
                          Área común
                        </Label>
                        <Select
                          value={commonAreaId}
                          onValueChange={setCommonAreaId}
                        >
                          <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                            <SelectValue placeholder="Selecciona un área común" />
                          </SelectTrigger>
                          <SelectContent>
                            {commonAreas.map((area) => (
                              <SelectItem
                                key={area.id}
                                value={area.id.toString()}
                              >
                                {area.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div>
                        <Label
                          htmlFor="location"
                          className="text-darkpurple-title font-medium"
                        >
                          Ubicación
                        </Label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                          placeholder="Ubicación del bien"
                        />
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        onClick={handleClick}
                        className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
                      >
                        Guardar
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
      <Toaster position="bottom-right" /> {/* Toaster para las alertas */}
    </Popover>
  );
}
