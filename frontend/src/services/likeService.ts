const apiURL = import.meta.env.VITE_API_URL;

// Adicionar um like a uma receita
export const addLike = async (recipeId: string): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/likes/${recipeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao curtir a receita: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em addLike:", error);
    throw error;
  }
};

// Remover um like de uma receita
export const removeLike = async (recipeId: string): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/likes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao remover curtida da receita: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em removeLike:", error);
    throw error;
  }
};