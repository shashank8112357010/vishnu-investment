
import apiClient from "./interceptor"; // Adjust the path based on your file structure

// Register User API
export const RegisterUser = (data) => {
    return apiClient.post("/register", data);
};

// Login User API
export const LoginUser = (data) => {
    return apiClient.post("/login", data);
};

