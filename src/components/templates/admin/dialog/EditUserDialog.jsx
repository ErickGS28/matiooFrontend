import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { getActiveCommonAreas } from "@/services/common_area/commonAreaService"

export function EditUserDialog({ user, onSave }) {
  const [formData, setFormData] = React.useState({
    id: user.id,
    fullName: `${user.name} ${user.lastname}`.trim(),
    username: user.username || "",
    email: user.email || "",
    location: user.location || "",
    isCommonArea: false,
    commonAreaId: "",
    role: user.role || "RESPONSIBLE",
    status: user.status || false
  });
  
  const [commonAreas, setCommonAreas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // Fetch common areas when component mounts
    const fetchCommonAreas = async () => {
      try {
        setIsLoading(true);
        const data = await getActiveCommonAreas();
        setCommonAreas(data);
      } catch (error) {
        console.error("Error fetching common areas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommonAreas();
  }, []);

  React.useEffect(() => {
    // Update form data when user prop changes
    setFormData({
      id: user.id,
      fullName: `${user.name} ${user.lastname}`.trim(),
      username: user.username || "",
      email: user.email || "",
      location: user.location || "",
      isCommonArea: false,
      commonAreaId: "",
      role: user.role || "RESPONSIBLE",
      status: user.status || false
    });
  }, [user]);

  const handleSave = () => {
    // Prepare data for API
    const userData = {
      id: formData.id,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      location: formData.isCommonArea ? formData.commonAreaId : formData.location,
      role: formData.role
    };
    
    onSave(userData);
  };

  // Función para traducir los roles a un formato más amigable
  const translateRole = (role) => {
    const roleMap = {
      'ADMIN': 'Admin',
      'INTERN': 'Becario',
      'RESPONSIBLE': 'Responsable'
    };
    return roleMap[role] || role;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img src="/action.png" alt="Actions" className="w-[1.25em] h-[1.25em] cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </DialogTrigger>
      <DialogContent className="w-[50%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Editar {translateRole(user.role)}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Complete los campos para editar la información del usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img 
              src={user.role === "INTERN" ? "/becarios.png" : user.role === "RESPONSIBLE" ? "/responsible.png" : "/admin.png"}
              alt={translateRole(user.role)} 
              className="w-full h-auto max-w-[200px]" 
            />
          </div>
          <div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-darkpurple-title font-medium">Nombre completo</Label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Nombre de usuario</Label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                />
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Correo electrónico</Label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Label className="text-darkpurple-title font-medium">Lugar</Label>
                  <div className="flex items-center space-x-2 ml-4">
                    <input 
                      type="checkbox" 
                      id="isCommonAreaEdit" 
                      checked={formData.isCommonArea}
                      onChange={(e) => {
                        setFormData(prev => ({ 
                          ...prev, 
                          isCommonArea: e.target.checked,
                          location: e.target.checked ? "" : prev.location,
                          commonAreaId: e.target.checked ? (prev.commonAreaId || "") : ""
                        }))
                      }}
                      className="h-4 w-4 text-purple-900 rounded border-gray-300 focus:ring-purple-900"
                    />
                    <label htmlFor="isCommonAreaEdit" className="text-sm font-medium text-darkpurple-title">
                      Área común
                    </label>
                  </div>
                </div>
                
                {formData.isCommonArea ? (
                  <Select 
                    value={formData.commonAreaId} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, commonAreaId: value }))}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title">
                      <SelectValue placeholder="Selecciona un área común" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-purple-900 rounded-[1em] shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
                      {Array.isArray(commonAreas) ? commonAreas.map(area => (
                        <SelectItem key={area.id} value={area.name} className="hover:bg-purple-900/10">
                          {area.name}
                        </SelectItem>
                      )) : (
                        <SelectItem value="error" disabled>No hay áreas comunes disponibles</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-2 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
                    placeholder="Ingrese ubicación"
                  />
                )}
              </div>
              <div>
                <Label className="text-darkpurple-title font-medium">Estado</Label>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={formData.status}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, status: checked }))}
                      className="data-[state=checked]:bg-green-confirm data-[state=unchecked]:bg-gray-600"
                    />
                    <span className="text-darkpurple-title">
                      {formData.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300">
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              // TODO: Implementar lógica para cancelar edición
            }}
            className="bg-transparent border-2 border-purple-900 hover:border-purple-900/50 text-darkpurple-title font-semibold rounded-[1em] px-4 py-2 transition-colors duration-300"
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
