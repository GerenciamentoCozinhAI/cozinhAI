import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY_ADM!; //process.env.SUPABASE_KEY_ADM! ou process.env.SUPABASE_KEY_ANON!
export const supabase = createClient(supabaseUrl, supabaseKey);