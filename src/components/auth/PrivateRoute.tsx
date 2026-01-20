
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { logger } from '@/lib/logger';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAdmin, loading, session, isLoading, isCheckingAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Log authentication state to help debug
    logger.debug("PrivateRoute - Auth state:", { isAdmin, loading, hasSession: !!session });
    
    // Add security check to prevent timing attacks
    if (session && !isAdmin && !loading && !isLoading) {
      // If session exists but admin check failed, log the user out for security
      const securityCheck = async () => {
        const { error } = await logout();
        if (error) {
          logger.error("Error during security logout:", error);
        }
      };
      
      // Use setTimeout to prevent potential infinite loop with auth state changes
      setTimeout(securityCheck, 0);
    }
  }, [isAdmin, loading, session, isLoading, logout]);
  
  // Show loading state while checking authentication or admin status
  if (loading || isLoading || isCheckingAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated at all (no session), redirect to login
  if (!session) {
    logger.debug("PrivateRoute - No session, redirecting to login");
    return <Navigate to="/admin-blog" replace />;
  }

  // If authenticated but not admin, show unauthorized message
  if (!isAdmin) {
    logger.debug("PrivateRoute - Not admin, showing unauthorized message");
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas les droits administrateur nécessaires pour accéder à cette section.
        </p>
        <button 
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => navigate("/admin-blog", { replace: true })}
        >
          Retour à la page de connexion
        </button>
      </div>
    );
  }
  
  // If authenticated as admin, render the child routes
  logger.debug("PrivateRoute - Admin access granted");
  return <>{children}</>;
};

export default PrivateRoute;
