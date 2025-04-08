// src/controllers/authController.ts
import { Request, Response } from "express";
import { supabase } from "../services/supabase";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, name, avatar_url } = req.body;

    // Validação de campos obrigatórios
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields: email, password, and name" });
    }

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

    const { error: dbError } = await supabase.from("usuarios").insert([
      {
        id: user.id,
        name,
        avatar_url,
        favorites: [],
      },
    ]);

    if (dbError) {
      return res.status(500).json({ error: dbError.message });
    }

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Unexpected error in register:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    return res.json({
      message: "Login successful",
      user: data.user,
      session: data.session, // Inclui o access_token
    });
  } catch (err) {
    console.error("Unexpected error in login:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
