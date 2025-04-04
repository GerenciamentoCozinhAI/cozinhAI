import React, { useState, useEffect } from 'react';
import { register, login, loginWithGoogle, logout, getUserProfile } from '../lib/api';
import { supabase } from '../lib/supabase';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      supabase.auth.setSession({ access_token: token, refresh_token: '' })
        .then(({ data, error }) => {
          if (!error && data.user) {
            setIsLoggedIn(true);
            getUserProfile().then(setUserProfile).catch(console.error);
          }
        });
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Evento de autenticação:', event, session);
      if (event === 'SIGNED_IN' && session) {
        localStorage.setItem('token', session.access_token);
        setIsLoggedIn(true);
        getUserProfile().then(setUserProfile).catch(console.error);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isRegister) {
        console.log('Dados enviados:', { email, password, name, avatar });
        const data = await register(email, password, name, avatar || undefined);
        if (data.error) throw new Error(data.error);
        localStorage.setItem('token', data.token);
        await supabase.auth.setSession({ access_token: data.token, refresh_token: '' });
        setMessage('Registro concluído!');
        setIsLoggedIn(true);
        setUserProfile({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.full_name || data.user.user_metadata.name,
          avatar: data.user.user_metadata.avatar_url,
        });
      } else {
        const data = await login(email, password);
        if (data.error) throw new Error(data.error);
        localStorage.setItem('token', data.token);
        await supabase.auth.setSession({ access_token: data.token, refresh_token: '' });
        setMessage('Login bem-sucedido!');
        setIsLoggedIn(true);
        setUserProfile(data.user); // Usar dados retornados pelo backend
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logout();
      if (data.error) throw new Error(data.error);
      await supabase.auth.signOut();
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUserProfile(null);
      setEmail('');
      setPassword('');
      setName('');
      setAvatar('');
      setMessage('Logout realizado com sucesso!');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Bem-vindo, {userProfile?.name}!</h2>
        {userProfile?.avatar && <img src={userProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4" />}
        <p className="text-center">{userProfile?.email}</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
        >
          Sair
        </button>
        <p className="mt-2 text-center text-green-500">{message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? 'Registrar' : 'Login'}
      </h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Avatar (URL)</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          {isRegister ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition duration-200"
      >
        {isRegister ? 'Cadastrar com Google' : 'Entrar com Google'}
      </button>
      <p className="mt-2 text-center text-red-500">{message}</p>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-blue-500 underline hover:text-blue-700"
      >
        {isRegister ? 'Já tenho conta' : 'Quero me cadastrar'}
      </button>
    </div>
  );
};

export default AuthForm;