const apiURL = import.meta.env.VITE_API_URL;

// Obter todas as receitas
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
      throw errorData; // Agora lança o JSON do backend, igual ao createRecipe
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getAllRecipes:", error);
    throw error;
  }
};

// Obter uma receita pelo ID
export const getRecipeById = async (id: string): Promise<any> => {
  const token = localStorage.getItem("token");

  const headers: any = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${apiURL}/recipes/${id}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData; // Agora lança o JSON do backend, igual ao createRecipe
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getRecipeById:", error);
    throw error;
  }
};

// Obter receitas do usuário autenticado
export const getMyRecipes = async (): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/recipes/my-recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData; // Agora lança o JSON do backend, igual ao createRecipe
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getMyRecipes:", error);
    throw error;
  }
};

// Obter a quantidade de receitas do usuário autenticado
export const getMyRecipeCount = async (): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/recipes/count`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData; // Agora lança o JSON do backend, igual ao createRecipe
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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/recipes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/recipes/generate-with-ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData; // Agora lança o JSON do backend, igual ao createRecipe
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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData; // Agora lança o JSON do backend, igual ao createRecipe
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em updateRecipe:", error);
    throw error;
  }
};

// Deletar uma receita
export const deleteRecipe = async (id: string): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData; // Agora lança o JSON do backend, igual ao createRecipe
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em deleteRecipe:", error);
    throw error;
  }
};
