import { prisma } from "../database/prisma";

export async function addLike(userId: string, recipeId: string) {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });

  if (existingLike) {
    throw new Error("Recipe is already liked");
  }

  return prisma.like.create({
    data: {
      userId,
      recipeId,
    },
  });
}

export async function removeLike(userId: string, recipeId: string) {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });

  if (!existingLike) {
    throw new Error("Recipe is not liked");
  }

  return prisma.like.delete({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });
}