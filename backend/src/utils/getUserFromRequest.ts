//src/utils/getUserFromRequest.ts

import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseADMKey = process.env.SUPABASE_KEY_ADM!;

// Instância reutilizável do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseADMKey);

export const getUserFromRequest = async (req: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.warn('Authorization token not provided');
      return null;
    }

    // Configura o cabeçalho de autorização dinamicamente
    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }

    if (!data?.user) {
      console.warn('User not found');
      return null;
    }

    return { user: data.user, supabase };
  } catch (err) {
    console.error('Unexpected error in getUserFromRequest:', err);
    return null;
  }
};