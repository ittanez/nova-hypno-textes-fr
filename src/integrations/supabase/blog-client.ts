
// Client Supabase spécifique pour BlogHypnose
import { createClient } from '@supabase/supabase-js';
import type { BlogDatabase } from './blog-types';

// Configuration pour votre projet BlogHypnose
const BLOG_SUPABASE_URL = "https://bssiuorshuaizrzkvhgv.supabase.co";
const BLOG_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzc2l1b3JzaHVhaXpyemt2aGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5Nzk0MjgsImV4cCI6MjA2MjU1NTQyOH0._6Vwt_Z4TfkhikhDpuGqkD8tXSPaCw-vfIYxAv_YNZ8";

// Client dédié pour BlogHypnose
export const supabaseBlog = createClient<BlogDatabase>(BLOG_SUPABASE_URL, BLOG_SUPABASE_ANON_KEY, {
  auth: {
    storage: window.sessionStorage, // Utiliser sessionStorage pour éviter les conflits
    storageKey: 'bloghypnose_auth', // Clé spécifique à BlogHypnose
    persistSession: true,
    autoRefreshToken: true,
  }
});

