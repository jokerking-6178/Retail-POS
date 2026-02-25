import apiClient from "./apiConfig";

export const addCategory = async (category) => {
    return await apiClient.post('/api/v1.0/admin/categories', category)
}

export const deleteCategory = async (categoryId) => {
    return await apiClient.delete(`/api/v1.0/admin/categories/${categoryId}`)
}

export const fetchCategories = async () => {
    return await apiClient.get("/api/v1.0/categories")
}