import axios from 'axios';

const apiInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export const addItem = async ({productId, variantId}) => {
    const response = await apiInstance.post(`/api/cart/add/${productId}/${variantId}`,{
        quantity: 1
    });
    return response.data;

}

export const getCart = async () => {
    const response = await apiInstance.get("/api/cart/")
    return response.data;
}

export const incrementCartItemApi = async ({productId, variantId}) => {
    const response = await apiInstance.patch(`/api/cart/quantity/increment/${productId}/${variantId}`)
    return response.data;
}

export const decrementCartItemApi = async ({productId, variantId}) => {
    const response = await apiInstance.patch(`/api/cart/quantity/decrement/${productId}/${variantId}`)
    return response.data;
}

export const removeCartItemApi = async ({productId, variantId}) => {
    const response = await apiInstance.delete(`/api/cart/remove/${productId}/${variantId}`)
    return response.data;
}

