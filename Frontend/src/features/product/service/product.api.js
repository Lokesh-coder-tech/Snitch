import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

export async function createProduct(formData) {
    const response = await apiInstance.post("/api/products/", formData)
    return response.data
}
export async function getSellerProducts() {
    const response = await apiInstance.get("/api/products/seller")
    return response.data
}