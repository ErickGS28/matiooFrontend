import { API_URL } from '../../constants.js';
import { handleResponse, getAuthHeader } from '../utils/authUtils.js';

// Function to get all users
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users/all`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al obtener todos los usuarios');
    }
};

// Function to get active users
export const getActiveUsers = async () => {
    try {
        console.log('Fetching active users...');
        
        const response = await fetch(`${API_URL}/users/active`, {
            method: 'GET',
            headers: getAuthHeader()
        });
        
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getActiveUsers:', error);
        throw error;
    }
};

// Function to get inactive users
export const getInactiveUsers = async () => {
    try {
        console.log('Fetching inactive users...');
        
        const response = await fetch(`${API_URL}/users/inactive`, {
            method: 'GET',
            headers: getAuthHeader()
        });
        
        return handleResponse(response);
    } catch (error) {
        console.error('Error in getInactiveUsers:', error);
        throw error;
    }
};

// Function to get a user by ID
export const getUserById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al obtener el usuario');
    }
};

// Function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/save`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: userData.fullName,
                username: userData.username,
                password: userData.password,
                email: userData.email,
                location: userData.location,
                role: userData.role
            })
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al crear el usuario');
    }
};

// Function to update a user
export const updateUser = async (id, userData) => {
    try {
        if (!id) throw new Error('ID cannot be null');
        if (!userData.fullName) throw new Error('Full name cannot be empty');
        if (!userData.username) throw new Error('Username cannot be empty');
        if (!userData.email) throw new Error('Email cannot be empty');
        if (!userData.location) throw new Error('Location cannot be empty');
        if (!userData.role) throw new Error('Role cannot be null');

        const response = await fetch(`${API_URL}/users/update`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify({
                id: id,
                fullName: userData.fullName,
                username: userData.username,
                email: userData.email,
                location: userData.location,
                role: userData.role
            })
        });

        return handleResponse(response);
    } catch (error) {
        console.error('Error in updateUser:', error);
        throw error;
    }
};

// Function to update user profile
export const updateUserProfile = async (profileData) => {
    try {
        const response = await fetch(`${API_URL}/users/update-profile`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: profileData.id,
                fullName: profileData.fullName,
                username: profileData.username,
                email: profileData.email,
                location: profileData.location
            })
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al actualizar el perfil del usuario');
    }
};

// Function to change user status
export const changeUserStatus = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/change-status/${id}`, {
            method: 'PUT',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al cambiar el estado del usuario');
    }
};