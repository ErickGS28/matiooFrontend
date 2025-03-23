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
    // Token is already formatted with Bearer prefix from authService.js
    const formattedToken = token.trim();
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