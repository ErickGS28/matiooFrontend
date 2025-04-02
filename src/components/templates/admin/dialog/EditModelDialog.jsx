import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { updateModel, updateModelWithImage, getModelImageUrl, fetchModelImage } from "../../../../services/model/modelService"
import { toast } from "react-hot-toast"

export default function EditModelDialog({ model, onSave }) {
  // Initialize formData with default values
  const [formData, setFormData] = React.useState({
    id: model?.id || 0,
    name: model?.name || '',
    status: model?.status || false,
    photo: model?.photo || null
  });

  const [newImage, setNewImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [modelImage, setModelImage] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Update formData when model prop changes
  // Use JSON.stringify to compare objects and prevent infinite loops
  React.useEffect(() => {
    // Only update if the model prop actually changed
    const newModelData = {
      id: model?.id || 0,
      name: model?.name || '',
      status: model?.status || false,
      photo: model?.photo || null
    };

    // Compare current formData with new data from props
    if (JSON.stringify(newModelData) !== JSON.stringify({
      id: formData.id,
      name: formData.name,
      status: formData.status,
      photo: formData.photo
    })) {
      setFormData(newModelData);
      setImagePreview(null); // Reset image preview when model changes
      setNewImage(null);
    }
  }, [model?.id, model?.name, model?.status, model?.photo]);

  // Fetch model image when dialog opens
  React.useEffect(() => {
    const getModelImage = async () => {
      if (isOpen && formData.id) {
        try {
          // Solo intentamos cargar la imagen si el modelo tiene la propiedad photo
          if (formData.photo) {
            const imageUrl = await fetchModelImage(formData.id);
            setModelImage(imageUrl);
          } else {
            setModelImage("/defaultModel.png");
          }
        } catch (error) {
          console.error("Error fetching model image:", error);
          setModelImage("/defaultModel.png");
        }
      }
    };

    getModelImage();
  }, [isOpen, formData.id, formData.photo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño de archivo (1MB = 1048576 bytes)
      const maxSize = 1048576; // 1MB
      if (file.size > maxSize) {
        toast.error("La imagen es demasiado grande. El tamaño máximo permitido es 1MB.");
        e.target.value = ''; // Limpiar el input
        setNewImage(null);
        setImagePreview(null);
        return;
      }

      setNewImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (!formData.id) {
        console.error("Cannot update: Missing ID");
        return;
      }

      let response;
      if (newImage) {
        // Update with new image
        response = await updateModelWithImage(
          { id: formData.id, name: formData.name },
          newImage
        );
      } else {
        // Update without changing image
        response = await updateModel(formData.id, formData.name);
      }

      // Get the updated model from the response
      const updatedModel = response && response.result ? response.result : response;

      if (onSave && typeof onSave === 'function') {
        onSave(updatedModel);
      }

      toast.success("Modelo actualizado correctamente");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating model:", error);
      toast.error("Error al actualizar el modelo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="bg-purple-950 hover:bg-purple-700 text-white font-semibold py-1 p-6 rounded-full mt-4 cursor-pointer">
          Editar
        </button>
      </DialogTrigger>
      <DialogContent className="w-[30%] h-[80%] min-w-[425px] max-w-[90vw] p-6 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(88,28,135,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-darkpurple-title text-[1.8em] font-semibold">Editar modelo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div>
            <Label className="text-darkpurple-title font-medium">Nombre</Label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
            />
          </div>

          <div className="mt-3">
            <Label className="text-darkpurple-title font-medium">Imagen actual</Label>
            <div className="mt-3 flex justify-center">
              <img
                src={imagePreview || modelImage || "/defaultModel.png"}
                alt={formData.name}
                className="w-[10em] h-[10em] object-contain rounded-md border-2 border-purple-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/defaultModel.png";
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-darkpurple-title font-medium">Cambiar imagen (opcional)</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer mt-3 w-full rounded-[1em] border-2 border-purple-900 px-4 py-2 bg-transparent text-darkpurple-title focus:outline-none focus:ring-2 focus:ring-purple-900/50"
            />
          </div>

          <div className="flex justify-end mt-[2em]">
            <Button
              onClick={handleSave}
              className="cursor-pointer bg-darkpurple-title hover:bg-purple-900 text-white font-semibold rounded-[1em] px-4 py-2 shadow-md shadow-purple-300/30 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
