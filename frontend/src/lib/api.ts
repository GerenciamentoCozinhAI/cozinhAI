const API_URL = 'http://localhost:3000/auth';

export const register = async (email: string, password: string, name: string) => {
    try {
      console.log('Enviando registro:', { email, password, name });
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData || 'Erro ao registrar');
      }
      const data = await response.json();
      console.log('Resposta do backend:', data);
      return data;
    } catch (error) {
      console.error('Erro no fetch:', error);
      throw error;
    }
  };
  
  export const login = async (email: string, password: string) => {
    try {
      console.log('Enviando login:', { email, password });
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData || 'Erro ao fazer login');
      }
      return response.json();
    } catch (error) {
      console.error('Erro no fetch:', error);
      throw error;
    }
  };
  
  export const logout = async () => {
    try {
      console.log('Enviando logout');
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData || 'Erro ao fazer logout');
      }
      return response.json();
    } catch (error) {
      console.error('Erro no fetch:', error);
      throw error;
    }
  };