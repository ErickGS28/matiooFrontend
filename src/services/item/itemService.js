import { API_URL } from '../../constants.js';
import { getAuthHeader, handleResponse } from '../utils/authUtils.js';

export const itemService = {
    /**
     * Obtiene todos los items.
     */
    getAllItems: async () => {
        try {
            const response = await fetch(`${API_URL}/items/all`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error('Error al obtener la lista de items');
        }
    },

    /**
     * Obtiene un item por su ID.
     * @param {number} id
     */
    getItemById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/items/id/${id}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener el item con ID ${id}`);
        }
    },

    /**
     * Obtiene items por el ID del modelo.
     * @param {number} modelId
     */
    getItemsByModelId: async (modelId) => {
        try {
            const response = await fetch(`${API_URL}/items/byModelId/${modelId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con modelId ${modelId}`);
        }
    },

    /**
     * Obtiene items por el nombre del modelo.
     * @param {string} modelName
     */
    getItemsByModelName: async (modelName) => {
        try {
            const response = await fetch(`${API_URL}/items/byModelName/${modelName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con modelName ${modelName}`);
        }
    },

    /**
     * Obtiene items por el ID de la marca.
     * @param {number} brandId
     */
    getItemsByBrandId: async (brandId) => {
        try {
            const response = await fetch(`${API_URL}/items/byBrandId/${brandId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con brandId ${brandId}`);
        }
    },

    /**
     * Obtiene items por el nombre de la marca.
     * @param {string} brandName
     */
    getItemsByBrandName: async (brandName) => {
        try {
            const response = await fetch(`${API_URL}/items/byBrandName/${brandName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con brandName ${brandName}`);
        }
    },

    /**
     * Obtiene items por el ID del tipo de item.
     * @param {number} itemTypeId
     */
    getItemsByItemTypeId: async (itemTypeId) => {
        try {
            const response = await fetch(`${API_URL}/items/byItemTypeId/${itemTypeId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con itemTypeId ${itemTypeId}`);
        }
    },

    /**
     * Obtiene items por el nombre del tipo de item.
     * @param {string} itemTypeName
     */
    getItemsByItemTypeName: async (itemTypeName) => {
        try {
            const response = await fetch(`${API_URL}/items/byItemTypeName/${itemTypeName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con itemTypeName ${itemTypeName}`);
        }
    },

    /**
     * Obtiene un item por número de serie.
     * @param {string} serialNumber
     */
    getItemBySerialNumber: async (serialNumber) => {
        try {
            const response = await fetch(`${API_URL}/items/bySerialNumber/${serialNumber}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener item con serialNumber ${serialNumber}`);
        }
    },

    /**
     * Obtiene un item por código.
     * @param {string} code
     */
    getItemByCode: async (code) => {
        try {
            const response = await fetch(`${API_URL}/items/byCode/${code}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener item con code ${code}`);
        }
    },

    /**
     * Obtiene items por ID del usuario asignado.
     * @param {number} assignedToId
     */
    getItemsByAssignedToId: async (assignedToId) => {
        try {
            console.log(`Obteniendo items asignados al usuario con ID: ${assignedToId}`);
            
            const response = await fetch(`${API_URL}/items/byAssignedToId/${assignedToId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            console.log(`Respuesta del servidor para getItemsByAssignedToId: ${response.status}`);
            
            // Si el servidor devuelve 404 o 403, significa que no hay items para este usuario o no tiene permisos
            // En lugar de lanzar un error, devolvemos un array vacío
            if (response.status === 404 || response.status === 403) {
                console.warn(`No se encontraron items asignados al usuario con ID ${assignedToId} o no tiene permisos`);
                return { result: [] };
            }
            
            const result = await handleResponse(response);
            console.log('Resultado de getItemsByAssignedToId:', result);
            return result;
        } catch (error) {
            console.error(`Error al obtener items asignados al usuario con ID ${assignedToId}:`, error);
            // En caso de error, devolvemos un objeto con un array vacío para mantener consistencia
            return { result: [] };
        }
    },

    /**
     * Obtiene items por nombre del usuario asignado.
     * @param {string} assignedToFullName
     */
    getItemsByAssignedToFullName: async (assignedToFullName) => {
        try {
            const response = await fetch(`${API_URL}/items/byAssignedToFullName/${assignedToFullName}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con assignedToFullName ${assignedToFullName}`);
        }
    },

    /**
     * Obtiene un item por ubicación.
     * @param {string} location
     */
    getItemByLocation: async (location) => {
        try {
            const response = await fetch(`${API_URL}/items/byLocation/${location}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener item con location ${location}`);
        }
    },

    /**
     * Obtiene items por ID del propietario (owner).
     * @param {number} ownerId
     */
    getItemsByOwnerId: async (ownerId) => {
        try {
            const response = await fetch(`${API_URL}/items/byOwnerId/${ownerId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            // Si el servidor devuelve 404, significa que no hay items para este propietario
            // En lugar de lanzar un error, devolvemos un array vacío
            if (response.status === 404) {
                return { result: [] };
            }
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener items con ownerId ${ownerId}`);
        }
    },

    /**
     * Crea un item.
     * Se recomienda enviar el dto sin el campo "status" (aunque si se envía, se ignora),
     * ya que el back se encarga de establecerlo en true al crear el item.
     * @param {Object} dto - Objeto con la información del item (ItemDTO).
     */
    createItem: async (dto) => {
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
            
            // Obtener el cuerpo de la respuesta como JSON, independientemente del status code
            const data = await response.json();
            
            // Devolver la respuesta completa, incluso si es un error
            return data;
        } catch (error) {
            // Si ocurre un error al hacer la petición o procesar la respuesta
            console.error('Error en createItem:', error);
            return {
                type: 'ERROR',
                text: error.message || 'Error al crear el item'
            };
        }
    },

    /**
     * Actualiza un item.
     * Se espera que el dto incluya el id y los demás campos actualizados, sin el campo "status".
     * @param {Object} dto - Objeto con la información actualizada del item (ItemDTO).
     */
    updateItem: async (dto) => {
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
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el item');
        }
    },

    /**
     * Cambia el estado de un item (habilitar/deshabilitar).
     * @param {number} id - ID del item.
     */
    changeItemStatus: async (id) => {
        try {
            const response = await fetch(`${API_URL}/items/change-status/${id}`, {
                method: 'PUT',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al cambiar el estado del item con ID ${id}`);
        }
    },

    /**
     * Obtiene todos los items activos.
     */
    getActiveItems: async () => {
        try {
            const response = await fetch(`${API_URL}/items/active`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error('Error al obtener la lista de items activos');
        }
    },

    /**
     * Obtiene todos los items inactivos.
     */
    getInactiveItems: async () => {
        try {
            const response = await fetch(`${API_URL}/items/inactive`, {
                method: 'GET',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error('Error al obtener la lista de items inactivos');
        }
    },

    /**
     * Desasigna un item (quita el usuario asignado).
     * @param {number} id - ID del item.
     */
    unassignItem: async (id) => {
        try {
            const response = await fetch(`${API_URL}/items/${id}/unassign`, {
                method: 'PUT',
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al desasignar el item con ID ${id}`);
        }
    },

    /**
     * Obtiene todos los items no asignados (assignedTo = null).
     * @returns {Promise<Array>} Lista de items no asignados.
     */
    getUnassignedItems: async () => {
        try {
            const response = await fetch(`${API_URL}/items/unassigned`, {
                headers: getAuthHeader(),
                mode: 'cors'
            });
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
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
            
            const result = await handleResponse(response);
            return result;
        } catch (error) {
            throw new Error(`Error al asignar el item con ID ${itemId} al usuario con ID ${userId}`);
        }
    }
};
