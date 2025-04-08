//src/hooks/useAuth.ts

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser, loginUser } from '../services/authService';

type RegisterData = {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
};

type LoginData = {
    email: string;
    password: string;
  };

  export function useAuth() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  
    const register = async (data: RegisterData) => {
      try {
        setError('');
        setSuccess('');
        await registerUser(data);
        setSuccess('Registro realizado com sucesso! Redirecionando...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err: any) {
        setError(err.message);
      }
    };
  
    const login = async (data: LoginData) => {
      try {
        setError('');
        setSuccess('');
        // Aqui você pode chamar seu loginUser()
        await loginUser(data);
        setSuccess('Login realizado com sucesso! Redirecionando...');
        setTimeout(() => navigate('/home'), 2000);
      } catch (err: any) {
        setError(err.message);
      }
    };
  
    return {
      register,
      login,
      error,
      success,
    };
  }