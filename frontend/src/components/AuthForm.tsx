import React, { useState, useEffect } from 'react';
import { register, login, loginWithGoogle, logout, getUserProfile } from '../lib/api';
import { supabase } from '../lib/supabase';
import { z } from 'zod';

// Definir esquema de validação com Zod
const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().optional(),
  avatar: z.string().url('Please enter a valid URL for avatar').optional(),
});

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

    const data = {
      email,
      password,
      ...(isRegister && { name, avatar }), // Incluir name e avatar apenas no registro
    };

    try {
      // Validar com Zod
      authSchema.parse(data);

      if (isRegister) {
        console.log('Dados enviados:', { email, password, name, avatar });
        const response = await register(email, password, name, avatar || undefined);
        if (response.error) throw new Error(response.error);
        localStorage.setItem('token', response.token);
        await supabase.auth.setSession({ access_token: response.token, refresh_token: '' });
        setMessage('Registration successful!');
        setIsLoggedIn(true);
        setUserProfile({
          id: response.user.id,
          email: response.user.email,
          name: response.user.user_metadata.full_name || response.user.user_metadata.name,
          avatar: response.user.user_metadata.avatar_url,
        });
      } else {
        const response = await login(email, password);
        if (response.error) throw new Error(response.error);
        localStorage.setItem('token', response.token);
        await supabase.auth.setSession({ access_token: response.token, refresh_token: '' });
        setMessage('Login successful!');
        setIsLoggedIn(true);
        setUserProfile(response.user);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message); // Mostrar a primeira mensagem de erro
      } else {
        setMessage(error.message);
      }
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
      setMessage('Logout successful!');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {userProfile?.name}!</h2>
        {userProfile?.avatar && <img src={userProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4" />}
        <p className="text-center">{userProfile?.email}</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
        <p className="mt-2 text-center text-green-500">{message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? 'Register' : 'Login'}
      </h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
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
                placeholder="https://example.com/image.jpg"
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
          <label className="block text-gray-700">Password</label>
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
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="w-full mt-4 bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition duration-200"
      >
        {isRegister ? 'Register with Google' : 'Login with Google'}
      </button>
      <p className="mt-2 text-center text-red-500">{message}</p>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-blue-500 underline hover:text-blue-700"
      >
        {isRegister ? 'Already have an account' : 'Want to register'}
      </button>
    </div>
  );
};

export default AuthForm;