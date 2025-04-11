//src/controllers/usersController.ts
import { Request, Response } from "express";

export const getMyUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = (req as any).user;
    const supabase = (req as any).supabase;

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Unexpected error in getMyUser:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};