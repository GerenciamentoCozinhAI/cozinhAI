import { Request, Response } from "express";
import * as likeService from "../services/likeService";

// POST: Adicionar um like a uma receita
export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.params;
    const userId = (req as any).user.id;

    await likeService.addLike(userId, recipeId);

    res.status(201).send({ message: "Recipe liked successfully" });
  } catch (err: any) {
    if (err.message === "Recipe is already liked") {
      res.status(400).send({ error: err.message });
    } else {
      console.error("Error adding like to recipe:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

// DELETE: Remover um like de uma receita
export const removeLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.params;
    const userId = (req as any).user.id;

    await likeService.removeLike(userId, recipeId);

    res.status(200).send({ message: "Recipe unliked successfully" });
  } catch (err: any) {
    if (err.message === "Recipe is not liked") {
      res.status(404).send({ error: err.message });
    } else {
      console.error("Error removing like from recipe:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
};