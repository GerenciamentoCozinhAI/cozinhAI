// src/controllers/recipesController.ts

import { Request, Response } from "express";
import { prisma } from "../services/prisma";

// POST: Criar uma nova receita
export const createRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user; // Usuário autenticado
    const {
      title,
      description,
      difficulty,
      instructions,
      prepTime,
      servings,
      image,
      isGeneratedByAI,
      ingredients, // Lista de ingredientes [{ name, quantity, unit }]
    } = req.body;

    // Validação básica
    if (!title || !ingredients || ingredients.length === 0) {
      res.status(400).send({ error: "Title and ingredients are required" });
      return;
    }

    // Verificar e criar ingredientes, se necessário
    const ingredientPromises = ingredients.map(async (ingredient: any) => {
      let existingIngredient = await prisma.ingredient.findUnique({
        where: { name: ingredient.name },
      });

      if (!existingIngredient) {
        existingIngredient = await prisma.ingredient.create({
          data: { name: ingredient.name },
        });
      }

      return {
        ingredientId: existingIngredient.id,
        ingredientName: existingIngredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      };
    });

    const processedIngredients = await Promise.all(ingredientPromises);

    // Criar a receita no banco de dados
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        difficulty,
        instructions,
        prepTime,
        servings,
        image,
        isGeneratedByAI,
        userId: user.id, // Relaciona a receita ao usuário autenticado
        ingredients: {
          create: processedIngredients,
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true, // Inclui os detalhes dos ingredientes
          },
        },
      },
    });

    res.status(201).send(recipe);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Listar todas as receitas
export const getAllRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true, // Inclui os detalhes dos ingredientes
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }, // Inclui informações básicas do usuário
        },
        _count: {
          select: {
            likes: true, // Conta o número de likes
          },
        },
      },
    });

    // Formata o retorno para incluir o número de likes
    const formattedRecipes = recipes.map((recipe) => ({
      ...recipe,
      likes: recipe._count.likes, // Adiciona o número de likes ao objeto da receita
    }));

    res.status(200).send(formattedRecipes);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Buscar uma receita pelo ID
export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user; // Usuário autenticado

    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!recipe) {
      res.status(404).send({ error: "Recipe not found" });
      return;
    }

    // Verificar se o usuário já curtiu a receita
    const userLiked = user
      ? await prisma.like.findFirst({
          where: {
            recipeId: id,
            userId: user.id,
          },
        })
      : null;

    res.status(200).send({
      ...recipe,
      isLiked: !!userLiked, // Retorna true se o usuário já curtiu
    });
  } catch (err) {
    console.error("Error fetching recipe by ID:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Listar receitas de um usuário específico
export const getMyRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Usuário autenticado

    // Verificar se o usuário está autenticado
    if (!user || !user.id) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    // Buscar receitas do usuário autenticado
    const recipes = await prisma.recipe.findMany({
      where: { userId: user.id },
      include: {
        ingredients: {
          include: {
            ingredient: true, // Inclui os detalhes dos ingredientes
          },
        },
        _count: {
          select: {
            likes: true, // Conta o número de likes
          },
        },
      },
    });

    // Formatar o retorno para incluir o número de likes
    const formattedRecipes = recipes.map((recipe) => ({
      ...recipe,
      likes: recipe._count.likes, // Adiciona o número de likes ao objeto da receita
    }));

    res.status(200).send(formattedRecipes);
  } catch (err) {
    console.error("Error fetching user's recipes:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// GET: Obter quantiade de receitas criadas por um usuário
export const getMyRecipeCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user; // Usuário autenticado

    // Verificar se o usuário está autenticado
    if (!user || !user.id) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    // Contar o número de receitas do usuário autenticado
    const count = await prisma.recipe.count({
      where: { userId: user.id },
    });

    res.status(200).send({ count });
  } catch (err) {
    console.error("Error fetching user's recipe count:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// PUT: Atualizar uma receita
export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID da receita a ser atualizada
    const user = (req as any).user; // Usuário autenticado
    const {
      title,
      description,
      difficulty,
      instructions,
      prepTime,
      servings,
      image,
      isGeneratedByAI,
      ingredients, // Lista de ingredientes [{ name, quantity, unit }]
    } = req.body;

    // Validação básica
    if (!title || !ingredients || ingredients.length === 0) {
      res.status(400).send({ error: "Title and ingredients are required" });
      return;
    }

    // Verificar se a receita existe
    const existingRecipe = await prisma.recipe.findUnique({ where: { id } });
    if (!existingRecipe) {
      res.status(404).send({ error: "Recipe not found" });
      return;
    }

    // Verificar se o usuário autenticado é o criador da receita
    if (existingRecipe.userId !== user.id) {
      res.status(403).send({ error: "You are not authorized to update this recipe" });
      return;
    }

    // Verificar e criar ingredientes, se necessário
    const ingredientPromises = ingredients.map(async (ingredient: any) => {
      let existingIngredient = await prisma.ingredient.findUnique({
        where: { name: ingredient.name },
      });

      if (!existingIngredient) {
        existingIngredient = await prisma.ingredient.create({
          data: { name: ingredient.name },
        });
      }

      return {
        ingredientId: existingIngredient.id,
        ingredientName: existingIngredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      };
    });

    const processedIngredients = await Promise.all(ingredientPromises);

    // Atualizar a receita no banco de dados
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        instructions,
        prepTime,
        servings,
        image,
        isGeneratedByAI,
        ingredients: {
          deleteMany: {}, // Remove os ingredientes antigos
          create: processedIngredients, // Adiciona os novos ingredientes
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true, // Inclui os detalhes dos ingredientes
          },
        },
      },
    });

    res.status(200).send(updatedRecipe);
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// DELETE: Remover uma receita
export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user; // Usuário autenticado

    // Verificar se a receita existe
    const existingRecipe = await prisma.recipe.findUnique({ where: { id } });
    if (!existingRecipe) {
      res.status(404).send({ error: "Recipe not found" });
      return;
    }

    // Verificar se o usuário autenticado é o criador da receita
    if (existingRecipe.userId !== user.id) {
      res.status(403).send({ error: "You are not authorized to delete this recipe" });
      return;
    }

    // Remover a receita
    await prisma.recipe.delete({ where: { id } });

    res.status(200).send({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};