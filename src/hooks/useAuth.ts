
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

/**
 * Custom hook for handling authentication and user roles
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state and session
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          console.log("Auth state changed:", event);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Use setTimeout to avoid recursive calls to Supabase
          if (currentSession?.user) {
            setTimeout(() => {
              checkAdminStatus(currentSession.user.id);
            }, 0);
          } else {
            setIsAdmin(false);
            setIsLoading(false);
          }
        }
      );
      
      // Then check for existing session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await checkAdminStatus(currentSession.user.id);
      } else {
        setIsAdmin(false);
        setIsLoading(false);
      }
      
      setLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  // Check if the user has admin role
  const checkAdminStatus = async (userId: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, we're setting all authenticated users as admin
      // In a real application, you would check against a roles table in your database
      setIsAdmin(true);
      console.log("Admin status checked:", true);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
    setIsLoading(false);
  };
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error);
        return { success: false, error };
      }
      
      return { success: true, data };
    } catch (error: any) {
      console.error("Sign in exception:", error);
      return { success: false, error };
    }
  };
  
  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign up error:", error);
        return { success: false, error };
      }
      
      return { success: true, data };
    } catch (error: any) {
      console.error("Sign up exception:", error);
      return { success: false, error };
    }
  };
  
  // Log out the current user
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error: any) {
      console.error("Sign out exception:", error);
      return { success: false, error };
    }
  };
  
  // Request admin access (for demo purposes)
  const requestAdminAccess = async (fullName: string, reason: string) => {
    try {
      // In a real app, this would create a record in an admin_requests table
      console.log("Admin access requested:", { fullName, reason });
      
      return { success: true };
    } catch (error: any) {
      console.error("Admin request error:", error);
      return { success: false, error };
    }
  };
  
  return {
    user,
    session,
    loading,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    logout,
    requestAdminAccess
  };
};

// Needed for PrivateRoute component which calls this directly
useAuth.prototype.logout = async function() {
  try {
    const { error } = await supabase.auth.signOut();
    return { success: !error, error };
  } catch (error) {
    return { success: false, error };
  }
};
