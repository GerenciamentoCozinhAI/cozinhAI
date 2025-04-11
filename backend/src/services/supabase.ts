// src/services/supabase.ts
import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY_ADM!; //process.env.SUPABASE_KEY_ANON! ou process.env.SUPABASE_KEY_ANON!
export const supabase = createClient(supabaseUrl, supabaseKey);
