
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/blog/useAuth";

const PrivateRoute = () => {
  const { isAdmin, loading, session } = useAuth();
  
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
    return <Navigate to="/admin-blog" replace />;
  }
  
  // If authenticated but not admin, show unauthorized message
  if (!isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas les droits administrateur nécessaires pour accéder à cette section.
        </p>
        <Navigate to="/admin-blog" replace />
      </div>
    );
  }
  
  // If authenticated as admin, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
