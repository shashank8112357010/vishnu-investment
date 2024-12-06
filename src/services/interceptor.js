import axios from "axios";
import { jwtDecode } from "jwt-decode";

// API Base URL
const API_URL = "https://actl.co.in/vishnu";
// const API_URL = "http://localhost:5444/vishnu"

// Create Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Utility function to decode the JWT token and check if it's expired
const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decodedToken.exp < currentTime; // Return true if expired
    } catch (error) {
        console.error("Error decoding token", error);
        return true; // Consider token expired if decoding fails
    }
};

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        // If token exists, add it to the Authorization header
        if (token && !isTokenExpired(token)) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else if (token && isTokenExpired(token)) {
            // Token expired, handle auto-logout
            console.error("Token expired. Logging out...");
            localStorage.removeItem("token"); // Remove expired token
            window.location.href = "/login"; // Redirect to login page
            return Promise.reject(new Error("Token expired")); // Prevent further API calls
        }

        // If the request is multipart/form-data, Axios will handle the content type automatically.
        if (config.headers['Content-Type'] === 'multipart/form-data') {
            delete config.headers['Content-Type']; // Allow Axios to set the correct Content-Type for multipart
        }

        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Handle successful response
        return response;
    },
    (error) => {
        // Handle response error globally
        if (error.response && error.response.status === 401) {
            // Unauthorized, likely due to token expiration
            console.error("Unauthorized! Logging out...");
            localStorage.removeItem("token"); // Remove token from storage
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default apiClient;
