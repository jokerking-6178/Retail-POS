import apiClient from "./apiConfig";

export const addUser = async (user) => {
    return await apiClient.post('/api/v1.0/admin/register', user)
}

export const deleteUser = async (id) => {
    return await apiClient.delete(`/api/v1.0/admin/users/${id}`)
}

export const fetchUsers = async () => {
    return await apiClient.get('/api/v1.0/admin/users')
}