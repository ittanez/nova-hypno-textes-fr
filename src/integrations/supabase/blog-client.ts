
// Client Supabase spécifique pour BlogHypnose
import { createClient } from '@supabase/supabase-js';
import type { BlogDatabase } from './blog-types';

// Configuration pour votre projet BlogHypnose
// Ces valeurs doivent être remplacées par celles de votre projet Supabase
const BLOG_SUPABASE_URL = "https://votre-projet-bloghypnose.supabase.co";
const BLOG_SUPABASE_ANON_KEY = "votre-clé-anon-bloghypnose";

// Client dédié pour BlogHypnose
export const supabaseBlog = createClient<BlogDatabase>(BLOG_SUPABASE_URL, BLOG_SUPABASE_ANON_KEY, {
  auth: {
    storage: window.sessionStorage, // Utiliser sessionStorage pour éviter les conflits
    storageKey: 'bloghypnose_auth', // Clé spécifique à BlogHypnose
    persistSession: true,
    autoRefreshToken: true,
  }
});

// IMPORTANT: Remplacez les valeurs ci-dessus par celles 
// de votre projet Supabase BlogHypnose
