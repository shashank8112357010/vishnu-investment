import axios from "axios";

// API Base URL
// const API_URL = import.meta.env.VITE_API_URL
const API_URL = "https://actl.co.in/vishnu"

// Create Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add Authorization token if available
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
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
            // For example, logout the user if token expired
            console.error("Unauthorized! Logging out...");
            localStorage.removeItem("token"); // Remove token from storage
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default apiClient;
