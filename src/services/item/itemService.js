import { API_URL } from '../../constants.js';
import { getAuthHeader, handleResponse } from '../utils/authUtils.js';

/**
 * Obtiene todos los items.
 */
export const getAllItems = async () => {
    try {
        const response = await fetch(`${API_URL}/items/all`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getAllItems:', error);
        throw new Error('Error al obtener la lista de items');
    }
};

/**
 * Obtiene un item por su ID.
 * @param {number} id
 */
export const getItemById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/items/id/${id}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemById:', error);
        throw new Error(`Error al obtener el item con ID ${id}`);
    }
};

/**
 * Obtiene items por el ID del modelo.
 * @param {number} modelId
 */
export const getItemsByModelId = async (modelId) => {
    try {
        const response = await fetch(`${API_URL}/items/byModelId/${modelId}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByModelId:', error);
        throw new Error(`Error al obtener items con modelId ${modelId}`);
    }
};

/**
 * Obtiene items por el nombre del modelo.
 * @param {string} modelName
 */
export const getItemsByModelName = async (modelName) => {
    try {
        const response = await fetch(`${API_URL}/items/byModelName/${modelName}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByModelName:', error);
        throw new Error(`Error al obtener items con modelName ${modelName}`);
    }
};

/**
 * Obtiene items por el ID de la marca.
 * @param {number} brandId
 */
export const getItemsByBrandId = async (brandId) => {
    try {
        const response = await fetch(`${API_URL}/items/byBrandId/${brandId}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByBrandId:', error);
        throw new Error(`Error al obtener items con brandId ${brandId}`);
    }
};

/**
 * Obtiene items por el nombre de la marca.
 * @param {string} brandName
 */
export const getItemsByBrandName = async (brandName) => {
    try {
        const response = await fetch(`${API_URL}/items/byBrandName/${brandName}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByBrandName:', error);
        throw new Error(`Error al obtener items con brandName ${brandName}`);
    }
};

/**
 * Obtiene items por el ID del tipo de item.
 * @param {number} itemTypeId
 */
export const getItemsByItemTypeId = async (itemTypeId) => {
    try {
        const response = await fetch(`${API_URL}/items/byItemTypeId/${itemTypeId}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByItemTypeId:', error);
        throw new Error(`Error al obtener items con itemTypeId ${itemTypeId}`);
    }
};

/**
 * Obtiene items por el nombre del tipo de item.
 * @param {string} itemTypeName
 */
export const getItemsByItemTypeName = async (itemTypeName) => {
    try {
        const response = await fetch(`${API_URL}/items/byItemTypeName/${itemTypeName}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByItemTypeName:', error);
        throw new Error(`Error al obtener items con itemTypeName ${itemTypeName}`);
    }
};

/**
 * Obtiene un item por número de serie.
 * @param {string} serialNumber
 */
export const getItemBySerialNumber = async (serialNumber) => {
    try {
        const response = await fetch(`${API_URL}/items/bySerialNumber/${serialNumber}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemBySerialNumber:', error);
        throw new Error(`Error al obtener item con serialNumber ${serialNumber}`);
    }
};

/**
 * Obtiene un item por código.
 * @param {string} code
 */
export const getItemByCode = async (code) => {
    try {
        const response = await fetch(`${API_URL}/items/byCode/${code}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemByCode:', error);
        throw new Error(`Error al obtener item con code ${code}`);
    }
};

/**
 * Obtiene items por ID del usuario asignado.
 * @param {number} assignedToId
 */
export const getItemsByAssignedToId = async (assignedToId) => {
    try {
        const response = await fetch(`${API_URL}/items/byAssignedToId/${assignedToId}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByAssignedToId:', error);
        throw new Error(`Error al obtener items con assignedToId ${assignedToId}`);
    }
};

/**
 * Obtiene items por nombre del usuario asignado.
 * @param {string} assignedToFullName
 */
export const getItemsByAssignedToFullName = async (assignedToFullName) => {
    try {
        const response = await fetch(`${API_URL}/items/byAssignedToFullName/${assignedToFullName}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemsByAssignedToFullName:', error);
        throw new Error(`Error al obtener items con assignedToFullName ${assignedToFullName}`);
    }
};

/**
 * Obtiene un item por ubicación.
 * @param {string} location
 */
export const getItemByLocation = async (location) => {
    try {
        const response = await fetch(`${API_URL}/items/byLocation/${location}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemByLocation:', error);
        throw new Error(`Error al obtener item con location ${location}`);
    }
};

/**
 * Crea un item.
 * Se recomienda enviar el dto sin el campo "status" (aunque si se envía, se ignora),
 * ya que el back se encarga de establecerlo en true al crear el item.
 * @param {Object} dto - Objeto con la información del item (ItemDTO).
 */
export const createItem = async (dto) => {
    try {
        // Extraemos el campo status (si existe) para no enviarlo
        const { status, ...payload } = dto;
        const response = await fetch(`${API_URL}/items/create`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(payload)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en createItem:', error);
        throw new Error('Error al crear el item');
    }
};

/**
 * Actualiza un item.
 * Se espera que el dto incluya el id y los demás campos actualizados, sin el campo "status".
 * @param {Object} dto - Objeto con la información actualizada del item (ItemDTO).
 */
export const updateItem = async (dto) => {
    try {
        const response = await fetch(`${API_URL}/items/update`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(dto)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en updateItem:', error);
        throw new Error('Error al actualizar el item');
    }
};

/**
 * Cambia el estado de un item (habilitar/deshabilitar).
 * @param {number} id - ID del item.
 */
export const changeItemStatus = async (id) => {
    try {
        const response = await fetch(`${API_URL}/items/change-status/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en changeItemStatus:', error);
        throw new Error('Error al cambiar el estado del item');
    }
};

/**
 * Obtiene todos los items activos.
 */
export const getActiveItems = async () => {
    try {
        const response = await fetch(`${API_URL}/items/active`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getActiveItems:', error);
        throw new Error('Error al obtener items activos');
    }
};

/**
 * Obtiene todos los items inactivos.
 */
export const getInactiveItems = async () => {
    try {
        const response = await fetch(`${API_URL}/items/inactive`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getInactiveItems:', error);
        throw new Error('Error al obtener items inactivos');
    }
};

/**
 * Asigna un item a un usuario.
 * @param {number} id - ID del item.
 * @param {number} userId - ID del usuario al que se asigna.
 */
export const assignItem = async (id, userId) => {
    try {
        const response = await fetch(`${API_URL}/items/${id}/assign`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(userId)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en assignItem:', error);
        throw new Error('Error al asignar el item');
    }
};

/**
 * Desasigna un item (quita el usuario asignado).
 * @param {number} id - ID del item.
 */
export const unassignItem = async (id) => {
    try {
        const response = await fetch(`${API_URL}/items/${id}/unassign`, {
            method: 'PUT',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en unassignItem:', error);
        throw new Error('Error al desasignar el item');
    }
};
