//src/controllers/usersController.ts
import { Request, Response } from "express";

export const getMyUsuario = async (req: Request, res: Response): Promise<any> => {
  const user = (req as any).user;
  const supabase = (req as any).supabase;

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const updateFavorites = async (req: Request, res: Response): Promise<any> => {
  const user = (req as any).user;
  const supabase = (req as any).supabase;
  const { favorites } = req.body;

  const { error } = await supabase
    .from("usuarios")
    .update({ favorites })
    .eq("id", user.id);

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ message: "Favorites updated" });
};
