import { prisma } from "../database/prisma";

function capitalizeIngredientName(str: string) {
  const cleaned = str.trim().replace(/\s+/g, " ").toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export async function createIngredient(name: string) {
  if (!name) throw new Error("Ingredient name is required");

  const existingIngredient = await prisma.ingredient.findUnique({ where: { name } });
  if (existingIngredient) throw new Error("Ingredient already exists");

  return prisma.ingredient.create({ data: { name } });
}

export async function getAllIngredients() {
  return prisma.ingredient.findMany();
}

export async function getIngredientByName(name: string) {
  return prisma.ingredient.findUnique({ where: { name } });
}

export async function searchIngredients(name: string) {
  return prisma.ingredient.findMany({
    where: {
      name: {
        contains: String(name),
        mode: "insensitive",
      },
    },
  });
}

export async function updateIngredient(id: string, name: string) {
  if (!name) throw new Error("Ingredient name is required");

  const existingIngredient = await prisma.ingredient.findUnique({ where: { id } });
  if (!existingIngredient) throw new Error("Ingredient not found");

  return prisma.ingredient.update({ where: { id }, data: { name } });
}

export async function deleteIngredient(id: string) {
  const existingIngredient = await prisma.ingredient.findUnique({ where: { id } });
  if (!existingIngredient) throw new Error("Ingredient not found");

  await prisma.ingredient.delete({ where: { id } });
  return { message: "Ingredient deleted successfully" };
}

export async function findOrCreateIngredients(ingredients: any[]) {
  return Promise.all(
    ingredients.map(async (ingredient) => {
      const normalizedName = capitalizeIngredientName(ingredient.name);

      let existingIngredient = await prisma.ingredient.findFirst({
        where: {
          name: {
            equals: normalizedName,
            mode: "insensitive",
          },
        },
      });

      if (!existingIngredient) {
        existingIngredient = await prisma.ingredient.create({
          data: { name: normalizedName },
        });
      }

      return {
        ingredientId: existingIngredient.id,
        ingredientName: existingIngredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      };
    })
  );
}