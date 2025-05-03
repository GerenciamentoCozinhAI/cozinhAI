import { Request, Response } from "express";
import { prisma } from "../services/prisma";

// POST: Adicionar um like a uma receita
export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.params; // ID da receita a ser curtida
    const userId = (req as any).user.id; // ID do usuário autenticado

    // Verificar se o like já existe
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_recipeId: { userId, recipeId },
      },
    });

    if (existingLike) {
      res.status(400).send({ error: "Recipe is already liked" });
      return;
    }

    // Adicionar o like
    await prisma.like.create({
      data: {
        userId,
        recipeId,
      },
    });

    res.status(201).send({ message: "Recipe liked successfully" });
  } catch (err) {
    console.error("Error adding like to recipe:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// DELETE: Remover um like de uma receita
export const removeLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.params; // ID da receita a ser descurtida
    const userId = (req as any).user.id; // ID do usuário autenticado

    // Verificar se o like existe
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_recipeId: { userId, recipeId },
      },
    });

    if (!existingLike) {
      res.status(404).send({ error: "Recipe is not liked" });
      return;
    }

    // Remover o like
    await prisma.like.delete({
      where: {
        userId_recipeId: { userId, recipeId },
      },
    });

    res.status(200).send({ message: "Recipe unliked successfully" });
  } catch (err) {
    console.error("Error removing like from recipe:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};