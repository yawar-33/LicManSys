// utils/axiosInstance.js
import axios from 'axios';
import { getItem } from './function';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7222/',
    timeout: 10000, // Set a default timeout for requests
    headers: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': '6000',
        'Access-Control-Allow-Headers': '*',
    },
});

// Optionally, you can set up interceptors for requests and responses
axiosInstance.interceptors.request.use(
    config => {
        // Do something before the request is sent, e.g., add authentication tokens
        const token = getItem("tokendata").token; // Get the token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
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
