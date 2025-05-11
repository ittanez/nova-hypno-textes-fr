
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabaseBlog } from '@/integrations/supabase/blog-client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Configuration de l'écouteur d'événements d'authentification AVANT de vérifier la session
    const { data: { subscription } } = supabaseBlog.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event);
        // Mise à jour synchrone des états locaux
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Si un utilisateur est connecté, vérifier les droits admin dans un setTimeout
        // pour éviter les problèmes de deadlock avec onAuthStateChange
        if (newSession?.user) {
          setTimeout(() => checkAdminRights(newSession.user.id), 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // ENSUITE vérifier s'il existe déjà une session
    supabaseBlog.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Got session:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        checkAdminRights(currentSession.user.id);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // Cleanup à la désinscription du composant
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fonction pour vérifier les droits administrateur
  const checkAdminRights = async (userId: string) => {
    try {
      console.log("Checking admin rights for user:", userId);
      const { data, error } = await supabaseBlog.rpc('is_bloghypnose_admin', {
        user_id: userId
      });
      
      if (error) throw error;
      
      console.log("Admin check result:", data);
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Erreur lors de la vérification des droits admin:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabaseBlog.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      return {
        success: true,
        data
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Erreur de connexion'
        }
      };
    }
  };

  // Fonction d'inscription
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabaseBlog.auth.signUp({
        email,
        password
      });

      if (error) throw error;
      
      return {
        success: true,
        data: {
          user: data.user,
          session: data.session
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Erreur lors de l\'inscription'
        }
      };
    }
  };

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      await supabaseBlog.auth.signOut();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Erreur lors de la déconnexion'
        }
      };
    }
  };

  // Fonction pour demander des droits administrateur
  const requestAdminAccess = async (fullName: string, reason: string) => {
    try {
      if (!user) throw new Error('Utilisateur non connecté');

      const { error } = await supabaseBlog
        .from('admin_requests')
        .insert({
          user_id: user.id,
          user_email: user.email,
          full_name: fullName,
          reason: reason,
          status: 'pending'
        });

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erreur lors de la demande'
      };
    }
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    requestAdminAccess
  };
}
