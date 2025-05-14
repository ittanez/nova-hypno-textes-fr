
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Log the 404 error for monitoring purposes
    console.error(
      "404 Error: Redirection depuis une route inexistante:",
      location.pathname
    );
    
    // Small delay before redirect to ensure error is logged
    const timer = setTimeout(() => {
      setReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Redirect to home page
  if (ready) {
    return <Navigate to="/" replace />;
  }

  // This component will not be visible as it redirects quickly
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-lg text-gray-600">Redirection...</p>
      </div>
    </div>
  );
};

export default NotFound;
