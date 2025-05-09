
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/blog/useAuth";

const PrivateRoute = () => {
  const { isAdmin, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // If authenticated as admin, render the child routes
  if (isAdmin) {
    return <Outlet />;
  }
  
  // If not authenticated, redirect to login exactly once
  return <Navigate to="/admin-blog" replace />;
};

export default PrivateRoute;
