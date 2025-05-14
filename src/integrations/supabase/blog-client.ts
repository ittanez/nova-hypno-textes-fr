
// Re-export the main Supabase client for now, since we're removing blog functionality
import { supabase } from './client';

export const supabaseBlog = supabase;
