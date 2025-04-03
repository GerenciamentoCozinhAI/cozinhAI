import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Confirm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('URL completa:', window.location.href);
    const hash = location.hash;
    console.log('Hash:', hash);
    const params = new URLSearchParams(hash.replace('#', ''));
    const accessToken = params.get('access_token');
    console.log('Access Token:', accessToken);

    if (accessToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: '' })
        .then(({ data, error }) => {
          if (error) {
            console.error('Erro ao confirmar:', error.message);
          } else {
            console.log('Sessão configurada:', data);
            localStorage.setItem('token', accessToken);
            console.log('Email confirmado com sucesso!');
            navigate('/');
          }
        });
    } else {
      console.error('Token de confirmação não encontrado');
      navigate('/');
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h2 className="text-2xl font-bold">Confirmando seu email...</h2>
    </div>
  );
};

export default Confirm;