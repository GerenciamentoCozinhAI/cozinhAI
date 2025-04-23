// src/routes/auth.ts
import { Router } from "express";
import { register, login, logout, googleAuth } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/logout',authMiddleware, logout);

export default router;
