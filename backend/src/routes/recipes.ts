// src/routes/recipe.ts

import { Router } from "express";
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from "../controllers/recipeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createRecipe); // Criar uma nova receita
router.get("/", getAllRecipes); // Obter todas as receitas
router.get("/:id", getRecipeById); // Obter receita por ID
router.put("/:id", authMiddleware, updateRecipe); // Atualizar receita por ID
router.delete("/:id", authMiddleware, deleteRecipe); // Deletar receita por ID

export default router;