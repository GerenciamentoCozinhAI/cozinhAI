import React, { useState, useEffect } from 'react';
import { register, login, logout } from '../lib/api';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isRegister) {
        const data = await register(email, password, name);
        if (data.error) throw new Error(data.error);
        setMessage('Registro concluído! Confime seu email! Faça login para continuar.');
        setIsRegister(false); // Volta para o modo login após registro
      } else {
        const data = await login(email, password);
        if (data.error) throw new Error(data.error);
        localStorage.setItem('token', data.token);
        setMessage('Login bem-sucedido!');
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logout();
      if (data.error) throw new Error(data.error);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setMessage('Logout realizado com sucesso!');
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Bem-vindo!</h2>
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