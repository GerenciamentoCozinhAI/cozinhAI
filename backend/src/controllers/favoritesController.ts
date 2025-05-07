//src/controllers/favoritesController.ts

import { Request, Response } from "express";
import { prisma } from "../services/prisma";



// GET: Obter todas as receitas favoritas do usuário
export const getAllFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
      const userId = (req as any).user.id; // ID do usuário autenticado

      // Obter todas as receitas favoritas do usuário
      const favorites = await prisma.favorite.findMany({
          where: { userId },
          include: {
              recipe: true, // Inclui os detalhes da receita
          },
      });

      console.log("Favorites fetched:", favorites); // Log para depuração

      if (favorites.length === 0) {
          res.status(404).send({ error: "No favorite recipes found" });
          return;
      }

      res.status(200).send(favorites);
  } catch (err) {
      console.error("Error fetching favorite recipes:", err);
      res.status(500).send({ error: "Internal server error" });
  }
};

// POST: Adicionar uma receita aos favoritos
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
      const { recipeId } = req.params; // ID da receita a ser favoritada
      const userId = (req as any).user.id; // ID do usuário autenticado
  
      // Verificar se a receita já está favoritada
      const existingFavorite = await prisma.favorite.findUnique({
        where: {
          userId_recipeId: { userId, recipeId },
        },
      });
  
      if (existingFavorite) {
        res.status(400).send({ error: "Recipe is already in favorites" });
        return;
      }
  
      // Adicionar a receita aos favoritos
      await prisma.favorite.create({
        data: {
          userId,
          recipeId,
        },
      });
  
      res.status(201).send({ message: "Recipe added to favorites successfully" });
    } catch (err) {
      console.error("Error adding recipe to favorites:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  };
  
  // DELETE: Remover uma receita dos favoritos
  export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
      const { recipeId } = req.params; // ID da receita a ser removida dos favoritos
      const userId = (req as any).user.id; // ID do usuário autenticado
  
      // Verificar se a receita está nos favoritos
      const existingFavorite = await prisma.favorite.findUnique({
        where: {
          userId_recipeId: { userId, recipeId },
        },
      });
  
      if (!existingFavorite) {
        res.status(404).send({ error: "Recipe is not in favorites" });
        return;
      }
  
      // Remover a receita dos favoritos
      await prisma.favorite.delete({
        where: {
          userId_recipeId: { userId, recipeId },
        },
      });
  
      res.status(200).send({ message: "Recipe removed from favorites successfully" });
    } catch (err) {
      console.error("Error removing recipe from favorites:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  };