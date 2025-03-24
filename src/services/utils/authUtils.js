// Authentication utility functions

/**
 * Gets the authentication header with the Bearer token
 * @returns {Object} Headers object with Authorization
 */
export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }
    // Asegurarse de que el token tenga el prefijo Bearer
    const formattedToken = token.startsWith('Bearer ') ? token.trim() : `Bearer ${token.trim()}`;
    console.log('Authorization header being sent:', formattedToken);
    return {
        'Authorization': formattedToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
};

/**
 * Handles the API response
 * @param {Response} response - The fetch response object
 * @returns {Promise<any>} The parsed response data
 * @throws {Error} If the response is not ok
 */
export const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }
    return response.json();
};

/**
 * Logs out the user by removing the authentication token from localStorage
 * @returns {void}
 */
export const logout = () => {
    localStorage.removeItem('token');
    console.log('User logged out, token removed from localStorage');
};