import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { z } from 'zod';

// Definir esquema de validação com Zod
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(1, 'Name is required'),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = registerSchema.parse(req.body);

    const { email, password, name, avatar } = data;

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, avatar_url: avatar },
      },
    });
    if (error) return res.status(400).json({ error: error.message });

    const { error: insertError } = await supabase
      .from('users')
      .insert({ id: authData.user?.id, name });
    if (insertError) return res.status(500).json({ error: insertError.message });

    return res.status(201).json({ user: authData.user, token: authData.session?.access_token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = loginSchema.parse(req.body);

    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      token: authData.session?.access_token,
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        name: authData.user?.user_metadata.full_name || authData.user?.user_metadata.name,
        avatar: authData.user?.user_metadata.avatar_url,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
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
  const { error } = await supabase.auth.signOut();
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: 'Logout successful' });
};