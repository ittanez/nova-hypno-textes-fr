
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { checkIsAdmin } from '@/lib/services/authService';
import { logger } from '@/lib/logger';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAdmin: false,
  isLoading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fonction pour vérifier si l'utilisateur est admin
    const verifyAdminStatus = async (userId: string) => {
      try {
        logger.debug("Verification du statut admin pour l'utilisateur:", userId);
        const { isAdmin: adminStatus, error } = await checkIsAdmin();
        
        if (error) {
          logger.error("Erreur lors de la verification du statut admin:", error);
          setIsAdmin(false);
          return;
        }
        
        logger.debug("Statut admin:", adminStatus);
        setIsAdmin(adminStatus);
      } catch (error) {
        logger.error("Exception lors de la verification du statut admin:", error);
        setIsAdmin(false);
      }
    };

    // État d'authentification initial
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        logger.debug("Session initiale:", session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await verifyAdminStatus(session.user.id);
        }
      } catch (error) {
        logger.error('Erreur d\'initialisation de l\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initialiser l'authentification
    initAuth();

    // Écouteur des changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.debug("Evenement d'authentification:", event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Mettre à jour le statut admin lorsque l'état d'authentification change
          setTimeout(() => {
            verifyAdminStatus(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Nettoyer l'abonnement
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
