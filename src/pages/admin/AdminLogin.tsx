
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/blog/useAuth';
import AuthForm from '@/components/auth/AuthForm';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, session, loading, isAdmin } = useAuth();
  const redirectAttempted = useRef(false);

  useEffect(() => {
    // Prevent multiple navigation attempts
    if (loading || redirectAttempted.current) {
      return;
    }
    
    if (user && session && isAdmin) {
      console.log("User authenticated as admin, redirecting to dashboard");
      redirectAttempted.current = true;
      navigate('/admin-blog/dashboard', { replace: true });
    }
  }, [user, session, loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Connexion | NovaHypnose Blog Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-nova-blue">NovaHypnose</h1>
            <p className="text-muted-foreground">Accès à l'administration du blog</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Authentification</CardTitle>
              <CardDescription>
                Connectez-vous ou créez un compte pour accéder au tableau de bord
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <AuthForm mode="login" />
                </TabsContent>
                
                <TabsContent value="signup">
                  <AuthForm mode="signup" />
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <p className="text-xs text-muted-foreground text-center">
                Pour l'environnement de développement, désactivez la vérification d'email 
                dans les paramètres d'authentification Supabase
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
