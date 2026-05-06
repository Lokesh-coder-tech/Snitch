import {Router} from 'express';
const router = Router();
import {authenticateUser} from "../middlewares/auth.middleware.js"
import {addToCart, getCart, incrementCartItemQuantity} from "../controllers/cart.controller.js"
import {validateAddToCart, validateIncrementCartItemQuantity} from "../validator/cart.validator.js"


router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)

router.get("/", authenticateUser, getCart)

router.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartItemQuantity, incrementCartItemQuantity)
export default router;