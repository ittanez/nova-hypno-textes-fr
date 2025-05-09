
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Flag to prevent concurrent admin checks
    let isMounted = true;
    
    const checkAdminStatus = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .eq('role', 'admin')
          .maybeSingle();

        if (!isMounted) return;
        
        if (error) {
          throw error;
        }

        setIsAdmin(!!data);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (!isMounted) return;
        
        console.log('Auth state changed:', event, !!newSession);
        setSession(newSession);
        setUser(newSession?.user ?? null);

        // Check if user is admin (using setTimeout to avoid Supabase auth deadlock)
        if (newSession?.user) {
          setTimeout(() => {
            if (isMounted) checkAdminStatus(newSession.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!isMounted) return;
      
      console.log('Initial session check:', !!currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        checkAdminStatus(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // No need to set user/session here, the onAuthStateChange will handle it
      return { success: true, data };
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      return { success: true, data };
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Réinitialiser l'état local après la déconnexion
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      return { success: true };
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const setAdminRole = async (userId: string) => {
    try {
      // Vérifier si c'est le premier utilisateur qui s'inscrit
      const { count, error: countError } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true });
        
      if (countError) throw countError;
      
      const isFirstUser = count === 0;
      
      // Si c'est le premier utilisateur ou si l'utilisateur est déjà admin
      if (isFirstUser || isAdmin) {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
        
        // Mettre à jour l'état local
        setIsAdmin(true);
        
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Error setting admin role:', error.message);
      return false;
    }
  };

  const requestAdminAccess = async (fullName: string, reason: string) => {
    if (!user) return { success: false, error: "Utilisateur non connecté" };
    
    try {
      // Insérer les données dans la nouvelle table admin_requests
      // Cette table est configurée dans la base de données via le script SQL
      const { error } = await supabase.rpc('insert_admin_request', { 
        full_name: fullName,
        reason_text: reason
      });
      
      if (error) {
        console.error("Erreur RPC:", error);
        // Fallback: essayer l'insertion directe
        const insertResult = await supabase
          .from('admin_requests')
          .insert({
            user_id: user.id,
            user_email: user.email || '',
            full_name: fullName,
            reason: reason
          });
          
        if (insertResult.error) throw insertResult.error;
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Error requesting admin access:', error.message);
      return { success: false, error: error.message };
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
    setAdminRole,
    requestAdminAccess,
  };
}
