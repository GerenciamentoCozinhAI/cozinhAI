// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, logoutUser } from '../services/authService';
import { RegisterData, LoginData, AuthContextType } from '../types/authTypes';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const register = async (data: RegisterData) => {
    try {
      setError('');
      setSuccess('');
      await registerUser(data);
      setSuccess('Registro realizado com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
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
      setTimeout(() => navigate('/home'), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Chamar o serviço de logout
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setError('');
      setSuccess('Logout realizado com sucesso!');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar logout. Tente novamente.');
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, register, login, logout, error, success }}
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
