import { prisma } from "../database/prisma";

export async function getAllFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      recipe: {
        include: {
          _count: { select: { likes: true } },
          user: { select: { id: true, name: true, email: true } }
        }
      }
    }
  });

  // Adiciona o campo likes na receita para facilitar o frontend
  return favorites.map(fav => ({
    ...fav,
    recipe: {
      ...fav.recipe,
      likes: fav.recipe._count?.likes ?? 0
    }
  }));
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