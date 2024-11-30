
import apiClient from "./interceptor"; // Adjust the path based on your file structure

// Register User API
export const RegisterUser = (data) => {
    return apiClient.post("/register", data);
};

// Login User API
export const LoginUser = (data) => {
    return apiClient.post("/login", data);
};


export const depositPayment = async (data, file) => {
    // Create a FormData object
    const formData = new FormData();
    
    // Append the required fields to the FormData object
    formData.append("amount", data.amount);
    formData.append("transactionId", data.transactionId);
    formData.append("transactionImage", file); // File to be uploaded
    
    // If you have any other fields (like 'dob', etc.), append them here
    // formData.append("dob", data.dob);
    
    try {
        // Send the request using the POST method, sending FormData as the body
        const response = await apiClient.post("/deposit", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // This is optional as Axios will set it automatically
            }
        });
        return response.data;
    } catch (error) {
        console.error("Deposit Payment Error:", error);
        throw error;
    }
};

