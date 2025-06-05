import { fetchWithAuth } from "./fetchWithAuth";
const apiURL = import.meta.env.VITE_API_URL;

// Adicionar um like a uma receita
export const addLike = async (recipeId: string): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/likes/${recipeId}`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em addLike:", error);
    throw error;
  }
};

// Remover um like de uma receita
export const removeLike = async (recipeId: string): Promise<any> => {
  try {
    const response = await fetchWithAuth(`${apiURL}/likes/${recipeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em removeLike:", error);
    throw error;
  }
};