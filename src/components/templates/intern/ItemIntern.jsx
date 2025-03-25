import { Button } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProfileDialog } from "./ProfileDialog";
import { itemService } from "@/services/item/itemService";
import { decodeAndDisplayToken } from "@/services/auth/authService";
import { toast } from "react-hot-toast";

export default function ItemIntern() {
    const [navegar, setNavegar] = useState("");
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();

    // Cargar los items no asignados al montar el componente
    useEffect(() => {
        const fetchUnassignedItems = async () => {
            try {
                setLoading(true);
                
                // Obtener el ID del usuario actual desde el token
                const userData = decodeAndDisplayToken();
                if (userData && userData.id) {
                    setCurrentUserId(userData.id);
                } else {
                    console.warn("No se pudo obtener el ID del usuario desde el token");
                    toast.error("Error al obtener información del usuario");
                }
                
                // Obtener los items no asignados
                const response = await itemService.getUnassignedItems();
                console.log("Items no asignados:", response);
                
                if (response && response.result) {
                    setItems(response.result);
                    setFilteredItems(response.result);
                } else {
                    setItems([]);
                    setFilteredItems([]);
                }
            } catch (error) {
                console.error("Error al cargar los items no asignados:", error);
                toast.error("Error al cargar los bienes disponibles", {
                    id: "load-error",
                    duration: 3000
                });
                setItems([]);
                setFilteredItems([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUnassignedItems();
    }, []);

    // Filtrar items cuando cambia el término de búsqueda
    useEffect(() => {
        if (items.length > 0) {
            const filtered = items.filter(item => 
                item.name.toLowerCase().includes(navegar.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(navegar.toLowerCase()))
            );
            setFilteredItems(filtered);
        }
    }, [navegar, items]);

    const handleSearchChange = (e) => {
        setNavegar(e.target.value);
    };

    const handleNavigation = (page) => {
        navigate(page);
    };

    const handleAssignItem = async (itemId) => {
        try {
            if (!currentUserId) {
                toast.error("No se pudo identificar al usuario actual", {
                    id: "user-error",
                    duration: 3000
                });
                return;
            }
            
            // Confirmar con el usuario antes de asignar
            if (window.confirm("¿Estás seguro de que deseas asignar este bien a tu cuenta?")) {
                console.log(`Asignando item ${itemId} al usuario ${currentUserId}`);
                
                // Llamar al método assignItem del itemService
                const response = await itemService.assignItem(itemId, currentUserId);
                console.log("Respuesta de asignación:", response);
                
                // Mostrar mensaje de éxito
                toast.success("Bien asignado correctamente", {
                    id: "assign-success",
                    duration: 3000
                });
                
                // Actualizar la lista de items (eliminar el item asignado)
                setItems(prevItems => prevItems.filter(item => item.id !== itemId));
                setFilteredItems(prevItems => prevItems.filter(item => item.id !== itemId));
            }
        } catch (error) {
            console.error("Error al asignar el item:", error);
            toast.error("Error al asignar el bien", {
                id: "assign-error",
                duration: 3000
            });
        }
    };

    return (
        <>
            <nav className="bg-white p-4 border-b-1 border-purple-200">
                <div className="flex justify-between items-center mx-auto px-5">
                    <div className="flex items-center cursor-pointer" onClick={() => handleNavigation("/internHome")}>
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
            <div className="flex min-h-screen w-full pb-2 bg-purple-100">
                <main className="flex-1 flex flex-col">
                    <div className="flex flex-col p-5 md:px-20 w-full">
                        {/* Título */}
                        <div className="flex items-center">
                            <h1 className="text-darkpurple-title text-[2.5em] font-semibold">
                                Bienes disponibles
                            </h1>
                            <img
                                src="/itemIII.png"
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
                                    onChange={handleSearchChange}
                                    className="w-[25em] rounded-full px-8 border-2 shadow-lg shadow-purple-200 py-2 bg-gray-100 font-medium"
                                    placeholder="Buscar bien..."
                                />
                            </div>
                            <div className="flex justify-end flex-grow">
                            </div>
                        </div>

                        {/* Estado de carga */}
                        {loading && (
                            <div className="flex justify-center items-center mt-10">
                                <p className="text-lg text-gray-600">Cargando bienes disponibles...</p>
                            </div>
                        )}

                        {/* Mensaje si no hay items */}
                        {!loading && filteredItems.length === 0 && (
                            <div className="flex justify-center items-center mt-10">
                                <p className="text-lg text-gray-600">No hay bienes disponibles para asignar.</p>
                            </div>
                        )}

                        {/* Cards Container */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-[3em]">
                            {filteredItems.map((item) => (
                                <div key={item.id} className="bg-card-bg rounded-lg shadow-md hover:scale-105 w-[auto]">
                                    <div className="flex justify-center bg-white rounded-lg p-2">
                                        <img 
                                            src={item.imageUrl || "/defaultItem.png"} 
                                            alt={item.name} 
                                            className="mx-auto mb-4 w-[8em]" 
                                            onError={(e) => { e.target.src = "/defaultItem.png" }}
                                        />
                                    </div>
                                    <div className="px-4 py-3 bg-purple-800 rounded-b-lg border-t-2 border-purple-950">
                                        <h3 className="text-[1.8em] font-semibold text-white">{item.name}</h3>

                                        <div className="flex justify-between gap-4 align-middle">
                                            <p className="text-white">{item.description}</p>
                                        </div>
                                        
                                        <div className="flex flex-col gap-2 mt-2">
                                            <p className="text-sm text-gray-200">Código: {item.code}</p>
                                            <p className="text-sm text-gray-200">Estado: {item.status}</p>
                                        </div>

                                        <div className="flex justify-end mt-2">
                                            <Button 
                                                className="py-1 px-3 bg-green-confirm rounded-full text-amber-50"
                                                onClick={() => handleAssignItem(item.id)}
                                            >
                                                Asignar
                                            </Button>
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