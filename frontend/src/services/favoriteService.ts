import { fetchWithAuth } from "./fetchWithAuth";
const apiURL = import.meta.env.VITE_API_URL;

// Obter todas as receitas favoritas do usuário
export const getAllFavorites = async (): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/favorites`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erro em getAllFavorites:", error);
    throw error;
  }
};

// Obter a quantidade de receitas favoritas do usuário
export const getFavoriteCount = async (): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/favorites/count`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getFavoriteCount:", error);
    throw error;
  }
};

// Adicionar uma receita aos favoritos
export const addFavorite = async (recipeId: string): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/favorites/${recipeId}`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em addFavorite:", error);
    throw error;
  }
};

// Remover uma receita dos favoritos
export const removeFavorite = async (recipeId: string): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/favorites/${recipeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em removeFavorite:", error);
    throw error;
  }
};