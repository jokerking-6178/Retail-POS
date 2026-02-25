import apiClient from "./apiConfig";

export const login  = async (data) => {
    try {
    console.log("Attempting login with:", { email: data.email });
    
    const response = await apiClient.post("/api/v1.0/login", {
      email: data.email,
      password: data.password
    });
    
    console.log("Login successful:", response.data);
    
    // Store token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    }
    
    return response;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
}