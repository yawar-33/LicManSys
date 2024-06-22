// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/", // Use an environment variable for the base URL
    timeout: 10000, // Set a default timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optionally, you can set up interceptors for requests and responses
axiosInstance.interceptors.request.use(
    config => {
        // Do something before the request is sent, e.g., add authentication tokens
        return config;
    },
    error => {
        // Do something with the request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
