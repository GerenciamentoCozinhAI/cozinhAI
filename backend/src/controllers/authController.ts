// src/controllers/authController.ts
import { Request, Response } from "express";
import { supabase } from "../services/supabase";
import { prisma } from "../services/prisma";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, avatar_url } = req.body;

    // Validação de campos obrigatórios
    if (!email || !password || !name) {
      res
        .status(400)
        .send({ error: "Missing required fields: email, password, and name" });
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            full_name: name,
            avatar_url,
          },
        },
      }
    );

    if (signUpError || !signUpData.user) {
      res
        .status(400)
        .send({ error: signUpError?.message || "Failed to sign up" });
      return;
    }

    const user = signUpData.user;

    try {
      await prisma.user.create({
        data: {
          id: user.id,
          name,
          email,
          avatar: avatar_url,
        },
      });
    } catch (prismaError) {
      console.error("Error saving user to database:", prismaError);
      // Rollback: Delete the user from Supabase if database operation fails
      await supabase.auth.admin.deleteUser(user.id);
      res.status(500).send({ error: "Failed to save user to database" });
      return;
    }

    res.status(201).send({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Unexpected error in register:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      res.status(400).send({ error: "Email and password are required" });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      res
        .status(401)
        .send({ error: error?.message || "Invalid email or password" });
      return;
    }

    res.status(200).send({
      message: "Login successful",
      user: data.user,
      session: data.session, // Inclui o access_token
    });
  } catch (err) {
    console.error("Unexpected error in login:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};
