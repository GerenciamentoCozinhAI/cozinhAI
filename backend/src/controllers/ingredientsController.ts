import { Request, Response } from "express";
import * as ingredientsService from "../services/ingredientService";

// POST: Criar um novo ingrediente
export const createIngredient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).send({ error: "Authentication required" });
      return;
    }
    const { name } = req.body;
    const ingredient = await ingredientsService.createIngredient(name);
    res.status(201).send(ingredient);
  } catch (err: any) {
    res.status(400).send({ error: err.message || "Internal server error" });
  }
};

// GET: Listar todos os ingredientes
export const getAllIngredients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ingredients = await ingredientsService.getAllIngredients();
    res.status(200).send(ingredients);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Buscar um ingrediente pelo nome
export const getIngredientByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.params;
    const ingredient = await ingredientsService.getIngredientByName(name);
    if (!ingredient) {
      res.status(404).send({ error: "Ingredient not found" });
      return;
    }
    res.status(200).send(ingredient);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Search ingredients by name (autocomplete)
export const searchIngredients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.query;
    if (!name) {
      res.status(400).send({ error: "Ingredient name is required" });
      return;
    }
    const ingredients = await ingredientsService.searchIngredients(
      String(name)
    );
    res.status(200).send(ingredients);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// PUT: Atualizar um ingrediente
export const updateIngredient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).send({ error: "Authentication required" });
      return;
    }
    const { id } = req.params;
    const { name } = req.body;
    const updatedIngredient = await ingredientsService.updateIngredient(
      id,
      name
    );
    res.status(200).send(updatedIngredient);
  } catch (err: any) {
    res.status(400).send({ error: err.message || "Internal server error" });
  }
};

// DELETE: Remover um ingrediente
export const deleteIngredient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).send({ error: "Authentication required" });
      return;
    }
    const { id } = req.params;
    const result = await ingredientsService.deleteIngredient(id);
    res.status(200).send(result);
  } catch (err: any) {
    res.status(400).send({ error: err.message || "Internal server error" });
  }
};
