
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/blog/useAuth';

const BlogHypnoseAdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, session, isAdmin } = useAuth();
  
  useEffect(() => {
    // Log navigation pour le débogage
    console.log('BlogHypnoseAdminLayout rendu au chemin:', location.pathname, { hasSession: !!session, isAdmin });
    
    // Redirection seulement lorsque l'authentification est déterminée
    if (!loading) {
      // Si pas de session, toujours rediriger vers la page de connexion
      if (!session && location.pathname !== '/bloghypnose-admin') {
        console.log('BlogHypnoseAdminLayout - Pas de session, redirection vers la page de connexion');
        navigate('/bloghypnose-admin', { replace: true });
      }
      
      // Si déjà connecté en tant qu'admin et sur la page de connexion, rediriger vers le tableau de bord
      if (session && isAdmin && location.pathname === '/bloghypnose-admin') {
        console.log('BlogHypnoseAdminLayout - Admin déjà connecté, redirection vers le tableau de bord');
        navigate('/bloghypnose-admin/dashboard', { replace: true });
      }
    }
  }, [location.pathname, loading, session, isAdmin, navigate]);
  
  // Afficher un indicateur de chargement minimal pendant la vérification de l'authentification
  if (loading) {
    return (
      <>
        <Helmet>
          <title>Chargement... | BlogHypnose Admin</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Administration | BlogHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {session && isAdmin && location.pathname !== '/bloghypnose-admin' && (
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-xl font-bold text-nova-blue mb-2 md:mb-0">
                  <a href="/bloghypnose-admin/dashboard">BlogHypnose Admin</a>
                </h1>
                
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <a 
                        href="/bloghypnose-admin/dashboard" 
                        className={`px-3 py-2 text-sm font-medium ${
                          location.pathname === '/bloghypnose-admin/dashboard' 
                            ? 'text-nova-blue' 
                            : 'text-gray-600 hover:text-nova-blue'
                        } transition-colors`}
                      >
                        Tableau de bord
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/bloghypnose-admin/articles" 
                        className={`px-3 py-2 text-sm font-medium ${
                          location.pathname.includes('/bloghypnose-admin/articles') 
                            ? 'text-nova-blue' 
                            : 'text-gray-600 hover:text-nova-blue'
                        } transition-colors`}
                      >
                        Articles
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/bloghypnose-admin/categories" 
                        className={`px-3 py-2 text-sm font-medium ${
                          location.pathname.includes('/bloghypnose-admin/categories') 
                            ? 'text-nova-blue' 
                            : 'text-gray-600 hover:text-nova-blue'
                        } transition-colors`}
                      >
                        Catégories
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/bloghypnose-admin/tags" 
                        className={`px-3 py-2 text-sm font-medium ${
                          location.pathname.includes('/bloghypnose-admin/tags') 
                            ? 'text-nova-blue' 
                            : 'text-gray-600 hover:text-nova-blue'
                        } transition-colors`}
                      >
                        Tags
                      </a>
                    </li>
                    <li>
                      <a 
                        href="/bloghypnose-admin/medias" 
                        className={`px-3 py-2 text-sm font-medium ${
                          location.pathname.includes('/bloghypnose-admin/medias') 
                            ? 'text-nova-blue' 
                            : 'text-gray-600 hover:text-nova-blue'
                        } transition-colors`}
                      >
                        Médias
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          // Implémentation de la déconnexion
                          const { signOut } = useAuth();
                          signOut().then(() => {
                            navigate('/bloghypnose-admin', { replace: true });
                          });
                        }}
                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                      >
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        )}
        
        <Outlet />
      </div>
    </>
  );
};

export default BlogHypnoseAdminLayout;
