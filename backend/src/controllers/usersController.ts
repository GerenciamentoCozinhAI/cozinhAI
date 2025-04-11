//src/controllers/userController.ts'
import { Request, Response } from "express";
import { prisma } from "../services/prisma";

// GET: Buscar informações do auth.users
export const getMyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;

    // Buscar informações do auth.users
    const { data, error } = await supabase.auth.admin.getUserById(user.id);

    if (error) {
      res.status(500).send({ error: error.message });
    }

    res.send(data);
  } catch (err) {
    console.error("Unexpected error in getMyUser:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};

// PATCH: Atualizar informações parciais no auth.users
export const updateMyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;
    const { email, phone, user_metadata, name, avatar } = req.body;

    // Atualizar informações parciais no auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.updateUserById(user.id, {
      ...(email && { email }),
      ...(phone && { phone }),
      ...(user_metadata && { user_metadata }),
    });

    if (authError) {
      res.status(500).send({ error: authError.message });
    }

    // Atualizar informações parciais no banco de dados Prisma
    try {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(email && { email }),
          ...(name && { name }),
          ...(avatar && { avatar }),
        },
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
      res.status(500).send({ error: "Failed to delete user from Prisma database" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Unexpected error in deleteMyUser:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};