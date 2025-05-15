import { Request, Response } from "express";
import { prisma } from "../services/prisma";

// POST: Criar um novo ingrediente (somente para usuários autenticados)
export const createIngredient = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Usuário autenticado

    if (!user) {
      res.status(401).send({ error: "Authentication required" });
      return;
    }

    const { name } = req.body;

    if (!name) {
      res.status(400).send({ error: "Ingredient name is required" });
      return;
    }

    const existingIngredient = await prisma.ingredient.findUnique({
      where: { name },
    });

    if (existingIngredient) {
      res.status(400).send({ error: "Ingredient already exists" });
      return;
    }

    const ingredient = await prisma.ingredient.create({
      data: { name },
    });

    res.status(201).send(ingredient);
  } catch (err) {
    console.error("Error creating ingredient:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Listar todos os ingredientes
export const getAllIngredients = async (req: Request, res: Response): Promise<void> => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.status(200).send(ingredients);
  } catch (err) {
    console.error("Error fetching ingredients:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Buscar um ingrediente pelo nome
export const getIngredientByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;

    const ingredient = await prisma.ingredient.findUnique({
      where: { name },
    });

    if (!ingredient) {
      res.status(404).send({ error: "Ingredient not found" });
      return;
    }

    res.status(200).send(ingredient);
  } catch (err) {
    console.error("Error fetching ingredient by name:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Search ingredients by name (for autocomplete)
export const searchIngredients = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Query recebida:", req.query);
    const { name } = req.query;

    if (!name) {
      res.status(400).send({ error: "Ingredient name is required" });
      return;
    }

    const ingredients = await prisma.ingredient.findMany({
      where: {
        name: {
          contains: String(name),
          mode: "insensitive",
        },
      },
    });

    console.log("Ingredientes encontrados:", ingredients);
    res.status(200).send(ingredients);
  } catch (err) {
    console.error("Erro ao buscar ingredientes:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// PUT: Atualizar um ingrediente (somente para usuários autenticados)
export const updateIngredient = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Usuário autenticado

    if (!user) {
      res.status(401).send({ error: "Authentication required" });
      return;
    }

    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ error: "Ingredient name is required" });
      return;
    }

    const existingIngredient = await prisma.ingredient.findUnique({ where: { id } });

    if (!existingIngredient) {
      res.status(404).send({ error: "Ingredient not found" });
      return;
    }

    const updatedIngredient = await prisma.ingredient.update({
      where: { id },
      data: { name },
    });

    res.status(200).send(updatedIngredient);
  } catch (err) {
    console.error("Error updating ingredient:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// DELETE: Remover um ingrediente (somente para usuários autenticados)
export const deleteIngredient = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Usuário autenticado

    if (!user) {
      res.status(401).send({ error: "Authentication required" });
      return;
    }

    const { id } = req.params;

    const existingIngredient = await prisma.ingredient.findUnique({ where: { id } });

    if (!existingIngredient) {
      res.status(404).send({ error: "Ingredient not found" });
      return;
    }

    await prisma.ingredient.delete({ where: { id } });

    res.status(200).send({ message: "Ingredient deleted successfully" });
  } catch (err) {
    console.error("Error deleting ingredient:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

function capitalizeIngredientName(str: string) {
  const cleaned = str.trim().replace(/\s+/g, " ").toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export async function findOrCreateIngredients(ingredients: any[]) {
  return Promise.all(
    ingredients.map(async (ingredient) => {
      // Usa a função de capitalização para normalizar o nome
      const normalizedName = capitalizeIngredientName(ingredient.name);

      let existingIngredient = await prisma.ingredient.findFirst({
        where: {
          name: {
            equals: normalizedName,
            mode: "insensitive", // Ignora maiúsculas/minúsculas
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