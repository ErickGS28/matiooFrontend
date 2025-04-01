import { API_URL } from '../../constants.js';
import { getAuthHeader, handleResponse } from '../utils/authUtils.js';

/**
 * Obtiene todos los modelos de ítems.
 */
export const getAllItemModels = async () => {
    try {
        const response = await fetch(`${API_URL}/item-models/all`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getAllItemModels:', error);
        throw new Error('Error al obtener todos los modelos de ítems');
    }
};

/**
 * Obtiene todos los modelos de ítems activos.
 */
export const getActiveItemModels = async () => {
    try {
        const response = await fetch(`${API_URL}/item-models/active`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getActiveItemModels:', error);
        throw new Error('Error al obtener los modelos de ítems activos');
    }
};

/**
 * Obtiene todos los modelos de ítems inactivos.
 */
export const getInactiveItemModels = async () => {
    try {
        const response = await fetch(`${API_URL}/item-models/inactive`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getInactiveItemModels:', error);
        throw new Error('Error al obtener los modelos de ítems inactivos');
    }
};

/**
 * Obtiene un modelo de ítem por su ID.
 * @param {number} id - ID del modelo de ítem.
 */
export const getItemModelById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/item-models/${id}`, {
            method: 'GET',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en getItemModelById:', error);
        throw new Error(`Error al obtener el modelo de ítem con ID ${id}`);
    }
};

/**
 * Crea un modelo de ítem sin imagen.
 * @param {string} name - Nombre del modelo.
 */
export const createItemModel = async (name) => {
    try {
        const response = await fetch(`${API_URL}/item-models/save`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ name })
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en createItemModel:', error);
        throw new Error('Error al crear el modelo de ítem sin imagen');
    }
};

/**
 * Crea un modelo de ítem con imagen (usando form-data).
 * @param {Object} dto - Objeto con los datos del modelo (ej. { name: "Modelo Miami" }).
 * @param {File} imageFile - Archivo de imagen (opcional).
 */
export const createItemModelWithImage = async (dto, imageFile) => {
    try {
      const formData = new FormData();
  
      // En lugar de simplemente append('dto', JSON.stringify(dto))
      // creamos un Blob con type 'application/json'
      const dtoBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
      formData.append('dto', dtoBlob, 'dto.json');
  
      // Verificamos que la imagen tenga type. Si no, se lo asignamos.
      if (imageFile) {
        const fileType = imageFile.type || 'image/png'; // Ajusta según tu caso
        const fileWithType = new File([imageFile], imageFile.name, { type: fileType });
        formData.append('image', fileWithType);
      }
  
      // Eliminamos Content-Type de los headers de autenticación
      const authHeaders = getAuthHeader();
      delete authHeaders['Content-Type'];
  
      const response = await fetch(`${API_URL}/item-models/save-with-image`, {
        method: 'POST',
        headers: authHeaders,
        mode: 'cors',
        body: formData
      });
  
      return handleResponse(response);
    } catch (error) {
      console.error('Error en createItemModelWithImage:', error);
      throw new Error('Error al crear el modelo de ítem con imagen');
    }
  };
  

/**
 * Actualiza un modelo de ítem.
 * @param {number} id - ID del modelo a actualizar.
 * @param {string} name - Nuevo nombre del modelo.
 */
export const updateItemModel = async (id, name) => {
    try {
        const response = await fetch(`${API_URL}/item-models/update`, {
            method: 'PUT',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ id, name })
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en updateItemModel:', error);
        throw new Error('Error al actualizar el modelo de ítem');
    }
};

/**
 * Actualiza un modelo de ítem con imagen.
 * @param {Object} dto - Objeto con los datos del modelo (id y name).
 * @param {File} imageFile - Archivo de imagen (opcional).
 */
export const updateItemModelWithImage = async (dto, imageFile) => {
  try {
    const formData = new FormData();

    // Creamos un Blob con type 'application/json'
    const dtoBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
    formData.append('dto', dtoBlob, 'dto.json');

    // Verificamos que la imagen tenga type. Si no, se lo asignamos.
    if (imageFile) {
      const fileType = imageFile.type || 'image/png';
      const fileWithType = new File([imageFile], imageFile.name, { type: fileType });
      formData.append('image', fileWithType);
    }

    // Eliminamos Content-Type de los headers de autenticación
    const authHeaders = getAuthHeader();
    delete authHeaders['Content-Type'];

    const response = await fetch(`${API_URL}/item-models/update-with-image`, {
      method: 'PUT',
      headers: authHeaders,
      mode: 'cors',
      body: formData
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error en updateItemModelWithImage:', error);
    throw new Error('Error al actualizar el modelo de ítem con imagen');
  }
};

/**
 * Obtiene la URL de la imagen de un modelo por su ID.
 * @param {number} id - ID del modelo.
 * @returns {string} URL de la imagen.
 */
export const getItemModelImageUrl = (id) => {
  return `${API_URL}/item-models/image/${id}`;
};

/**
 * Cambia el estado de un modelo de ítem.
 * @param {number} id - ID del modelo.
 */
export const changeItemModelStatus = async (id) => {
    try {
        const response = await fetch(`${API_URL}/item-models/change-status/${id}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            mode: 'cors'
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en changeItemModelStatus:', error);
        throw new Error('Error al cambiar el estado del modelo de ítem');
    }
};
