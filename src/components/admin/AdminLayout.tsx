
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/blog/useAuth';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, session, isAdmin } = useAuth();
  
  useEffect(() => {
    // Log page navigation to help debug
    console.log('AdminLayout rendered at path:', location.pathname, { hasSession: !!session, isAdmin });
    
    // Only redirect on non-login pages when authentication is determined
    if (!loading) {
      // If no session, always redirect to login page
      if (!session && location.pathname !== '/admin-blog') {
        console.log('AdminLayout - No session, redirecting to login');
        navigate('/admin-blog', { replace: true });
      }
      
      // If already logged in as admin and on the login page, redirect to dashboard
      // We add the check for isAdmin to prevent redirect loops
      if (session && isAdmin && location.pathname === '/admin-blog') {
        console.log('AdminLayout - Admin already logged in, redirecting to dashboard');
        navigate('/admin-blog/dashboard', { replace: true });
      }
    }
  }, [location.pathname, loading, session, isAdmin, navigate]);
  
  // Show minimal loading indicator while checking auth
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Chargement... | NovaHypnose Blog</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
        </div>
      </>
    );
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
