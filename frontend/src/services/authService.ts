//src/services/authService.ts
import { RegisterPayload } from '../types/authTypes';
const apiURL = import.meta.env.VITE_API_URL;


export async function registerUser(data: RegisterPayload) {
  const res = await fetch(`${apiURL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error || 'Erro ao registrar usuário');
  return json;
}

export async function loginUser(data: { email: string; password: string }) {
    const res = await fetch(`${apiURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    const json = await res.json();
  
    if (!res.ok) throw new Error(json.error || 'Erro ao fazer login');
    return json;
  }
  