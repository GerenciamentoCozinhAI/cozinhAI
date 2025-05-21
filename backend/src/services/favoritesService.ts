import { prisma } from "../database/prisma";

export async function getAllFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: { userId },
    include: { recipe: true },
  });
}

export async function getFavoriteCount(userId: string) {
  return prisma.favorite.count({
    where: { userId },
  });
}

export async function addFavorite(userId: string, recipeId: string) {
  const existingFavorite = await prisma.favorite.findUnique({
    where: { userId_recipeId: { userId, recipeId } },
  });

  if (existingFavorite) {
    throw new Error("Recipe is already in favorites");
  }

  return prisma.favorite.create({
    data: { userId, recipeId },
  });
}

export async function removeFavorite(userId: string, recipeId: string) {
  const existingFavorite = await prisma.favorite.findUnique({
    where: { userId_recipeId: { userId, recipeId } },
  });

  if (!existingFavorite) {
    throw new Error("Recipe is not in favorites");
  }

  return prisma.favorite.delete({
    where: { userId_recipeId: { userId, recipeId } },
  });
}