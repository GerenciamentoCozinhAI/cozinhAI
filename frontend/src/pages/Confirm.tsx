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
    const refreshToken = params.get('refresh_token') || '';

    if (accessToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(async ({ data, error }) => {
          if (error) {
            console.error('Erro ao confirmar:', error.message);
          } else {
            console.log('Sessão configurada:', data);
            localStorage.setItem('token', accessToken);

            const { user } = data;
            if (user) {
              console.log('Metadados do usuário:', user.user_metadata);
              const googleName = user.user_metadata.display_name || user.user_metadata.name || 'Usuário sem nome';
              const { error: insertError } = await supabase
                .from('users')
                .upsert({
                  id: user.id,
                  name: googleName, // Apenas id e name
                });
              if (insertError) console.error('Erro ao inserir usuário:', insertError.message);
              else console.log('Usuário inserido na tabela:', { id: user.id, name: googleName });
            }

            console.log('Confirmação concluída!');
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
      <h2 className="text-2xl font-bold">Confirmando...</h2>
    </div>
  );
};

export default Confirm;