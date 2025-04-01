import { API_URL } from '../../constants.js';
import { getAuthHeader, handleResponse } from '../utils/authUtils.js';

export const itemService = {
    /**
     * Obtiene todos los items.
     */
    getAllItems: async () => {
        console.log("Llamando a getAllItems()");
        console.log("URL de la API:", `${API_URL}/items/all`);
        
        try {
            const response = await fetch(`${API_URL}/items/all`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta recibida:", {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                
                // Mostrar un ejemplo del item recibido
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        owner: sampleItem.owner,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getAllItems:', error);
            throw new Error('Error al obtener la lista de items');
        }
    },

    /**
     * Obtiene un item por su ID.
     * @param {number} id
     */
    getItemById: async (id) => {
        console.log(`Llamando a getItemById(${id})`);
        
        try {
            const response = await fetch(`${API_URL}/items/id/${id}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemById:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item recibido:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error(`Error en getItemById(${id}):`, error);
            throw new Error(`Error al obtener el item con ID ${id}`);
        }
    },

    /**
     * Obtiene items por el ID del modelo.
     * @param {number} modelId
     */
    getItemsByModelId: async (modelId) => {
        console.log(`Llamando a getItemsByModelId(${modelId})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byModelId/${modelId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByModelId:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByModelId:', error);
            throw new Error(`Error al obtener items con modelId ${modelId}`);
        }
    },

    /**
     * Obtiene items por el nombre del modelo.
     * @param {string} modelName
     */
    getItemsByModelName: async (modelName) => {
        console.log(`Llamando a getItemsByModelName(${modelName})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byModelName/${modelName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByModelName:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByModelName:', error);
            throw new Error(`Error al obtener items con modelName ${modelName}`);
        }
    },

    /**
     * Obtiene items por el ID de la marca.
     * @param {number} brandId
     */
    getItemsByBrandId: async (brandId) => {
        console.log(`Llamando a getItemsByBrandId(${brandId})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byBrandId/${brandId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByBrandId:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByBrandId:', error);
            throw new Error(`Error al obtener items con brandId ${brandId}`);
        }
    },

    /**
     * Obtiene items por el nombre de la marca.
     * @param {string} brandName
     */
    getItemsByBrandName: async (brandName) => {
        console.log(`Llamando a getItemsByBrandName(${brandName})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byBrandName/${brandName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByBrandName:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByBrandName:', error);
            throw new Error(`Error al obtener items con brandName ${brandName}`);
        }
    },

    /**
     * Obtiene items por el ID del tipo de item.
     * @param {number} itemTypeId
     */
    getItemsByItemTypeId: async (itemTypeId) => {
        console.log(`Llamando a getItemsByItemTypeId(${itemTypeId})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byItemTypeId/${itemTypeId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByItemTypeId:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByItemTypeId:', error);
            throw new Error(`Error al obtener items con itemTypeId ${itemTypeId}`);
        }
    },

    /**
     * Obtiene items por el nombre del tipo de item.
     * @param {string} itemTypeName
     */
    getItemsByItemTypeName: async (itemTypeName) => {
        console.log(`Llamando a getItemsByItemTypeName(${itemTypeName})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byItemTypeName/${itemTypeName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByItemTypeName:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByItemTypeName:', error);
            throw new Error(`Error al obtener items con itemTypeName ${itemTypeName}`);
        }
    },

    /**
     * Obtiene un item por número de serie.
     * @param {string} serialNumber
     */
    getItemBySerialNumber: async (serialNumber) => {
        console.log(`Llamando a getItemBySerialNumber(${serialNumber})`);
        
        try {
            const response = await fetch(`${API_URL}/items/bySerialNumber/${serialNumber}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemBySerialNumber:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item recibido:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemBySerialNumber:', error);
            throw new Error(`Error al obtener item con serialNumber ${serialNumber}`);
        }
    },

    /**
     * Obtiene un item por código.
     * @param {string} code
     */
    getItemByCode: async (code) => {
        console.log(`Llamando a getItemByCode(${code})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byCode/${code}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemByCode:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item recibido:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemByCode:', error);
            throw new Error(`Error al obtener item con code ${code}`);
        }
    },

    /**
     * Obtiene items por ID del usuario asignado.
     * @param {number} assignedToId
     */
    getItemsByAssignedToId: async (assignedToId) => {
        console.log(`Llamando a getItemsByAssignedToId(${assignedToId})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byAssignedToId/${assignedToId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByAssignedToId:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByAssignedToId:', error);
            throw new Error(`Error al obtener items con assignedToId ${assignedToId}`);
        }
    },

    /**
     * Obtiene items por nombre del usuario asignado.
     * @param {string} assignedToFullName
     */
    getItemsByAssignedToFullName: async (assignedToFullName) => {
        console.log(`Llamando a getItemsByAssignedToFullName(${assignedToFullName})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byAssignedToFullName/${assignedToFullName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemsByAssignedToFullName:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemsByAssignedToFullName:', error);
            throw new Error(`Error al obtener items con assignedToFullName ${assignedToFullName}`);
        }
    },

    /**
     * Obtiene un item por ubicación.
     * @param {string} location
     */
    getItemByLocation: async (location) => {
        console.log(`Llamando a getItemByLocation(${location})`);
        
        try {
            const response = await fetch(`${API_URL}/items/byLocation/${location}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getItemByLocation:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item recibido:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en getItemByLocation:', error);
            throw new Error(`Error al obtener item con location ${location}`);
        }
    },

    /**
     * Crea un item.
     * Se recomienda enviar el dto sin el campo "status" (aunque si se envía, se ignora),
     * ya que el back se encarga de establecerlo en true al crear el item.
     * @param {Object} dto - Objeto con la información del item (ItemDTO).
     */
    createItem: async (dto) => {
        console.log("Llamando a createItem con datos:", dto);
        
        try {
            const response = await fetch(`${API_URL}/items/create`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto),
                mode: 'cors'
            });
            
            console.log("Respuesta de createItem:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item creado:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en createItem:', error);
            throw new Error('Error al crear el item');
        }
    },

    /**
     * Actualiza un item.
     * Se espera que el dto incluya el id y los demás campos actualizados, sin el campo "status".
     * @param {Object} dto - Objeto con la información actualizada del item (ItemDTO).
     */
    updateItem: async (dto) => {
        console.log("Llamando a updateItem con datos:", dto);
        
        try {
            const response = await fetch(`${API_URL}/items/update`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto),
                mode: 'cors'
            });
            
            console.log("Respuesta de updateItem:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item actualizado:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en updateItem:', error);
            throw new Error('Error al actualizar el item');
        }
    },

    /**
     * Cambia el estado de un item (habilitar/deshabilitar).
     * @param {number} id - ID del item.
     */
    changeItemStatus: async (id) => {
        console.log(`Llamando a changeItemStatus(${id})`);
        
        try {
            const response = await fetch(`${API_URL}/items/change-status/${id}`, {
                method: 'PUT',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de changeItemStatus:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item con estado cambiado:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en changeItemStatus:', error);
            throw new Error(`Error al cambiar el estado del item con ID ${id}`);
        }
    },

    /**
     * Obtiene todos los items activos.
     */
    getActiveItems: async () => {
        console.log("Llamando a getActiveItems()");
        
        try {
            const response = await fetch(`${API_URL}/items/active`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getActiveItems:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items activos recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item activo recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getActiveItems:', error);
            throw new Error('Error al obtener la lista de items activos');
        }
    },

    /**
     * Obtiene todos los items inactivos.
     */
    getInactiveItems: async () => {
        console.log("Llamando a getInactiveItems()");
        
        try {
            const response = await fetch(`${API_URL}/items/inactive`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getInactiveItems:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items inactivos recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item inactivo recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getInactiveItems:', error);
            throw new Error('Error al obtener la lista de items inactivos');
        }
    },

    /**
     * Desasigna un item (quita el usuario asignado).
     * @param {number} id - ID del item.
     */
    unassignItem: async (id) => {
        console.log(`Llamando a unassignItem(${id})`);
        
        try {
            const response = await fetch(`${API_URL}/items/${id}/unassign`, {
                method: 'PUT',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de unassignItem:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item desasignado:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en unassignItem:', error);
            throw new Error(`Error al desasignar el item con ID ${id}`);
        }
    },

    /**
     * Obtiene todos los items no asignados (assignedTo = null).
     * @returns {Promise<Array>} Lista de items no asignados.
     */
    getUnassignedItems: async () => {
        console.log('Llamando a getUnassignedItems()');
        
        try {
            const response = await fetch(`${API_URL}/items/unassigned`, {
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log("Respuesta de getUnassignedItems:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos de items no asignados recibidos:", result.result.length);
                // Revisar si los items tienen la información de usuario
                const sampleItem = result.result[0];
                if (sampleItem) {
                    console.log("Ejemplo de item no asignado recibido:", {
                        id: sampleItem.id,
                        name: sampleItem.name,
                        ownerId: sampleItem.ownerId,
                        owner: sampleItem.owner,
                        assignedToId: sampleItem.assignedToId,
                        assignedTo: sampleItem.assignedTo
                    });
                }
            }
            
            return result;
        } catch (error) {
            console.error('Error en getUnassignedItems:', error);
            throw new Error('Error al obtener los items no asignados');
        }
    },

    /**
     * Asigna un item a un usuario.
     * @param {number} itemId - ID del item a asignar.
     * @param {number} userId - ID del usuario al que se asignará el item.
     * @returns {Promise<Object>} Respuesta de la operación.
     */
    assignItem: async (itemId, userId) => {
        console.log(`Llamando a assignItem(itemId: ${itemId}, userId: ${userId})`);
        
        try {
            const response = await fetch(`${API_URL}/items/${itemId}/assign`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userId),
                mode: 'cors'
            });
            
            console.log("Respuesta de assignItem:", {
                status: response.status,
                statusText: response.statusText
            });
            
            const result = await handleResponse(response);
            
            if (result && result.result) {
                console.log("Datos del item asignado:", {
                    id: result.result.id,
                    name: result.result.name,
                    ownerId: result.result.ownerId,
                    owner: result.result.owner,
                    assignedToId: result.result.assignedToId,
                    assignedTo: result.result.assignedTo
                });
            }
            
            return result;
        } catch (error) {
            console.error('Error en assignItem:', error);
            throw new Error(`Error al asignar el item con ID ${itemId} al usuario con ID ${userId}`);
        }
    }
};
