const API_URL = import.meta.env.API_URL as string;;

export const register = async (email: string, password: string, name: string, avatar?: string) => {
  try {
    console.log('Enviando registro:', { email, password, name, avatar });
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, avatar }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Erro ao registrar');
    }
    return response.json();
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
      throw new Error(errorData || 'Erro ao fazer login');
    }
    return response.json();
  } catch (error) {
    console.error('Erro no fetch:', error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await fetch(`${API_URL}/google`);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Erro ao iniciar login com Google');
    }
    const { url } = await response.json();
    window.location.href = url; // Redireciona para o Google
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
      throw new Error(errorData || 'Erro ao fazer logout');
    }
    return response.json();
  } catch (error) {
    console.error('Erro no fetch:', error);
    throw error;
  }
};