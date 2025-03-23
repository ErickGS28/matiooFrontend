import { API_URL } from '../../constants.js';
import { getAuthHeader, handleResponse } from '../utils/authUtils.js';

export const getAllItemTypes = async () => {
    try {
        const response = await fetch(`${API_URL}/item-types/all`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getAllItemTypes:', error);
        throw error;
    }
};

export const getActiveItemTypes = async () => {
    try {
        const response = await fetch(`${API_URL}/item-types/active`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getActiveItemTypes:', error);
        throw error;
    }
};

export const getInactiveItemTypes = async () => {
    try {
        const response = await fetch(`${API_URL}/item-types/inactive`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getInactiveItemTypes:', error);
        throw error;
    }
};

export const getItemTypeById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/item-types/${id}`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getItemTypeById:', error);
        throw error;
    }
};

export const createItemType = async (name) => {
    try {
        const response = await fetch(`${API_URL}/item-types/save`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({ name })
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in createItemType:', error);
        throw error;
    }
};

export const updateItemType = async (id, name) => {
    try {
        const response = await fetch(`${API_URL}/item-types/update`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify({ id, name })
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in updateItemType:', error);
        throw error;
    }
};

export const changeItemTypeStatus = async (id) => {
    try {
        const response = await fetch(`${API_URL}/item-types/change-status/${id}`, {
            method: 'PUT',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error in changeItemTypeStatus:', error);
        throw error;
    }
};