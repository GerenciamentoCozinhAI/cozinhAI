// src/controllers/authController.ts
import { Request, Response } from "express";
import { supabase } from "../database/supabase";
import { prisma } from "../database/prisma";

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

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      res.status(500).send({ error: "Failed to log out" });
      return;
    }

    res.status(200).send({ message: "Logout successful" });
  } catch (err) {
    console.error("Unexpected error in logout:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const googleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, email, full_name, avatar_url } = req.body;

    if (!id || !email) {
      res.status(400).send({ error: "Dados do usuário incompletos." });
      return;
    }

    // Verificar se o usuário já existe no banco de dados
    let user = await prisma.user.findUnique({
      where: { id },
    });

    // Se o usuário não existir, criá-lo
    if (!user) {
      user = await prisma.user.create({
        data: {
          id,
          email,
          name: full_name || "Usuário",
          avatar: avatar_url || null,
        },
      });
    }

    res
      .status(200)
      .send({ message: "Usuário sincronizado com sucesso.", user });
  } catch (err) {
    console.error("Erro ao sincronizar usuário com o banco de dados:", err);
    res.status(500).send({ error: "Erro interno no servidor." });
  }
};
