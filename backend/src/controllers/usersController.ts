//src/controllers/userController.ts'
import { Request, Response } from "express";
import { prisma } from "../services/prisma";

// GET: Buscar informações do auth.users
export const getMyUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;

    // Buscar informações do auth.users
    const { data, error } = await supabase.auth.admin.getUserById(user.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Unexpected error in getMyUser:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH: Atualizar informações parciais no auth.users
export const updateMyUser = async (
  req: Request,
  res: Response
): Promise<any> => {
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
      return res.status(500).json({ error: authError.message });
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

      return res.json({
        message: "User updated successfully",
        authUser: authData,
        prismaUser: updatedUser,
      });
    } catch (prismaError) {
      console.error("Error updating user in Prisma:", prismaError);
      return res.status(500).json({ error: "Failed to update user in database" });
    }
  } catch (err) {
    console.error("Unexpected error in updateMyUser:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE: Remover usuário do auth.users e do Prisma
export const deleteMyUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;

    // Remover usuário do auth.users
    const { error: authError } = await supabase.auth.admin.deleteUser(user.id);

    if (authError) {
      console.error("Error deleting user from auth.users:", authError.message);
      return res.status(500).json({ error: "Failed to delete user from auth.users" });
    }

    // Remover usuário do banco de dados Prisma
    try {
      await prisma.user.delete({ where: { id: user.id } });
    } catch (prismaError) {
      console.error("Error deleting user from Prisma:", prismaError);
      return res.status(500).json({ error: "Failed to delete user from Prisma database" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Unexpected error in deleteMyUser:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};