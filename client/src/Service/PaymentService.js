import apiClient from "./apiConfig";
export const createRazorpayOrder = async (data) => {
    return await apiClient.post(`/api/v1.0/payments/create-order`, data)
}

export const verifyPayment = async (paymentData) => {
    return await apiClient.post(`/api/v1.0/payments/verify`, paymentData)
}