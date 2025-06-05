import { prisma } from "../database/prisma";
import { generateRecipe, validateWithAI } from "../APIs/geminiAPI";
import { getPexelsImage } from "../APIs/pexelsAPI";
import { findOrCreateIngredients } from "../services/ingredientService";
import { getUserFromRequest } from "../utils/getUserFromRequest";

export async function createRecipe(user: any, data: any) {
  const {
    title,
    description,
    difficulty,
    instructions,
    prepTime,
    servings,
    image,
    isGeneratedByAI,
    ingredients,
  } = data;

  if (!title || !ingredients || ingredients.length === 0) {
    throw new Error("Title and ingredients are required");
  }

  const validation = await validateWithAI(ingredients, description, instructions);
  if (!validation.isValid) {
    throw new Error(validation.reason || "Ingredientes inválidos.");
  }

  const processedIngredients = await findOrCreateIngredients(ingredients);

  return prisma.recipe.create({
    data: {
      title,
      description,
      difficulty,
      instructions,
      prepTime,
      servings,
      image,
      isGeneratedByAI,
      userId: user.id,
      ingredients: {
        create: processedIngredients,
      },
    },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
}

export async function generateRecipeWithAI(user: any, ingredients: any[], observations: string) {
  const aiGeneratedRecipe = await generateRecipe(
    ingredients.map((i: any) => ({
      name: i.name,
      quantity: i.quantity,
      unit: i.unit,
    })),
    observations
  );

  if (aiGeneratedRecipe.isPossibleToMake === false) {
    throw new Error("Não é possível gerar uma receita viável com os ingredientes e observações fornecidos.");
  }

  const finalIngredients = await findOrCreateIngredients(aiGeneratedRecipe.ingredients);
  const recipeImage = await getPexelsImage(aiGeneratedRecipe.whatIs);

  return prisma.recipe.create({
    data: {
      title: aiGeneratedRecipe.title,
      description: aiGeneratedRecipe.description,
      difficulty: parseInt(aiGeneratedRecipe.difficulty, 10),
      instructions: aiGeneratedRecipe.instructions,
      prepTime: aiGeneratedRecipe.prepTime,
      servings: aiGeneratedRecipe.servings,
      image: recipeImage || null,
      isGeneratedByAI: true,
      userId: user.id,
      ingredients: {
        create: finalIngredients,
      },
    },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
}

export async function getAllRecipes() {
  const recipes = await prisma.recipe.findMany({
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

  return recipes.map((recipe) => ({
    ...recipe,
    likes: recipe._count.likes,
  }));
}

export async function getRecipeById(id: string, req: any) {
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
    throw new Error("Recipe not found");
  }

  let user = null;
  try {
    const authData = await getUserFromRequest(req);
    user = authData?.user || null;
  } catch (e) {
    user = null;
  }

  let isLiked = false;
  let isFavorited = false;
  if (user) {
    isLiked = !!(await prisma.like.findFirst({
      where: { recipeId: id, userId: user.id },
    }));
    isFavorited = !!(await prisma.favorite.findFirst({
      where: { recipeId: id, userId: user.id },
    }));
  }

  return {
    ...recipe,
    isLiked,
    isFavorited,
  };
}

export async function getMyRecipes(user: any) {
  const recipes = await prisma.recipe.findMany({
    where: { userId: user.id },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return recipes.map((recipe) => ({
    ...recipe,
    likes: recipe._count.likes,
  }));
}

export async function getMyRecipeCount(user: any) {
  return prisma.recipe.count({
    where: { userId: user.id },
  });
}

export async function updateRecipe(id: string, user: any, data: any) {
  const {
    title,
    description,
    difficulty,
    instructions,
    prepTime,
    servings,
    image,
    isGeneratedByAI,
    ingredients,
  } = data;

  if (!title || !ingredients || ingredients.length === 0) {
    throw new Error("Title and ingredients are required");
  }

  const existingRecipe = await prisma.recipe.findUnique({ where: { id } });
  if (!existingRecipe) {
    throw new Error("Recipe not found");
  }

  if (existingRecipe.userId !== user.id) {
    throw new Error("You are not authorized to update this recipe");
  }

  const processedIngredients = await Promise.all(
    ingredients.map(async (ingredient: any) => {
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
    })
  );

  return prisma.recipe.update({
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
        deleteMany: {},
        create: processedIngredients,
      },
    },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
}

export async function deleteRecipe(id: string, user: any) {
  const existingRecipe = await prisma.recipe.findUnique({ where: { id } });
  if (!existingRecipe) {
    throw new Error("Recipe not found");
  }

  if (existingRecipe.userId !== user.id) {
    throw new Error("You are not authorized to delete this recipe");
  }

  await prisma.recipe.delete({ where: { id } });

  return { message: "Recipe deleted successfully" };
}