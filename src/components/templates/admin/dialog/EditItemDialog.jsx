import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getAllUsers } from "@/services/users/userService";
import { getActiveCommonAreas } from "@/services/common_area/commonAreaService";
import { getActiveBrands } from "@/services/brand/brandService";
import { getActiveItemTypes } from "@/services/item_type/itemTypeService";
import { getActiveModels } from "@/services/model/modelService";

export function EditItemDialog({ item, onSave }) {
  // Estado inicial: si un campo no existe, se pone 0 (sin selección).
  const [formData, setFormData] = React.useState({
    id: item.id || 0,
    name: item.name || "",
    itemTypeId: item.itemType ? item.itemType.id : 0,
    brandId: item.brand ? item.brand.id : 0,
    modelId: item.model ? item.model.id : 0,
    ownerId: item.owner ? item.owner.id : 0,         // si no hay owner => 0
    serialNumber: item.serialNumber || "",
    code: item.code || "",
    location: item.location || "",
    assignedToId: item.assignedTo ? item.assignedTo.id : 0, // si no hay assigned => 0
    status: item.status !== undefined ? item.status : true,
    useCommonArea: false,
    commonAreaId: 0,
  });
  
  const [responsibleUsers, setResponsibleUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [commonAreas, setCommonAreas] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [itemTypes, setItemTypes] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Cargar usuarios y áreas comunes cuando se abre el diálogo
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar usuarios
        const usersResponse = await getAllUsers();
        if (
          usersResponse &&
          usersResponse.type === "SUCCESS" &&
          Array.isArray(usersResponse.result)
        ) {
          // Filtrar usuarios con rol "RESPONSIBLE" para 'dueño'
          const responsible = usersResponse.result.filter(
            (user) => user.role && user.role === "RESPONSIBLE"
          );
          setResponsibleUsers(responsible);

          // Todos los usuarios para 'asignado'
          setAllUsers(usersResponse.result);
        }

        // Cargar áreas comunes
        const areasResponse = await getActiveCommonAreas();
        if (
          areasResponse &&
          areasResponse.type === "SUCCESS" &&
          Array.isArray(areasResponse.result)
        ) {
          setCommonAreas(areasResponse.result);
        }
        
        // Cargar marcas
        const brandsResponse = await getActiveBrands();
        if (
          brandsResponse &&
          brandsResponse.type === "SUCCESS" &&
          Array.isArray(brandsResponse.result)
        ) {
          setBrands(brandsResponse.result);
        }
        
        // Cargar tipos de item
        const typesResponse = await getActiveItemTypes();
        if (
          typesResponse &&
          typesResponse.type === "SUCCESS" &&
          Array.isArray(typesResponse.result)
        ) {
          setItemTypes(typesResponse.result);
        }
        
        // Cargar modelos
        const modelsResponse = await getActiveModels();
        if (
          modelsResponse &&
          modelsResponse.type === "SUCCESS" &&
          Array.isArray(modelsResponse.result)
        ) {
          setModels(modelsResponse.result);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      // Si se eligió un área común, sobrescribimos location con ese nombre
      let finalLocation = formData.location;
      if (formData.useCommonArea && formData.commonAreaId) {
        const areaSeleccionada = commonAreas.find(
          (a) => a.id === parseInt(formData.commonAreaId)
        );
        finalLocation = areaSeleccionada ? areaSeleccionada.name : "";
      }

      // Preparamos los valores para el envío
      const itemTypeId = parseInt(formData.itemTypeId);
      const brandId = parseInt(formData.brandId);
      const modelId = parseInt(formData.modelId);
      
      const updatedItem = {
        // Id del propio item
        id: parseInt(formData.id),

        // Relaciones
        itemTypeId: !isNaN(itemTypeId) && itemTypeId > 0 ? itemTypeId : null,
        brandId: !isNaN(brandId) && brandId > 0 ? brandId : null,
        modelId: !isNaN(modelId) && modelId > 0 ? modelId : null,

        // Dueño (owner) - siguiendo el patrón de BtnRegistrarItem.jsx
        ownerId: formData.ownerId && formData.ownerId !== "none"
          ? parseInt(formData.ownerId)
          : null,

        // Asignado (assignedTo) - siguiendo el patrón de BtnRegistrarItem.jsx
        assignedToId: formData.assignedToId && formData.assignedToId !== "none"
          ? parseInt(formData.assignedToId)
          : null,

        // Campos simples
        serialNumber: formData.serialNumber,
        code: formData.code,
        name: formData.name,
        location: finalLocation,

        // Otros
        status: formData.status,
      };

      console.log("Enviando actualización:", updatedItem);

      // Llamamos a onSave con el objeto final
      await onSave(updatedItem);

      // Si todo OK
      setIsDialogOpen(false); // Cerrar el diálogo
      alert("¡Bien guardado!");
    } catch (error) {
      console.error("Error en handleSave:", error);
      alert("Error al guardar: " + (error?.message || "Desconocido"));
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <img
          src="/action.png"
          alt="Actions"
          className="w-[1.25em] h-[1.25em] cursor-pointer absolute
                     top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </DialogTrigger>
      
      <DialogContent
        className="w-[35%] min-w-[425px] max-w-[90vw]
                   p-6 bg-white rounded-2xl
                   shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]"
      >
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            {item.name}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Edita los detalles del bien
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[80vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-6">
            {/* Nombre */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Nombre
              </Label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-3 w-full rounded-[1em] border-2 border-purple-900
                           px-4 py-2 bg-transparent text-darkpurple-title
                           focus:outline-none focus:ring-2 focus:ring-purple-900/50"
              />
            </div>

            {/* Tipo de bien */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Tipo de bien
              </Label>
              <Select
                value={formData.itemTypeId.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, itemTypeId: value }))
                }
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em]
                                         border-2 border-purple-900 px-4 py-2
                                         bg-transparent text-darkpurple-title"
                >
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

            {/* Marca */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Marca
              </Label>
              <Select
                value={formData.brandId.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, brandId: value }))
                }
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em]
                                         border-2 border-purple-900 px-4 py-2
                                         bg-transparent text-darkpurple-title"
                >
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

            {/* Modelo */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Modelo
              </Label>
              <Select
                value={formData.modelId.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, modelId: value }))
                }
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em]
                                         border-2 border-purple-900 px-4 py-2
                                         bg-transparent text-darkpurple-title"
                >
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

            {/* Código */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Código
              </Label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, code: e.target.value }))
                }
                className="mt-3 w-full rounded-[1em] border-2
                           border-purple-900 px-4 py-2 bg-transparent
                           text-darkpurple-title focus:outline-none
                           focus:ring-2 focus:ring-purple-900/50"
              />
            </div>

            {/* Número de Serie */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Número de Serie
              </Label>
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serialNumber: e.target.value,
                  }))
                }
                className="mt-3 w-full rounded-[1em] border-2 border-purple-900
                           px-4 py-2 bg-transparent text-darkpurple-title
                           focus:outline-none focus:ring-2 focus:ring-purple-900/50"
              />
            </div>

            {/* Dueño */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Dueño
              </Label>
              <Select
                value={formData.ownerId > 0 ? formData.ownerId.toString() : "none"}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    ownerId: value === "none" ? 0 : parseInt(value),
                  }))
                }
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em]
                                         border-2 border-purple-900 px-4 py-2
                                         bg-transparent text-darkpurple-title"
                >
                  <SelectValue placeholder="Selecciona un dueño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin dueño</SelectItem>
                  {responsibleUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Asignado a */}
            <div>
              <Label className="text-darkpurple-title font-medium">
                Asignado a
              </Label>
              <Select
                value={formData.assignedToId > 0 ? formData.assignedToId.toString() : "none"}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    assignedToId: value === "none" ? 0 : parseInt(value),
                  }))
                }
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em]
                                         border-2 border-purple-900 px-4 py-2
                                         bg-transparent text-darkpurple-title"
                >
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin asignar</SelectItem>
                  {allUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Check de usar área común */}
            <div className="flex items-center space-x-2">
              <div
                className="flex h-4 w-4 items-center justify-center
                           rounded-sm border border-purple-900
                           data-[state=checked]:bg-purple-900
                           data-[state=checked]:text-white"
              >
                <input
                  type="checkbox"
                  id="useCommonArea"
                  checked={formData.useCommonArea}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      useCommonArea: e.target.checked,
                    }))
                  }
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

            {formData.useCommonArea ? (
              // Selección de Área común
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Área común
                </Label>
                <Select
                  value={formData.commonAreaId > 0
                    ? formData.commonAreaId.toString()
                    : "none"
                  }
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      commonAreaId: value === "none" ? 0 : parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger
                    className="mt-3 w-full rounded-[1em] border-2
                               border-purple-900 px-4 py-2 bg-transparent
                               text-darkpurple-title"
                  >
                    <SelectValue placeholder="Selecciona un área común" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Opción Sin área (por si se quiere desmarcar) */}
                    <SelectItem value="none">Sin área</SelectItem>
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
              // Ubicación manual
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Ubicación
                </Label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="mt-3 w-full rounded-[1em]
                             border-2 border-purple-900 px-4 py-2
                             bg-transparent text-darkpurple-title
                             focus:outline-none focus:ring-2
                             focus:ring-purple-900/50"
                />
              </div>
            )}

            {/* Botón para guardar */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-darkpurple-title hover:bg-purple-900
                           text-white font-semibold rounded-[1em]
                           px-4 py-2 shadow-md shadow-purple-300/30
                           transition-colors duration-300"
              >
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
