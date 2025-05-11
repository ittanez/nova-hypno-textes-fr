
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useBlogAuth } from '@/hooks/bloghypnose/useBlogAuth';
import { LogOut, Layout, FileText, FolderOpen, Tag, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogHypnoseAdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, session, isAdmin, signOut } = useBlogAuth();
  
  useEffect(() => {
    // Journalisation pour le débogage
    console.log('BlogHypnoseAdminLayout rendu au chemin:', location.pathname, { hasSession: !!session, isAdmin });
    
    // Redirection uniquement lorsque l'authentification est déterminée
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

  // Gestion de la déconnexion
  const handleSignOut = async () => {
    try {
      const { success } = await signOut();
      if (success) {
        navigate('/bloghypnose-admin', { replace: true });
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  
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
          <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-xl font-bold text-nova-blue mb-2 md:mb-0 flex items-center">
                  <Layout className="h-5 w-5 mr-2" />
                  <a href="/bloghypnose-admin/dashboard">BlogHypnose Admin</a>
                </h1>
                
                <nav>
                  <ul className="flex flex-wrap space-x-1 md:space-x-4">
                    <li>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className={`${
                          location.pathname === '/bloghypnose-admin/dashboard' 
                            ? 'bg-muted text-primary' 
                            : 'text-muted-foreground'
                        }`}
                        onClick={() => navigate('/bloghypnose-admin/dashboard')}
                      >
                        <Layout className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Dashboard</span>
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className={`${
                          location.pathname.includes('/bloghypnose-admin/articles') 
                            ? 'bg-muted text-primary' 
                            : 'text-muted-foreground'
                        }`}
                        onClick={() => navigate('/bloghypnose-admin/articles')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Articles</span>
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className={`${
                          location.pathname.includes('/bloghypnose-admin/categories') 
                            ? 'bg-muted text-primary' 
                            : 'text-muted-foreground'
                        }`}
                        onClick={() => navigate('/bloghypnose-admin/categories')}
                      >
                        <FolderOpen className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Catégories</span>
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className={`${
                          location.pathname.includes('/bloghypnose-admin/tags') 
                            ? 'bg-muted text-primary' 
                            : 'text-muted-foreground'
                        }`}
                        onClick={() => navigate('/bloghypnose-admin/tags')}
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Tags</span>
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className={`${
                          location.pathname.includes('/bloghypnose-admin/medias') 
                            ? 'bg-muted text-primary' 
                            : 'text-muted-foreground'
                        }`}
                        onClick={() => navigate('/bloghypnose-admin/medias')}
                      >
                        <Image className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Médias</span>
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-red-600 hover:bg-red-50"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Déconnexion</span>
                      </Button>
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
