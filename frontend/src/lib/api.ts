const API_URL = import.meta.env.VITE_API_URL as string;;
import { supabase } from './supabase';

export const register = async (email: string, password: string, name: string, avatar?: string) => {
  try {
    console.log('Enviando registro:', { email, password, name, avatar });
    const url = `${API_URL}/register`;
    console.log('URL completa:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, avatar }),
    });
    const responseText = await response.text();
    console.log('Resposta bruta:', responseText);
    if (!response.ok) {
      throw new Error(responseText || 'Erro ao registrar');
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Erro no fetch:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    console.log('Enviando login:', { email, password });
    const url = `${API_URL}/login`;
    console.log('URL completa:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseText = await response.text();
    console.log('Resposta bruta:', responseText);
    if (!response.ok) {
      throw new Error(responseText || 'Erro ao fazer login');
    }
    return JSON.parse(responseText); // Retorna { token, user }
  } catch (error) {
    console.error('Erro no fetch:', error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    console.log('Iniciando login com Google');
    const url = `${API_URL}/google`;
    console.log('URL completa:', url);
    const response = await fetch(url);
    const responseText = await response.text();
    console.log('Resposta bruta:', responseText);
    if (!response.ok) {
      throw new Error(responseText || 'Erro ao iniciar login com Google');
    }
    const { url: googleUrl } = JSON.parse(responseText);
    window.location.href = googleUrl;
  } catch (error) {
    console.error('Erro no fetch:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    console.log('Enviando logout');
    const url = `${API_URL}/logout`;
    console.log('URL completa:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const responseText = await response.text();
    console.log('Resposta bruta:', responseText);
    if (!response.ok) {
      throw new Error(responseText || 'Erro ao fazer logout');
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Erro no fetch:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return {
    id: data.user?.id,
    email: data.user?.email,
    name: data.user?.user_metadata.full_name || data.user?.user_metadata.name,
    avatar: data.user?.user_metadata.avatar_url,
  };
};