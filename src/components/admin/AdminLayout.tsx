
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      setIsAdmin(!!token);
      
      // If on login page and already authenticated, redirect to dashboard
      if (token && location.pathname === '/admin-blog') {
        navigate('/admin-blog/dashboard');
      }
    };
    
    checkAuth();
  }, [location, navigate]);
  
  // Show nothing while checking authentication
  if (isAdmin === null) {
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>Administration | NovaHypnose Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
