
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session, WeakPassword } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isLoading: boolean; // Alias pour compatibilité
  isAdmin: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | { success: boolean; data: { user: User; session: Session; weakPassword?: WeakPassword } | { message: string }; error?: undefined }
    | { success: boolean; error: { message: string }; data?: undefined }
  >;
  signUp: (
    email: string,
    password: string
  ) => Promise<
    | { success: boolean; data: { user: User; session: Session | null }; error?: undefined }
    | { success: boolean; error: { message: string }; data?: undefined }
  >;
  signOut: () => Promise<void>;
  requestAdminAccess: (fullName: string, reason: string) => Promise<
    | { success: boolean; error?: undefined }
    | { success: boolean; error: string }
  >;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        checkAdmin(newSession?.user?.id);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      checkAdmin(currentSession?.user?.id);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAdmin = async (userId?: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .rpc('has_role', {
          user_id: userId,
          required_role: 'admin'
        });

      if (error) throw error;
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      await checkAdmin(data.user?.id);
      return {
        success: true,
        data: data
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: { message: error.message || 'Une erreur est survenue lors de la connexion' }
      };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
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
      console.error('Signup error:', error);
      return {
        success: false,
        error: { message: error.message || 'Une erreur est survenue lors de l\'inscription' }
      };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  const requestAdminAccess = async (fullName: string, reason: string) => {
    try {
      if (!user) throw new Error('Vous devez être connecté pour demander des droits administrateur');

      const { error } = await supabase
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
      console.error('Admin request error:', error);
      return {
        success: false,
        error: error.message || 'Une erreur est survenue lors de la demande de droits administrateur'
      };
    }
  };

  // Ajout de l'alias isLoading pour compatibilité
  return {
    user,
    session,
    loading,
    isLoading: loading, // Alias pour compatibilité avec le code existant
    isAdmin,
    signIn,
    signUp,
    signOut,
    requestAdminAccess
  };
};
