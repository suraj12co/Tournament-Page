import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);