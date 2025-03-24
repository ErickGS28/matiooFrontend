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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getAllUsers } from "@/services/users/userService";
import { getActiveCommonAreas } from "@/services/common_area/commonAreaService";

export function EditItemDialog({ item, onSave }) {
  const [formData, setFormData] = React.useState({
    id: item.id || 0,
    name: item.name || "",
    itemTypeId: item.itemType ? item.itemType.id : "",
    brandId: item.brand ? item.brand.id : "",
    modelId: item.model ? item.model.id : "",
    code: item.code || "",
    serialNumber: item.serialNumber || "",
    location: item.location || "",
    ownerId: item.owner ? item.owner.id : "",
    assignedToId: item.assignedTo ? item.assignedTo.id : "",
    status: item.status !== undefined ? item.status : true,
    useCommonArea: false,
    commonAreaId: ""
  });
  
  const [responsibleUsers, setResponsibleUsers] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [commonAreas, setCommonAreas] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Cargar usuarios y áreas comunes cuando se abre el diálogo
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar usuarios
        const usersResponse = await getAllUsers();
        if (usersResponse && usersResponse.type === "SUCCESS" && Array.isArray(usersResponse.result)) {
          // Filtrar usuarios con rol RESPONSIBLE para dueños
          const responsible = usersResponse.result.filter(user => 
            user.role && user.role.name === "RESPONSIBLE"
          );
          setResponsibleUsers(responsible);
          
          // Todos los usuarios para asignados
          setAllUsers(usersResponse.result);
        }

        // Cargar áreas comunes
        const areasResponse = await getActiveCommonAreas();
        if (areasResponse && areasResponse.type === "SUCCESS" && Array.isArray(areasResponse.result)) {
          setCommonAreas(areasResponse.result);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = () => {
    // Preparar el objeto para enviar al backend - EXACTAMENTE con la estructura esperada
    const updatedItem = {
      id: parseInt(formData.id),
      itemTypeId: parseInt(formData.itemTypeId),
      brandId: parseInt(formData.brandId),
      modelId: parseInt(formData.modelId),
      serialNumber: formData.serialNumber,
      code: formData.code,
      ownerId: parseInt(formData.ownerId),
      assignedToId: formData.assignedToId === "none" ? null : parseInt(formData.assignedToId),
      location: formData.useCommonArea && formData.commonAreaId ? formData.commonAreaId : formData.location,
      name: formData.name
    };
    
    console.log("Enviando actualizaciòn:", updatedItem);
    onSave(updatedItem);
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <img
          src="/action.png"
          alt="Actions"
          className="w-[1.25em] h-[1.25em] cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </DialogTrigger>
      <DialogContent className="w-[35%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
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
                className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
              />
            </div>
            <div>
              <Label className="text-darkpurple-title font-medium">
                Tipo de bien
              </Label>
              <Select 
                value={formData.itemTypeId.toString()} 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, itemTypeId: value }))}
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Electrónico</SelectItem>
                  <SelectItem value="2">Mueble</SelectItem>
                  <SelectItem value="3">Herramienta</SelectItem>
                  <SelectItem value="4">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-darkpurple-title font-medium">
                Marca
              </Label>
              <Select 
                value={formData.brandId.toString()} 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, brandId: value }))}
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                  <SelectValue placeholder="Selecciona una marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">HP</SelectItem>
                  <SelectItem value="2">Dell</SelectItem>
                  <SelectItem value="3">Lenovo</SelectItem>
                  <SelectItem value="4">Apple</SelectItem>
                  <SelectItem value="5">Samsung</SelectItem>
                  <SelectItem value="6">Otra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-darkpurple-title font-medium">
                Modelo
              </Label>
              <Select 
                value={formData.modelId.toString()} 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, modelId: value }))}
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Pavilion</SelectItem>
                  <SelectItem value="2">Inspiron</SelectItem>
                  <SelectItem value="3">ThinkPad</SelectItem>
                  <SelectItem value="4">MacBook</SelectItem>
                  <SelectItem value="5">Galaxy</SelectItem>
                  <SelectItem value="6">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
              />
            </div>
            <div>
              <Label className="text-darkpurple-title font-medium">
                Número de Serie
              </Label>
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, serialNumber: e.target.value }))
                }
                className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
              />
            </div>
            <div>
              <Label className="text-darkpurple-title font-medium">
                Dueño
              </Label>
              <Select 
                value={formData.ownerId.toString()} 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, ownerId: value }))}
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                  <SelectValue placeholder="Selecciona un dueño" />
                </SelectTrigger>
                <SelectContent>
                  {responsibleUsers.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name} {user.surname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-darkpurple-title font-medium">
                Asignado a
              </Label>
              <Select 
                value={formData.assignedToId ? formData.assignedToId.toString() : "none"} 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, assignedToId: value === "none" ? "" : value }))}
              >
                <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin asignar</SelectItem>
                  {allUsers.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name} {user.surname} ({user.role?.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-purple-900 data-[state=checked]:bg-purple-900 data-[state=checked]:text-white">
                <input 
                  type="checkbox" 
                  id="useCommonArea"
                  checked={formData.useCommonArea}
                  onChange={(e) => setFormData((prev) => ({ ...prev, useCommonArea: e.target.checked }))}
                  className="h-4 w-4 cursor-pointer"
                />
              </div>
              <Label htmlFor="useCommonArea" className="text-darkpurple-title font-medium cursor-pointer">
                Usar área común
              </Label>
            </div>
            {formData.useCommonArea ? (
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Área común
                </Label>
                <Select 
                  value={formData.commonAreaId.toString()} 
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, commonAreaId: value }))}
                >
                  <SelectTrigger className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                    <SelectValue placeholder="Selecciona un área común" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonAreas.map(area => (
                      <SelectItem key={area.id} value={area.id.toString()}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div>
                <Label className="text-darkpurple-title font-medium">
                  Ubicación
                </Label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                />
              </div>
            )}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
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
