import apiClient from "./apiConfig";

export const fetchDashboardData = async () => {
    return await apiClient.get("/api/v1.0/dashboard")
}