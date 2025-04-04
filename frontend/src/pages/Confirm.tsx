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

            // Se for login com Google, inserir na tabela users
            const { user } = data;
            if (user) {
              const { error: insertError } = await supabase
                .from('users')
                .upsert({
                  id: user.id,
                  email: user.email,
                  name: user.user_metadata.display_name || 'Usuário Google',
                  avatar: user.user_metadata.avatar_url || '',
                });
              if (insertError) console.error('Erro ao inserir usuário:', insertError.message);
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