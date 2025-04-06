// src/controllers/authController.ts
import { Request, Response } from "express";
import { supabase } from "../services/supabase";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password, name, avatar_url } = req.body;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        avatar_url,
      },
    },
  });

  if (signUpError || !signUpData.user) {
    return res.status(400).json({ error: signUpError?.message || "Failed to sign up" });
  }

  const user = signUpData.user;

  // Cria entrada na tabela `usuarios`
  const { error: dbError } = await supabase.from("usuarios").insert([
    {
      id: user.id,
      name,
      avatar_url,
      favorites: [],
    },
  ]);

  if (dbError) return res.status(500).json({ error: dbError.message });

  return res.status(201).json({ message: "User registered successfully", user });
};

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      return res.status(401).json({ error: error.message });
    }
  
    return res.json({
      message: 'Login successful',
      user: data.user,
      session: data.session, // inclui o access_token que você usará nas rotas protegidas
    });
  };