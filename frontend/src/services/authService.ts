import { supabase } from "../lib/supabase";
import { RegisterPayload } from "../types/authTypes";
import { fetchWithAuth } from "./fetchWithAuth"; // Importa o helper
const apiURL = import.meta.env.VITE_API_URL;

export async function registerUser(data: RegisterPayload) {
  const res = await fetch(`${apiURL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error || "Erro ao registrar usuário");
  return json;
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error || "Erro ao fazer login");
  return json;
}

export async function logoutUser() {
  // Usa o fetchWithAuth para garantir tratamento de token expirado
  const res = await fetchWithAuth(`${apiURL}/auth/logout`, {
    method: "POST",
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error || "Erro ao fazer logout");
  return json;
}

export async function googleAuth() {
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error(error?.message || "Erro ao obter usuário do Supabase");
  }

  const res = await fetch(`${apiURL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: user.user.id,
      email: user.user.email,
      full_name: user.user.user_metadata.full_name,
      avatar_url: user.user.user_metadata.avatar_url,
    }),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error || "Erro ao autenticar com o Google");
  return json;
}