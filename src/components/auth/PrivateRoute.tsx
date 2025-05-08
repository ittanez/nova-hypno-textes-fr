
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check for authentication status from localStorage
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token");
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
  }, []);
  
  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }
  
  // If authenticated, render the child routes
  if (isAuthenticated) {
    return <Outlet />;
  }
  
  // If not authenticated, redirect to login
  return <Navigate to="/admin-blog" replace />;
};

export default PrivateRoute;
