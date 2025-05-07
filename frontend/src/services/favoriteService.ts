const apiURL = import.meta.env.VITE_API_URL;

// Obter todas as receitas favoritas do usuário
export const getAllFavorites = async (): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar receitas favoritas: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em getAllFavorites:", error);
    throw error;
  }
};

// Adicionar uma receita aos favoritos
export const addFavorite = async (recipeId: string): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/favorites/${recipeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar receita aos favoritos: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em addFavorite:", error);
    throw error;
  }
};

// Remover uma receita dos favoritos
export const removeFavorite = async (recipeId: string): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/favorites/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao remover receita dos favoritos: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em removeFavorite:", error);
    throw error;
  }
};