// services/api.js
import axiosInstance from './axiosinstance';

const apiCall = async (method: any, url: any, data = null, config = {}) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            ...config,
        });
        return response.data;
    } catch (error) {
        // Handle error (log it, display a message, etc.)
        console.error('API call error:', error);
        // throw error;
        return error
    }
};

export default apiCall;
