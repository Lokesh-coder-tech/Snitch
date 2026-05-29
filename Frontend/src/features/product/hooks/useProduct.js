import {createProduct, getSellerProducts, getAllProducts, getProductById, addProductVariant} from "../service/product.api.js";
import {setSellerProducts, setProducts} from "../state/product.slice.js"
import {useDispatch} from "react-redux";


export const useProduct = () => {
    const dispatch = useDispatch();

     async function handleCreateProduct(formData) {
        try {
            const data = await createProduct(formData)
            return data.product
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    }

    async function handleGetSellerProduct() {
        try {
            const data = await getSellerProducts()
            dispatch(setSellerProducts(data.products))
            return data.products
        } catch (error) {
            console.error("Error fetching seller products:", error);
            throw error;
        }
    }

    async function handleGetAllProducts() {
        try {
            console.log("Fetching all products...");
            const data = await getAllProducts()
            console.log("Products fetched successfully:", data);
            dispatch(setProducts(data.products))
            return data.products
        } catch (error) {
            console.error("Error fetching all products:", error);
            throw error;
        }
    }

    async function handleGetProductById(productId) {
        try {
            const data = await getProductById(productId)
            return data.product
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            throw error;
        }
    }

    async function handleAddProductVariant(productId, newProductVariant) {
        try {
            const data = await addProductVariant(productId, newProductVariant)
            return data.product
        } catch (error) {
            console.error("Error adding product variant:", error);
            throw error;
        }
    }

    return {handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById, handleAddProductVariant};
}