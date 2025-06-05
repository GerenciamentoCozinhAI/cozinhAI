// src/services/fetchWithAuth.ts
import { showGlobalToast } from "../contexts/ToastContext";

// Helper para requisições autenticadas
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });

  // Trata token expirado ou inválido
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    showGlobalToast("Sessão expirada. Faça login novamente.", "error", 3000);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  return response;
}