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

// Function to create a new model with image
export const createModelWithImage = async (dto, imageFile) => {
    try {
        console.log(`Creating new model with image...`);

        const formData = new FormData();

        // Create a Blob with type 'application/json'
        const dtoBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
        formData.append('dto', dtoBlob, 'dto.json');

        // Add the image file if provided
        if (imageFile) {
            const fileType = imageFile.type || 'image/png';
            const fileWithType = new File([imageFile], imageFile.name, { type: fileType });
            formData.append('image', fileWithType);
        }

        // Remove Content-Type from auth headers
        const authHeaders = getAuthHeader();
        delete authHeaders['Content-Type'];

        const response = await fetch(`${API_URL}/item-models/save-with-image`, {
            method: 'POST',
            headers: authHeaders,
            body: formData
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in createModelWithImage:', error);
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

// Function to update a model with image
export const updateModelWithImage = async (dto, imageFile) => {
    try {
        console.log(`Updating model with ID ${dto.id} with image...`);

        const formData = new FormData();

        // Create a Blob with type 'application/json'
        const dtoBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
        formData.append('dto', dtoBlob, 'dto.json');

        // Add the image file if provided
        if (imageFile) {
            const fileType = imageFile.type || 'image/png';
            const fileWithType = new File([imageFile], imageFile.name, { type: fileType });
            formData.append('image', fileWithType);
        }

        // Remove Content-Type from auth headers
        const authHeaders = getAuthHeader();
        delete authHeaders['Content-Type'];

        const response = await fetch(`${API_URL}/item-models/update-with-image`, {
            method: 'PUT',
            headers: authHeaders,
            body: formData
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in updateModelWithImage:', error);
        throw error;
    }
};

// Function to get model image URL
export const getModelImageUrl = (id) => {
    const token = localStorage.getItem('token');
    return `${API_URL}/item-models/image/${id}?token=${token}`;
};

// Function to fetch model image with authentication
export const fetchModelImage = async (id) => {
    try {
        const response = await fetch(`${API_URL}/item-models/image/${id}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        
        // Si la respuesta no es exitosa, simplemente devolvemos la imagen por defecto
        // en lugar de lanzar un error
        if (!response.ok) {
            console.log(`No se encontró imagen para el modelo ${id}, usando imagen por defecto`);
            return "/defaultModel.png";
        }
        
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error fetching model image:", error);
        return "/defaultModel.png"; // Return default image path on error
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
