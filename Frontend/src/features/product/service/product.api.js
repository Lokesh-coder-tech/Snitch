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
export async function getAllProducts() {
    const response = await apiInstance.get("/api/products/")
    return response.data
}
export async function getProductById(productId) {
    const response = await apiInstance.get(`/api/products/detail/${productId}`)
    return response.data
}

export async function addProductVariant(productId, newProductVariant) {

    console.log(newProductVariant)

    const formData = new FormData()

    newProductVariant.images.forEach((image) => {
        formData.append(`images`, image.file)
    })

    formData.append("stock", newProductVariant.stock)
    formData.append("priceAmount", newProductVariant.price)
    formData.append("attributes", JSON.stringify(newProductVariant.attributes))

    const response = await apiInstance.post(`/api/products/${productId}/variants`, formData)

    return response.data;
}