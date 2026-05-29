import { addItem, getCart, incrementCartItemApi, decrementCartItemApi, removeCartItemApi, createCartOrder, verifyCartOrder } from "../service/cart.api"
import { useDispatch } from "react-redux"
import { setCart, incrementCartItem, decrementCartItem, removeItem } from "../state/cart.slice"


export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddItem({ productId, variantId }) {
        try {
            const data = await addItem({ productId, variantId })
            return data
        } catch (error) {
            console.error("Error adding item to cart:", error);
            throw error;
        }
    }

    async function handleGetCart() {
        try {
            console.log("Fetching cart...");
            const data = await getCart()
            console.log("Cart fetched successfully:", data)
            dispatch(setCart(data.cart))
            return data.cart;
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw error;
        }
    }

    async function handleIncrementCartItem({ productId, variantId }) {
        try {
            await incrementCartItemApi({ productId, variantId })
            dispatch(incrementCartItem({ productId, variantId }))
        } catch (error) {
            console.error("Error incrementing cart item:", error);
            throw error;
        }
    }

    async function handleDecrementCartItem({ productId, variantId }) {
        try {
            await decrementCartItemApi({ productId, variantId })
            dispatch(decrementCartItem({ productId, variantId }))
        } catch (error) {
            console.error("Error decrementing cart item:", error);
            throw error;
        }
    }

    async function handleRemoveCartItem({ productId, variantId }) {
        try {
            await removeCartItemApi({ productId, variantId })
            dispatch(removeItem({ productId, variantId }))
        } catch (error) {
            console.error("Error removing cart item:", error);
            throw error;
        }
    }
    
    async function handleCreateCartOrder() {
        try {
            const data = await createCartOrder()
            return data
        } catch (error) {
            console.error("Error creating cart order:", error);
            throw error;
        }
    }

    async function handleVerifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        try {
            const data = await verifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
            return data.success
        } catch (error) {
            console.error("Error verifying cart order:", error);
            throw error;
        }
    }


    return { handleAddItem, handleGetCart, handleIncrementCartItem, handleDecrementCartItem, handleRemoveCartItem, handleCreateCartOrder, handleVerifyCartOrder }

}