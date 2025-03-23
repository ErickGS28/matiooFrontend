import { API_URL } from '../../constants.js';
import { getAuthHeader, handleResponse } from '../utils/authUtils.js';

// Function to get all models
export const getAllModels = async () => {
    try {
        console.log('Ejecutando getAllModels...');

        const response = await fetch(`${API_URL}/item-models/all`, {
            headers: getAuthHeader()
        });

        return handleResponse(response);

    } catch (error) {
        console.error('Error in getAllModels:', error);
        throw error;
    }
};

// Function to get active models
export const getActiveModels = async () => {
    try {
        console.log('Ejecutando getActiveModels...');

        const response = await fetch(`${API_URL}/item-models/active`, {
            headers: getAuthHeader()
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in getActiveModels:', error);
        throw error;
    }
};

// Function to get inactive models
export const getInactiveModels = async () => {
    try {
        console.log('Ejecutando getInactiveModels...');

        const response = await fetch(`${API_URL}/item-models/inactive`, {
            headers: getAuthHeader()
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in getInactiveModels:', error);
        throw error;
    }
};

// Function to get a model by ID
export const getModelById = async (id) => {
    try {
        console.log(`Ejecutando getModelById con id: ${id}...`);

        const response = await fetch(`${API_URL}/item-models/${id}`, {
            headers: getAuthHeader()
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in getModelById:', error);
        throw error;
    }
};

// Function to create a new model
export const createModel = async (name) => {
    try {
        console.log(`Creating new model with name: ${name}...`);

        const response = await fetch(`${API_URL}/item-models/save`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in createModel:', error);
        throw error;
    }
};

// Function to update a model
export const updateModel = async (id, name) => {
    try {
        console.log(`Updating model with ID ${id} to name: ${name}...`);

        const response = await fetch(`${API_URL}/item-models/update`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name })
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in updateModel:', error);
        throw error;
    }
};

// Function to change model status
export const changeModelStatus = async (id) => {
    try {
        console.log(`Changing status for model with ID: ${id}...`);

        const response = await fetch(`${API_URL}/item-models/change-status/${id}`, {
            method: 'PUT',
            headers: getAuthHeader()
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in changeModelStatus:', error);
        throw error;
    }
};
