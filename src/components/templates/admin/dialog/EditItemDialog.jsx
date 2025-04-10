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
import { SelectWithSearch } from "@/components/ui/select-with-search";
import { getAllUsers } from "@/services/users/userService";
import { getActiveCommonAreas } from "@/services/common_area/commonAreaService";
import { getActiveBrands } from "@/services/brand/brandService";
import { getActiveItemTypes } from "@/services/item_type/itemTypeService";
import { getActiveModels } from "@/services/model/modelService";
import { toast } from "react-hot-toast";
import { validateNoSpecialChars, validateCode, validateSerialNumber } from "@/components/templates/admin/Item";

export function EditItemDialog({ item, onSave }) {
  // Estado para controlar si el diálogo está abierto o no
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Función para inicializar el estado del formulario con los datos del item
  const initializeFormData = (itemData) => ({
    id: itemData.id || 0,
    name: itemData.name || "",
    itemTypeId: itemData.itemType ? itemData.itemType.id : 0,
    brandId: itemData.brand ? itemData.brand.id : 0,
    modelId: itemData.model ? itemData.model.id : 0,
    ownerId: itemData.ownerId || (itemData.owner ? itemData.owner.id : 0),
    serialNumber: itemData.serialNumber || "",
    code: itemData.code || "",
    location: itemData.location || "",
    assignedToId: itemData.assignedToId || (itemData.assignedTo ? itemData.assignedTo.id : 0),
    status: itemData.status !== undefined ? itemData.status : true,
    useCommonArea: false,
    commonAreaId: 0,
  });

  // Estado del formulario
  const [formData, setFormData] = React.useState(initializeFormData(item));

  // Estado para errores de validación
  const [formErrors, setFormErrors] = React.useState({
    name: "",
    code: "",
    serialNumber: ""
  });

  const [responsibleUsers, setResponsibleUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [commonAreas, setCommonAreas] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [itemTypes, setItemTypes] = React.useState([]);
  const [models, setModels] = React.useState([]);

  // Actualizar el estado del formulario cuando cambia el item o se abre el diálogo
  React.useEffect(() => {
    if (isDialogOpen) {
      setFormData(initializeFormData(item));
    }
  }, [item, isDialogOpen]);

  // Cargar usuarios y áreas comunes cuando se abre el diálogo
  React.useEffect(() => {
    if (isDialogOpen) {
      fetchData();
    }
  }, [isDialogOpen]);

  // Función para cargar todos los datos necesarios
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

        // Filtrar usuarios que NO tengan rol "ADMIN" para 'asignado'
        const nonAdminUsers = usersResponse.result.filter(
          (user) => user.role && user.role !== "ADMIN"
        );
        setAllUsers(nonAdminUsers);
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

  // Validar campos al cambiar
  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (value && !validateNoSpecialChars(value)) {
          error = "El nombre no debe contener caracteres especiales";
        }
        break;
      case "code":
        if (value && !validateCode(value)) {
          error = "El código solo debe contener letras, números, guiones o guiones bajos";
        }
        break;
      case "serialNumber":
        if (value && !validateSerialNumber(value)) {
          error = "El número de serie solo debe contener letras, números, guiones o guiones bajos";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  // Manejar cambios en los campos con validación
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Actualizar el valor del campo
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validar el campo
    const error = validateField(name, value);
    
    // Actualizar el estado de errores
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSave = async () => {
    // Validar todos los campos antes de guardar
    const nameError = validateField("name", formData.name);
    const codeError = validateField("code", formData.code);
    const serialNumberError = validateField("serialNumber", formData.serialNumber);
    
    // Actualizar errores
    setFormErrors({
      name: nameError,
      code: codeError,
      serialNumber: serialNumberError
    });
    
    // Si hay errores, no continuar
    if (nameError || codeError || serialNumberError) {
      toast.error("Por favor, corrija los errores en el formulario antes de continuar.");
      return;
    }

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

      // Llamamos a onSave con el objeto final
      await onSave(updatedItem);

      // Si todo OK
      setIsDialogOpen(false); // Cerrar el diálogo
      // Nuevo toast de éxito
      toast.success("¡Bien actualizado!", {
        id: "item-update-success",
        duration: 3000
      });
    } catch (error) {
      console.error("Error en handleSave:", error);
      toast.error(`Error al guardar: ${error?.message || "Desconocido"}`, {
        id: "item-update-error",
        duration: 4000
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <img
          src="/action.png"
          alt="Actions"
          className="w-[1.25em] h-[1.25em] cursor-pointer absolute
                     top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </DialogTrigger>

      <DialogContent
        className="w-[45%] min-w-[425px] h-[32em] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]"
      >
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">
            Actualizar bien
          </DialogTitle>
        </DialogHeader>

        <div className="h-full overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-[350px] mx-auto">
            {/* Columna 1 */}
            <div className="flex flex-col w-3/4 h-full mx-auto">
              {/* Nombre */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Nombre</Label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`border-purple-900 shadow-sm rounded-md focus:border-purple-500 focus:ring-purple-500 mt-3 mb-4 w-full border-1 px-4 py-1 bg-transparent ${formErrors.name ? 'border-red-500' : ''}`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1 mb-2">{formErrors.name}</p>}
              </div>

              {/* Tipo de bien */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Tipo de bien</Label>
                <SelectWithSearch
                  value={formData.itemTypeId.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, itemTypeId: value }))
                  }
                  placeholder="Selecciona un tipo"
                  items={itemTypes}
                  triggerClassName="mt-3 mb-4 w-full border-purple-900 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Marca */}
              <div>
                <Label className="text-sm font-medium text-gray-700" >Marca</Label>
                <SelectWithSearch
                  value={formData.brandId.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, brandId: value }))
                  }
                  placeholder="Selecciona una marca"
                  items={brands}
                  triggerClassName="mt-3 mb-4 w-full border-purple-900 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Modelo */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Modelo</Label>
                <SelectWithSearch
                  value={formData.modelId.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, modelId: value }))
                  }
                  placeholder="Selecciona un modelo"
                  items={models}
                  triggerClassName="mt-3 w-full border-purple-900 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col  w-3/4 h-full mx-auto">
              {/* Código y Número de Serie en dos columnas */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Código</Label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className={`border-purple-900 shadow-sm rounded-md focus:border-purple-500 focus:ring-purple-500 mt-3 mb-4 w-full border-1 px-4 py-1 bg-transparent ${formErrors.code ? 'border-red-500' : ''}`}
                />
                {formErrors.code && <p className="text-red-500 text-xs mt-1 mb-2">{formErrors.code}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Número de Serie</Label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  className={`border-purple-900 shadow-sm rounded-md focus:border-purple-500 focus:ring-purple-500 mt-3 mb-4 w-full border-1 px-4 py-1 bg-transparent ${formErrors.serialNumber ? 'border-red-500' : ''}`}
                />
                {formErrors.serialNumber && <p className="text-red-500 text-xs mt-1 mb-2">{formErrors.serialNumber}</p>}
              </div>

              {/* Dueño */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Dueño</Label>
                <SelectWithSearch
                  value={formData.ownerId > 0 ? formData.ownerId.toString() : "none"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      ownerId: value === "none" ? 0 : parseInt(value),
                    }))
                  }
                  placeholder="Selecciona un dueño"
                  items={[
                    { id: "none", name: "Sin dueño" },
                    ...responsibleUsers.map(user => ({ id: user.id.toString(), name: user.fullName }))
                  ]}
                  triggerClassName="mt-3 mb-4 w-full border-purple-900 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Asignado a */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Asignado a</Label>
                <SelectWithSearch
                  value={formData.assignedToId > 0 ? formData.assignedToId.toString() : "none"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      assignedToId: value === "none" ? 0 : parseInt(value),
                    }))
                  }
                  placeholder="Selecciona un usuario"
                  items={[
                    { id: "none", name: "Sin asignar" },
                    ...allUsers.map(user => ({ id: user.id.toString(), name: user.fullName }))
                  ]}
                  triggerClassName="mt-3 w-full border-purple-900 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleSave}
                  className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
                >
                  Guardar cambios
                </Button>
              </div>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
