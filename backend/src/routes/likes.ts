import { Router } from "express";
import { addLike, removeLike } from "../controllers/likesController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas para likes
router.post("/:recipeId", authMiddleware, addLike); // Adicionar curtida
router.delete("/:recipeId", authMiddleware, removeLike); // Remover curtida

export default router;