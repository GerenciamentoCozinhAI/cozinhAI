// src/routes/recipe.ts

import { Router } from "express";
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getMyRecipeCount,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
  generateRecipeWithAI
} from "../controllers/recipesController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rotas para receitas
router.post("/count", authMiddleware, getMyRecipeCount); // Obter quantidade de receitas do usuário autenticado
router.post("/create", authMiddleware, createRecipe); // Criar uma nova receita
router.post('/generate-with-ai', authMiddleware, generateRecipeWithAI); // Gerar receita com IA
router.get("/", getAllRecipes); // Obter todas as receitas
router.get("/my-recipes", authMiddleware, getMyRecipes); // Obter receitas do usuário autenticado
router.get("/:id", getRecipeById); // Obter receita por ID
router.put("/:id", authMiddleware, updateRecipe); // Atualizar receita por ID
router.delete("/:id", authMiddleware, deleteRecipe); // Deletar receita por ID

export default router;
