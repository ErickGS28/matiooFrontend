import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProfileDialog } from "./ProfileDialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { decodeAndDisplayToken } from "@/services/auth/authService";
import { itemService } from "@/services/item/itemService";
import { toast } from "react-hot-toast";

export default function responsibleHome() {
  const [navegar, setNavegar] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        setLoading(true);
        // Obtener el ID del usuario desde el token
        const userData = decodeAndDisplayToken();
        
        if (!userData || !userData.id) {
          console.error("No se pudo obtener el ID del usuario desde el token");
          toast.error("Error al obtener información del usuario");
          return;
        }

        console.log("ID del usuario:", userData.id);
        
        // Obtener los items asignados al usuario
        const userItems = await itemService.getItemsByAssignedToId(userData.id);
        console.log("Items obtenidos:", userItems);
        
        setItems(userItems);
        setFilteredItems(userItems);
      } catch (error) {
        console.error("Error al obtener los items del usuario:", error);
        toast.error("Error al cargar los bienes asignados");
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, []);

  // Filtrar items cuando cambia el término de búsqueda
  useEffect(() => {
    if (items.length > 0) {
      const filtered = items.filter(item => 
        item.name.toLowerCase().includes(navegar.toLowerCase()) ||
        item.description.toLowerCase().includes(navegar.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [navegar, items]);

  const handleRemoveItem = async (itemId) => {
    // Aquí iría la lógica para quitar un bien asignado
    // Por ahora solo mostramos un mensaje
    console.log('Quitar item con ID:', itemId);
    toast.success("Funcionalidad de quitar bien en desarrollo");
  };

  return (
    <>
      <nav className="bg-white p-4 border-b-1 border-purple-200">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/internHome")}>
            <img
              src="/logomatioo.png"
              alt="Logo"
              className="h-10"
            />
          </div>

          <div className="flex space-x-6">
         

            <ProfileDialog user={{ name: "Santiago", password: "123456" }} />
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen w-full pb-2 bg-purple-100 h-full">
        <main className="flex-1 flex flex-col h-full">
          <div className="flex flex-col p-5 md:px-20 w-full h-full">
            {/* Título */}
            <div className="flex items-center">
              <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                Bienes que ocupas
              </h1>
              <img
                src="/itemIntern.png"
                alt="becario"
                className="ml-auto w-[7em] h-[7em] object-contain"
              />
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="my-3 mt-5 w-full flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="search"
                  value={navegar}
                  onChange={(e) => setNavegar(e.target.value)}
                  className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                  placeholder="Buscar bien..."
                />
              </div>
            </div>

            {/* Estado de carga */}
            {loading && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-gray-600">Cargando bienes asignados...</p>
              </div>
            )}

            {/* Mensaje si no hay items */}
            {!loading && filteredItems.length === 0 && (
              <div className="flex justify-center items-center mt-10">
                <p className="text-lg text-gray-600">No tienes bienes asignados actualmente.</p>
              </div>
            )}

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-[3em]">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-card-bg rounded-lg shadow-md p-4 hover:scale-105 w-[auto]">
                  <div className="flex justify-center bg-white rounded-2xl">
                    <img 
                      src={item.imageUrl || "/defaultItem.png"} 
                      alt={item.name} 
                      className="mx-auto mb-4 w-[8em]" 
                      onError={(e) => { e.target.src = "/defaultItem.png" }}
                    />
                  </div>
                  <div className="px-3">
                    <h3 className="text-[1.8em] font-semibold text-mdpurple-htext">{item.name}</h3>
                    <div className="flex justify-between gap-4 align-middle">
                      <p className="text-gray-800">{item.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <p className="text-sm text-gray-600">Código: {item.code}</p>
                      <p className="text-sm text-gray-600">Estado: {item.status}</p>
                      <div className="flex justify-end mt-2">
                        <Button 
                          className="cursor-pointer py-1 px-3 bg-red-cancel rounded-full text-amber-50"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Quitar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
