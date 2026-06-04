
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

// Chargement paresseux du client Supabase : il n'est PAS nécessaire pour peindre
// les pages publiques (homepage, etc.). En l'important dynamiquement, le chunk
// vendor-supabase sort du bundle initial et n'est chargé qu'après le montage de
// React (ou quand une page admin en a besoin), ce qui accélère le FCP/LCP.
const getSupabase = async () =>
  (await import('@/integrations/supabase/client')).supabase;

interface AuthError {
  message: string;
  code?: string;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isCheckingAdmin: boolean;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
  signup: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  requestAdminAccess: (fullName: string, reason: string) => Promise<{ error: AuthError | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    let subscription: { unsubscribe: () => void } | undefined;

    (async () => {
      const supabase = await getSupabase();

      // Set up auth state listener FIRST
      const { data } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          // Check admin status if user is logged in
          if (currentSession?.user?.id) {
            setTimeout(() => {
              checkAdminStatus(currentSession.user.id);
            }, 0);
          } else {
            setIsAdmin(false);
          }
        }
      );
      subscription = data.subscription;

      // Si le composant a été démonté pendant l'import async, on nettoie aussitôt.
      if (!active) {
        subscription.unsubscribe();
        return;
      }

      // THEN check for existing session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      // Check admin status if user is logged in
      if (currentSession?.user?.id) {
        checkAdminStatus(currentSession.user.id);
      }
      setLoading(false);
    })();

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (userId: string) => {
    setIsCheckingAdmin(true);
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        logger.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      logger.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setIsCheckingAdmin(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const requestAdminAccess = async (fullName: string, reason: string) => {
    setIsLoading(true);
    try {
      if (!user) {
        return { error: { message: 'Vous devez être connecté pour demander un accès administrateur' } };
      }

      const supabase = await getSupabase();
      const { error } = await supabase.from('admin_requests').insert({
        user_id: user.id,
        user_email: user.email,
        full_name: fullName,
        reason
      });

      return { error };
    } catch (error) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        isAdmin,
        isLoading,
        isCheckingAdmin,
        login,
        logout,
        signup,
        requestAdminAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Export directly for compatibility with existing imports
export default useAuth;
