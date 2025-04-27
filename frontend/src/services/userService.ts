const apiURL = import.meta.env.VITE_API_URL;

// Obter informações do usuário
export const getMyUser = async (): Promise<any> => {
    try {
      const response = await fetch(`${apiURL}/users/me`, {
        method: "GET",
        credentials: "include", // Inclui cookies na requisição
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro em getMyUser:", error);
      throw error;
    }
  };
  
  // Substituir completamente as informações do usuário
  export const replaceMyUser = async (userData: {
    email: string;
    phone?: string;
    user_metadata?: Record<string, any>;
    name?: string;
    avatar?: string;
  }): Promise<any> => {
    try {
      const response = await fetch(`${apiURL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao substituir usuário: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro em replaceMyUser:", error);
      throw error;
    }
  };
  
  // Atualizar informações parciais do usuário
  export const updateMyUser = async (userData: {
    email?: string;
    phone?: string;
    user_metadata?: Record<string, any>;
    name?: string;
    avatar?: string;
  }): Promise<any> => {
    try {
      const response = await fetch(`${apiURL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao atualizar usuário: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro em updateMyUser:", error);
      throw error;
    }
  };
  
  // Remover usuário
  export const deleteMyUser = async (): Promise<any> => {
    try {
      const response = await fetch(`${apiURL}/users/me`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao deletar usuário: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro em deleteMyUser:", error);
      throw error;
    }
  };