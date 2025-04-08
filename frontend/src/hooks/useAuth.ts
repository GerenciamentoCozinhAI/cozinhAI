import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../services/authService';

type RegisterData = {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
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

  return {
    register,
    error,
    success,
  };
}
