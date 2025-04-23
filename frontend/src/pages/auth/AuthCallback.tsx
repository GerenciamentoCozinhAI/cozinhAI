// src/pages/AuthCallback.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase'; // ajuste para onde você exporta o client
import { googleAuth } from '../../services/authService'; // ajuste se necessário
import { useAuth } from '../../contexts/AuthContext'; // ajuste para onde você exporta o contexto de autenticação

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setIsAuthenticated } = useAuth(); // Obtenha a função de autenticação do contexto

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (error || !session) {
        console.error('Erro ao obter sessão:', error?.message);
        setError('Erro ao autenticar usuário. Tente novamente.');
        return;
      }

      try {
        await googleAuth();
      } catch (authError) {
        console.error('Erro ao autenticar com Google:', authError.message);
        setError(authError.message);
        return;
      }

      localStorage.setItem('token', session.access_token);
      setIsAuthenticated(true); // Atualize o estado de autenticação no contexto
      setSuccess('Login realizado com sucesso!');
      setTimeout(() => navigate('/home'), 2000);
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold mb-4">Autenticando...</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default AuthCallback;
