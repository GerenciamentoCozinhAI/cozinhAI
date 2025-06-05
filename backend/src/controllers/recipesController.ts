import { Request, Response } from "express";
import * as recipeService from "../services/recipeService";

// POST: Criar uma nova receita
export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const recipe = await recipeService.createRecipe(user, req.body);
    res.status(201).send(recipe);
  } catch (err: any) {
    res.status(400).send({ error: err.message || "Internal server error" });
  }
};

// POST: Gerar uma receita com base na IA
export const generateRecipeWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { ingredients, observations } = req.body;
    const recipe = await recipeService.generateRecipeWithAI(user, ingredients, observations);
    res.status(201).send(recipe);
  } catch (err: any) {
    res.status(400).send({ error: err.message || "Internal server error" });
  }
};

// GET: Listar todas as receitas
export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.status(200).send(recipes);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Buscar uma receita pelo ID
export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id, req);
    res.status(200).send(recipe);
  } catch (err: any) {
    if (err.message === "Recipe not found") {
      res.status(404).send({ error: err.message });
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

// GET: Listar receitas de um usuário específico
export const getMyRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }
    const recipes = await recipeService.getMyRecipes(user);
    res.status(200).send(recipes);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Obter quantidade de receitas criadas por um usuário
export const getMyRecipeCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user || !user.id) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }
    const count = await recipeService.getMyRecipeCount(user);
    res.status(200).send({ count });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// PUT: Atualizar uma receita
export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const updatedRecipe = await recipeService.updateRecipe(id, user, req.body);
    res.status(200).send(updatedRecipe);
  } catch (err: any) {
    if (
      err.message === "Recipe not found" ||
      err.message === "You are not authorized to update this recipe"
    ) {
      res.status(403).send({ error: err.message });
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

// DELETE: Remover uma receita
export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;
    const result = await recipeService.deleteRecipe(id, user);
    res.status(200).send(result);
  } catch (err: any) {
    if (
      err.message === "Recipe not found" ||
      err.message === "You are not authorized to delete this recipe"
    ) {
      res.status(403).send({ error: err.message });
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};