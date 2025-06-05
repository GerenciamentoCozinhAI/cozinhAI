import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).send({ message: "User registered successfully", user });
  } catch (err: any) {
    res.status(400).send({ error: err.message || "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).send({
      message: "Login successful",
      user: result.user,
      session: result.session,
    });
  } catch (err: any) {
    res.status(401).send({ error: err.message || "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await authService.logoutUser();
    res.status(200).send({ message: "Logout successful" });
  } catch (err: any) {
    res.status(500).send({ error: err.message || "Internal server error" });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authService.syncGoogleUser(req.body);
    res.status(200).send({ message: "Usuário sincronizado com sucesso.", user });
  } catch (err: any) {
    res.status(500).send({ error: err.message || "Erro interno no servidor." });
  }
};