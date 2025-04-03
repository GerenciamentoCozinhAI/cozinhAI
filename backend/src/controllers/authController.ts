import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
  }

  // Passar name como user_metadata para display_name
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: name },
    },
  });
  if (error) return res.status(400).json({ error: error.message });

  // Inserir na tabela users
  const { error: insertError } = await supabase
    .from('users')
    .insert({ id: data.user?.id, email, name });
  if (insertError) return res.status(500).json({ error: insertError.message });

  return res.status(201).json({ user: data.user });
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

export const logout = async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};