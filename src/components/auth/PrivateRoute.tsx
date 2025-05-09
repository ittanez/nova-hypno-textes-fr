
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/blog/useAuth";

const PrivateRoute = () => {
  const { isAdmin, loading, session } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Log authentication state to help debug
    console.log("PrivateRoute - Auth state:", { isAdmin, loading, hasSession: !!session });
  }, [isAdmin, loading, session]);
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If not authenticated at all (no session), redirect to login
  if (!session) {
    console.log("PrivateRoute - No session, redirecting to login");
    return <Navigate to="/admin-blog" replace />;
  }
  
  // If authenticated but not admin, show unauthorized message
  if (!isAdmin) {
    console.log("PrivateRoute - Not admin, showing unauthorized message");
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
  console.log("PrivateRoute - Admin access granted");
  return <Outlet />;
};

export default PrivateRoute;
