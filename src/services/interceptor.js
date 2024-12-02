import axios from "axios";

// API Base URL
const API_URL = "https://actl.co.in/vishnu"
// const API_URL = "http://localhost:5444/vishnu"


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
            // For example, logout the user if token expired
            console.error("Unauthorized! Logging out...");
            localStorage.removeItem("token"); // Remove token from storage
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default apiClient;
