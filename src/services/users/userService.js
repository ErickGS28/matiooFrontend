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
        console.log("Datos enviados a la API:", userData);
        
        // Usar la ruta correcta según el controlador Spring Boot
        const response = await fetch(`${API_URL}/users/save`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        // Verificar si la respuesta es vacía
        const text = await response.text();
        console.log("Respuesta del servidor (texto):", text);
        
        let responseData;
        try {
            // Intentar parsear como JSON solo si hay contenido
            responseData = text ? JSON.parse(text) : {};
            console.log("Respuesta del servidor (parseada):", responseData);
        } catch (parseError) {
            console.error("Error al parsear la respuesta:", parseError);
            responseData = { message: text || "No se recibió respuesta del servidor" };
        }
        
        if (!response.ok) {
            throw new Error(`Error: ${responseData.message || `Error ${response.status}: ${response.statusText}`}`);
        }
        
        return responseData;
    } catch (error) {
        console.error("Error en createUser:", error);
        throw error;
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


// 🔐 Recuperar contraseña

export const sendRecoveryCode = async (email) => {
    try {
      const response = await fetch(`${API_URL}/users/send-recovery-code/${email}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // 👈 evitar error JSON si es texto
        throw new Error(errorText || `Error ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Respuesta del backend:", result);
      return result;
    } catch (error) {
      console.error("Error en sendRecoveryCode:", error);
      throw new Error('Error al enviar el código de recuperación');
    }
  };
  

export const verifyRecoveryCode = async (email, code) => {
    try {
        const response = await fetch(`${API_URL}/users/verify-recovery-code`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, code })
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al verificar el código de recuperación');
    }
};

export const resetPassword = async (email, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/users/reset-password`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newPassword })
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al resetear la contraseña');
    }
};

export const changePassword = async (oldPassword, newPassword) => {
    try {
        const response = await fetch(`${API_URL}/users/change-password`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error('Error al cambiar la contraseña');
    }
};
