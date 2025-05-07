import { Router } from "express";
import {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoritesController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas para favoritos
router.get("/", authMiddleware, getAllFavorites); // Obter todas as receitas favoritas
router.post("/:recipeId", authMiddleware, addFavorite); // Adicionar receita aos favoritos
router.delete("/:recipeId", authMiddleware, removeFavorite); // Remover receita dos favoritos

export default router;