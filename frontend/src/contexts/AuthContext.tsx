// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, logoutUser} from '../services/authService';
import { RegisterData, LoginData, AuthContextType } from '../types/authTypes';
import { supabase } from '../services/supabase'; // Importando o cliente do Supabase

const frontendURL = import.meta.env.VITE_FRONTEND_URL; // URL do frontend, para redirecionamento após login
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    syncAuthState();
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setError('');
      setSuccess('');
      await registerUser(data);
      setSuccess('Registro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setError('');
      setSuccess('');
      const res = await loginUser(data);
      localStorage.setItem('token', res.session.access_token);
      setIsAuthenticated(true);
      setSuccess('Login realizado com sucesso!');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Chamar o serviço de logout
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      supabase.auth.signOut(); // Logout do Supabase
      setIsAuthenticated(false);
      setError('');
      setSuccess('Logout realizado com sucesso!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar logout. Tente novamente.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError('');
      setSuccess('');
  
      // Inicia o login com Google - isso redireciona o usuário
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${frontendURL}/auth/callback`, // URL de retorno após o login
        },
      });
  
      if (error) throw new Error(error.message);
  
      // A partir daqui, nada mais vai ser executado imediatamente,
      // porque o usuário será redirecionado para o Google.
      // O restante deve acontecer na página de retorno após o login (ex: /callback ou /home)
      await syncAuthState();
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login com Google. Tente novamente.');
    }
  };

  const syncAuthState = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw new Error(error.message);
      if (data?.session) {
        localStorage.setItem('token', data.session.access_token);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao sincronizar estado de autenticação.');
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, register, login, loginWithGoogle, logout, error, success }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
}