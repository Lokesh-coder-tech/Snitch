import { Router } from 'express';
import {authenticateSeller} from "../middlewares/auth.middleware.js";
import { createProduct, getAllProducts, getSellerProducts, getProductDetails } from '../controllers/product.controller.js';
// import { createProductValidator } from '../validator/product.validator.js';
import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
     fileSize: 5 * 1024 * 1024
    }
})

const router = Router();
router.post('/', authenticateSeller, upload.array("images", 7), createProduct)

router.get("/seller", authenticateSeller, getSellerProducts)

router.get("/", getAllProducts)

router.get("/detail/:id", getProductDetails)

export default router;
