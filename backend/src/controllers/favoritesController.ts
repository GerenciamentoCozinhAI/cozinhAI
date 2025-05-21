import { Request, Response } from "express";
import * as favoritesService from "../services/favoritesService";

// GET: Obter todas as receitas favoritas do usuário
export const getAllFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const favorites = await favoritesService.getAllFavorites(userId);

    if (!favorites || favorites.length === 0) {
      res.status(404).send({ error: "No favorite recipes found" });
      return;
    }

    res.status(200).send(favorites);
  } catch (err) {
    console.error("Error fetching favorite recipes:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Quantidade de receitas favoritas do usuário
export const getFavoriteCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const count = await favoritesService.getFavoriteCount(userId);
    res.status(200).send({ count });
  } catch (err) {
    console.error("Error fetching favorite count:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// POST: Adicionar uma receita aos favoritos
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.params;
    const userId = (req as any).user.id;

    await favoritesService.addFavorite(userId, recipeId);

    res.status(201).send({ message: "Recipe added to favorites successfully" });
  } catch (err: any) {
    if (err.message === "Recipe is already in favorites") {
      res.status(400).send({ error: err.message });
    } else {
      console.error("Error adding recipe to favorites:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

// DELETE: Remover uma receita dos favoritos
export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.params;
    const userId = (req as any).user.id;

    await favoritesService.removeFavorite(userId, recipeId);

    res.status(200).send({ message: "Recipe removed from favorites successfully" });
  } catch (err: any) {
    if (err.message === "Recipe is not in favorites") {
      res.status(404).send({ error: err.message });
    } else {
      console.error("Error removing recipe from favorites:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
};