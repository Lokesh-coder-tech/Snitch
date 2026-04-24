import {Router} from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRegisterUser, register);
router.post("/login", validateLoginUser, login);
router.get("/me", authenticateUser, getMe);

export default router;