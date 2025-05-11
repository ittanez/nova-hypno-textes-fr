
// Client Supabase spécifique pour BlogHypnose
import { createClient } from '@supabase/supabase-js';
import type { BlogDatabase } from './blog-types';

// Configuration pour le nouveau projet BlogHypnose
// Remplacez ces valeurs par celles de votre nouveau projet Supabase
const BLOG_SUPABASE_URL = "https://votre-nouveau-projet.supabase.co";
const BLOG_SUPABASE_ANON_KEY = "votre-clé-anon-blog";

// Client dédié pour BlogHypnose
export const supabaseBlog = createClient<BlogDatabase>(BLOG_SUPABASE_URL, BLOG_SUPABASE_ANON_KEY, {
  auth: {
    storage: window.sessionStorage, // Utiliser sessionStorage pour éviter les conflits
    storageKey: 'bloghypnose_auth', // Clé spécifique à BlogHypnose
    persistSession: true,
    autoRefreshToken: true,
  }
});

// IMPORTANT: N'oubliez pas de remplacer les valeurs ci-dessus par celles
// de votre nouveau projet Supabase dès que vous l'aurez créé
