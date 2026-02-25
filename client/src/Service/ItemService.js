import apiClient from "./apiConfig";

export const addItem = async (item) => {
    return await apiClient.post(`/api/v1.0/admin/items`, item)
}

export const deleteItem = async (itemId) => {
    return await apiClient.delete(`/api/v1.0/admin/items/${itemId}`)
}

export const fetchItems = async () => {
    return await apiClient.get(`/api/v1.0/items`)
}