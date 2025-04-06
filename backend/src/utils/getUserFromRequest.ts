import { createClient } from '@supabase/supabase-js';

export const getUserFromRequest = async (req: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY_ANON!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;

  return { user: data.user, supabase };
};
