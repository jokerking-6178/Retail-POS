import apiClient from "./apiConfig";

export const lastestOrders = async () => {
    return await apiClient.get("/api/v1.0/orders/latest")
}

export const createOrder = async (order) => {
    return await apiClient.post("/api/v1.0/orders", order)
}

export const deleteOrder = async (id) => {
    return await apiClient.delete(`/api/v1.0/orders/${id}`)
}