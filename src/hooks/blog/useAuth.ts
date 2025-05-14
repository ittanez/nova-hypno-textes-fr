
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state change event:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If we have a session, check if the user is an admin
        if (currentSession?.user) {
          checkAdminStatus(currentSession.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Then check for an existing session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        // Check admin status if we have a session
        if (initialSession?.user) {
          await checkAdminStatus(initialSession.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        user_id: userId,
        required_role: 'admin'
      });
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error in admin check:', error);
      setIsAdmin(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Login error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        return { error };
      }
      
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      
      return { error: null };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error };
      }
      
      return { success: true, error: null, data };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const requestAdminAccess = async (fullName: string, reason: string) => {
    try {
      if (!user) {
        return { 
          success: false, 
          error: { message: "Vous devez être connecté pour demander un accès administrateur" }
        };
      }

      // Call the RPC function to insert the admin request
      const { error } = await supabase.rpc('insert_admin_request', {
        full_name: fullName,
        reason_text: reason
      });

      if (error) {
        console.error('Error requesting admin access:', error);
        return { success: false, error };
      }
      
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Admin request error:', error);
      return { success: false, error };
    }
  };

  return {
    session,
    user,
    loading,
    isLoading,
    isAdmin,
    login,
    logout,
    signIn,
    signUp,
    requestAdminAccess
  };
};
