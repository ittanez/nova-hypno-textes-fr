
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/blog/useAuth';

const AdminLayout = () => {
  const location = useLocation();
  const { loading } = useAuth();
  
  useEffect(() => {
    // Log page navigation to help debug
    console.log('AdminLayout rendered at path:', location.pathname);
  }, [location.pathname]);
  
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
