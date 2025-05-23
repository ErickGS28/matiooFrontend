import { API_URL } from '../../constants.js';
import { getAuthHeader, handleResponse } from '../utils/authUtils.js';

// Function to get all brands
export const getAllBrands = async () => {
    try {
        const response = await fetch(`${API_URL}/brands/all`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });

        return handleResponse(response);

    } catch (error) {
        console.error('Error in getAllBrands:', error);
        throw error;
    }
};

// Function to get active brands
export const getActiveBrands = async () => {
    try {
        const response = await fetch(`${API_URL}/brands/active`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in getActiveBrands:', error);
        throw error;
    }
};

// Function to get inactive brands
export const getInactiveBrands = async () => {
    try {
        const response = await fetch(`${API_URL}/brands/inactive`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in getInactiveBrands:', error);
        throw error;
    }
};

// Function to get a brand by ID
export const getBrandById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/brands/${id}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in getBrandById:', error);
        throw error;
    }
};

// Function to create a new brand
export const createBrand = async (brandName) => {
    try {
        const response = await fetch(`${API_URL}/brands/save`, {
            method: 'POST',
            headers: getAuthHeader(),
            mode: 'cors',
            body: JSON.stringify({ name: brandName })
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in createBrand:', error);
        throw error;
    }
};

// Function to update a brand
export const updateBrand = async (id, name) => {
    try {
        const response = await fetch(`${API_URL}/brands/update`, {
            method: 'PUT',
            headers: getAuthHeader(),
            mode: 'cors',
            body: JSON.stringify({ id, name })
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in updateBrand:', error);
        throw error;
    }
};

// Function to change brand status
export const changeBrandStatus = async (id) => {
    try {
        const response = await fetch(`${API_URL}/brands/change-status/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            mode: 'cors'
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in changeBrandStatus:', error);
        throw error;
    }
};
