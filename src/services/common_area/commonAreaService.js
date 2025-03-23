import { API_URL } from '@/constants';
import { getAuthHeader, handleResponse } from '../utils/authUtils';

/**
 * Get all common areas
 * @returns {Promise<Array>} List of all common areas
 */
export const getAllCommonAreas = async () => {
    try {
        const response = await fetch(`${API_URL}/commonareas/all`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching all common areas:', error);
        throw new Error('Error al obtener todas las áreas comunes');
    }
};

/**
 * Get active common areas
 * @returns {Promise<Array>} List of active common areas
 */
export const getActiveCommonAreas = async () => {
    try {
        const response = await fetch(`${API_URL}/commonareas/active`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching active common areas:', error);
        throw new Error('Error al obtener las áreas comunes activas');
    }
};

/**
 * Get inactive common areas
 * @returns {Promise<Array>} List of inactive common areas
 */
export const getInactiveCommonAreas = async () => {
    try {
        const response = await fetch(`${API_URL}/commonareas/inactive`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching inactive common areas:', error);
        throw new Error('Error al obtener las áreas comunes inactivas');
    }
};

/**
 * Get a common area by ID
 * @param {number} id - ID of the common area
 * @returns {Promise<Object>} Common area
 */
export const getCommonAreaById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/commonareas/${id}`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching common area:', error);
        throw new Error('Error al obtener el área común');
    }
};

/**
 * Create a new common area
 * @param {string} name - Name of the common area
 * @returns {Promise<Object>} Created common area
 */
export const createCommonArea = async (name) => {
    try {
        const response = await fetch(`${API_URL}/commonareas/save`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({ name })
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error creating common area:', error);
        throw new Error('Error al crear el área común');
    }
};

/**
 * Update a common area
 * @param {number} id - ID of the common area
 * @param {string} name - New name for the common area
 * @returns {Promise<Object>} Updated common area
 */
export const updateCommonArea = async (id, name) => {
    try {
        const response = await fetch(`${API_URL}/commonareas/update`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader()
            },
            body: JSON.stringify({ id, name })
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error updating common area:', error);
        throw new Error('Error al actualizar el área común');
    }
};

/**
 * Change the status of a common area
 * @param {number} id - ID of the common area
 * @returns {Promise<Object>} Updated common area
 */
export const changeCommonAreaStatus = async (id) => {
    try {
        const response = await fetch(`${API_URL}/commonareas/change-status/${id}`, {
            method: 'PUT',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error changing common area status:', error);
        throw new Error('Error al cambiar el estado del área común');
    }
};