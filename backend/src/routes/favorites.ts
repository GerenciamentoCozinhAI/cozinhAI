import { Router } from "express";
import {
  getAllFavorites,
  getFavoriteCount,
  addFavorite,
  removeFavorite,
} from "../controllers/favoritesController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas para favoritos
router.get("/count", authMiddleware, getFavoriteCount); // Obter quantidade de receitas favoritas do usuário
router.post("/:recipeId", authMiddleware, addFavorite); // Adicionar receita aos favoritos
router.delete("/:recipeId", authMiddleware, removeFavorite); // Remover receita dos favoritos
router.get("/", authMiddleware, getAllFavorites); // Obter todas as receitas favoritas

export default router;