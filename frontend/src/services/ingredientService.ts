import { fetchWithAuth } from "./fetchWithAuth";
const apiURL = import.meta.env.VITE_API_URL;

// Obter todos os ingredientes (rota pública)
export const getAllIngredients = async (): Promise<any> => {
  try {
    const response = await fetch(`${apiURL}/ingredients`, {
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
    console.error("Erro em getAllIngredients:", error);
    throw error;
  }
};

// Obter um ingrediente pelo nome (rota pública)
export const getIngredientByName = async (name: string): Promise<any> => {
  try {
    const response = await fetch(`${apiURL}/ingredients/${name}`, {
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
    console.error("Erro em getIngredientByName:", error);
    throw error;
  }
};

// Criar um novo ingrediente (autenticado)
export const createIngredient = async (ingredientData: { name: string }): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/ingredients`, {
      method: "POST",
      body: JSON.stringify(ingredientData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em createIngredient:", error);
    throw error;
  }
};

// Buscar ingredientes por nome (autocomplete, rota pública)
export const searchIngredients = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch(`${apiURL}/ingredients/search?name=${query}`, {
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
    console.error("Erro em searchIngredients:", error);
    throw error;
  }
};

// Atualizar um ingrediente (autenticado)
export const updateIngredient = async (
  id: string,
  ingredientData: { name: string }
): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/ingredients/${id}`, {
      method: "PUT",
      body: JSON.stringify(ingredientData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em updateIngredient:", error);
    throw error;
  }
};

// Deletar um ingrediente (autenticado)
export const deleteIngredient = async (id: string): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/ingredients/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em deleteIngredient:", error);
    throw error;
  }
};