import { Request, Response } from "express";
import * as userService from "../services/userService";

// GET: Buscar informações do usuário
export const getMyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const prismaUser = await userService.getMyUser(userId);

    if (prismaUser) {
      res.send(prismaUser);
      return;
    }

    res.status(404).send({ error: "User not found" });
  } catch (err) {
    console.error("Unexpected error in getMyUser:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// PUT: Substituir completamente as informações do usuário
export const replaceMyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const supabase = (req as any).supabase;
    const result = await userService.replaceMyUser(userId, supabase, req.body);

    res.send({
      message: "User replaced successfully",
      ...result,
    });
  } catch (err: any) {
    res.status(500).send({ error: err.message || "Internal server error" });
  }
};

// PATCH: Atualizar informações parciais do usuário
export const updateMyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const supabase = (req as any).supabase;
    const result = await userService.updateMyUser(userId, supabase, req.body);

    res.send({
      message: "User updated successfully",
      ...result,
    });
  } catch (err: any) {
    res.status(500).send({ error: err.message || "Internal server error" });
  }
};

// DELETE: Remover usuário
export const deleteMyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const supabase = (req as any).supabase;
    const result = await userService.deleteMyUser(userId, supabase);

    res.status(200).send(result);
  } catch (err: any) {
    res.status(500).send({ error: err.message || "Internal server error" });
  }
};