import { Request, Response } from "express";

export const createUsuario = async (req: Request, res: Response): Promise<any> => {
  const user = (req as any).user;
  const supabase = (req as any).supabase;

  const name = user.user_metadata?.full_name || "Unnamed";
  const avatar_url = user.user_metadata?.avatar_url || null;

  const { error } = await supabase.from("usuarios").insert([
    {
      id: user.id,
      name,
      avatar_url,
      favorites: [],
    },
  ]);

  if (error) return res.status(500).json({ error: error.message });

  return res.status(201).json({ message: "Usuario profile created" });
};

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
