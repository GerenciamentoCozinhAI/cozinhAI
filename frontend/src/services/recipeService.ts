import { fetchWithAuth } from "./fetchWithAuth";
const apiURL = import.meta.env.VITE_API_URL;

// Obter todas as receitas (rota pública)
export const getAllRecipes = async (): Promise<any> => {
  try {
    const response = await fetch(`${apiURL}/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getAllRecipes:", error);
    throw error;
  }
};

// Obter uma receita pelo ID (rota pública)
export const getRecipeById = async (id: string): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/recipes/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getRecipeById:", error);
    throw error;
  }
};

// Obter receitas do usuário autenticado
export const getMyRecipes = async (): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/recipes/my-recipes`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getMyRecipes:", error);
    throw error;
  }
};

// Obter a quantidade de receitas do usuário autenticado
export const getMyRecipeCount = async (): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/recipes/count`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getMyRecipeCount:", error);
    throw error;
  }
};

// Criar uma nova receita
export const createRecipe = async (recipeData: {
  title: string;
  description?: string;
  difficulty?: number;
  instructions?: string;
  prepTime?: number;
  servings?: number;
  image?: string;
  isGeneratedByAI?: boolean;
  ingredients: { name: string; quantity: number; unit: string }[];
}): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/recipes/create`, {
      method: "POST",
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em createRecipe:", error);
    throw error;
  }
};

// Criar uma receita gerada por IA
export const createRecipeWithAI = async (data: {
  ingredients: { name: string; quantity: number; unit: string }[];
  observations?: string;
}): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/recipes/generate-with-ai`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em createRecipeWithAI:", error);
    throw error;
  }
};

// Atualizar uma receita
export const updateRecipe = async (
  id: string,
  recipeData: {
    title: string;
    description?: string;
    difficulty?: number;
    instructions?: string;
    prepTime?: number;
    servings?: number;
    image?: string;
    isGeneratedByAI?: boolean;
    ingredients: { name: string; quantity: number; unit: string }[];
  }
): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em updateRecipe:", error);
    throw error;
  }
};

// Deletar uma receita
export const deleteRecipe = async (id: string): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/recipes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em deleteRecipe:", error);
    throw error;
  }
};