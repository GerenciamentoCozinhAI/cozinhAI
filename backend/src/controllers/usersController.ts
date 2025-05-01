//src/controllers/userController.ts'
import { Request, Response } from "express";
import { prisma } from "../services/prisma";

// GET: Buscar informações do auth.users
export const getMyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;

    // Buscar informações do Prisma
    const prismaUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

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
export const replaceMyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;
    const { email, phone, user_metadata, name, avatar } = req.body;

    // Preparar o payload para o Supabase
    const supabaseUpdateData: any = {};
    if (email) supabaseUpdateData.email = email;
    if (phone) supabaseUpdateData.phone = phone;
    if (user_metadata || name || avatar) {
      supabaseUpdateData.user_metadata = {
        ...(user_metadata || {}),
        ...(name && { full_name: name, name: name }),
        ...(avatar && { avatar_url: avatar, picture: avatar }),
      };
    }

    // Atualizar informações no auth.users
    const { data: authData, error: authError } =
      await supabase.auth.admin.updateUserById(user.id, supabaseUpdateData);

    if (authError) {
      console.error("Error replacing user in auth.users:", authError);
      res.status(500).send({ error: authError.message });
      return;
    }

    // Atualizar informações no banco de dados Prisma
    try {
      const prismaUpdateData: any = {};
      if (email) prismaUpdateData.email = email;
      if (name) prismaUpdateData.name = name;
      if (avatar) prismaUpdateData.avatar = avatar;
      if (phone) prismaUpdateData.phone = phone;

      const replacedUser = await prisma.user.update({
        where: { id: user.id },
        data: prismaUpdateData,
      });

      res.send({
        message: "User replaced successfully",
        authUser: authData,
        prismaUser: replacedUser,
      });
    } catch (prismaError) {
      console.error("Error replacing user in Prisma:", prismaError);
      res.status(500).send({ error: "Failed to replace user in database" });
    }
  } catch (err) {
    console.error("Unexpected error in replaceMyUser:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// PATCH: Atualizar informações parciais no auth.users e Prisma
export const updateMyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;
    const { email, phone, user_metadata, name, avatar } = req.body;

    // Preparar o payload para o Supabase
    const supabaseUpdateData: any = {};
    if (email) supabaseUpdateData.email = email;
    if (phone) supabaseUpdateData.phone = phone;
    if (user_metadata || name || avatar) {
      supabaseUpdateData.user_metadata = {
        ...(user_metadata || {}),
        ...(name && { full_name: name, name: name }),
        ...(avatar && { avatar_url: avatar, picture: avatar }),
      };
    }

    // Atualizar informações no auth.users
    const { data: authData, error: authError } =
      await supabase.auth.admin.updateUserById(user.id, supabaseUpdateData);

    if (authError) {
      console.error("Error updating user in auth.users:", authError);
      res.status(500).send({ error: authError.message });
      return;
    }

    // Atualizar informações no banco de dados Prisma
    try {
      const prismaUpdateData: any = {};
      if (email) prismaUpdateData.email = email;
      if (name) prismaUpdateData.name = name;
      if (avatar) prismaUpdateData.avatar = avatar;
      if (phone) prismaUpdateData.phone = phone;

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: prismaUpdateData,
      });

      res.send({
        message: "User updated successfully",
        authUser: authData,
        prismaUser: updatedUser,
      });
    } catch (prismaError) {
      console.error("Error updating user in Prisma:", prismaError);
      res.status(500).send({ error: "Failed to update user in database" });
    }
  } catch (err) {
    console.error("Unexpected error in updateMyUser:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// DELETE: Remover usuário do auth.users e do Prisma
export const deleteMyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;

    // Remover usuário do auth.users
    const { error: authError } = await supabase.auth.admin.deleteUser(user.id);

    if (authError) {
      console.error("Error deleting user from auth.users:", authError.message);
      res.status(500).send({ error: "Failed to delete user from auth.users" });
    }

    // Remover usuário do banco de dados Prisma
    try {
      await prisma.user.delete({ where: { id: user.id } });
    } catch (prismaError) {
      console.error("Error deleting user from Prisma:", prismaError);
      res
        .status(500)
        .send({ error: "Failed to delete user from Prisma database" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Unexpected error in deleteMyUser:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};
