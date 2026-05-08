import {Router} from 'express';
const router = Router();
import {authenticateUser} from "../middlewares/auth.middleware.js"
import {addToCart, getCart, incrementCartItemQuantity,  decrementCartItemQuantity, removeCartItem} from "../controllers/cart.controller.js"
import {validateAddToCart, validateIncrementCartItemQuantity} from "../validator/cart.validator.js"


router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)

router.get("/", authenticateUser, getCart)

router.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartItemQuantity, incrementCartItemQuantity)

router.patch("/quantity/decrement/:productId/:variantId", authenticateUser, decrementCartItemQuantity)

router.delete("/quantity/remove/:productId/:variantId", authenticateUser, removeCartItem)

export default router;