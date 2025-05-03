// src/routes/recipe.ts

import { Router } from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipesController";
import {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoritesController";
import { addLike, removeLike } from "../controllers/likesController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas para receitas
router.post("/create", authMiddleware, createRecipe); // Criar uma nova receita
router.get("/", getAllRecipes); // Obter todas as receitas
router.get("/:id", getRecipeById); // Obter receita por ID
router.put("/:id", authMiddleware, updateRecipe); // Atualizar receita por ID
router.delete("/:id", authMiddleware, deleteRecipe); // Deletar receita por ID

// Rotas para favoritos
router.get("/favorites", authMiddleware, getAllFavorites); // Obter todas as receitas favoritas
router.post("/:id/favorite", authMiddleware, addFavorite); // Adicionar receita aos favoritos
router.delete("/:id/favorite", authMiddleware, removeFavorite); // Remover receita dos favoritos

// Rotas para likes
router.post("/:id/like", authMiddleware, addLike);
router.delete("/:id/like", authMiddleware, removeLike);

export default router;
