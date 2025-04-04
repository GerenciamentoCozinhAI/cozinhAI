import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password, name, avatar } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: name },
      emailRedirectTo: 'http://localhost:5173/confirm',
    },
  });
  if (error) return res.status(400).json({ error: error.message });

  const { error: insertError } = await supabase
    .from('users')
    .insert({ id: data.user?.id, email, name, avatar });
  if (insertError) return res.status(500).json({ error: insertError.message });

  return res.status(201).json({ user: data.user, token: data.session?.access_token });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  return res.status(200).json({ token: data.session?.access_token });
};

export const loginWithGoogle = async (req: Request, res: Response): Promise<any> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173/confirm',
    },
  });
  if (error) return res.status(400).json({ error: error.message });

  return res.status(200).json({ url: data.url });
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};