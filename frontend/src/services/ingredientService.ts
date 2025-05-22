const apiURL = import.meta.env.VITE_API_URL;

// Obter todos os ingredientes
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

// Obter um ingrediente pelo nome
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

// Criar um novo ingrediente
export const createIngredient = async (ingredientData: { name: string }): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

// Buscar ingredientes por nome (autocomplete)
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

// Atualizar um ingrediente
export const updateIngredient = async (
  id: string,
  ingredientData: { name: string }
): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/ingredients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

// Deletar um ingrediente
export const deleteIngredient = async (id: string): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await fetch(`${apiURL}/ingredients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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