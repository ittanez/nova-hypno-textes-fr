
import { useState, useEffect } from 'react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/blog/useAuth';
import AuthForm from '@/components/auth/AuthForm';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, session, loading, isAdmin } = useAuth();
  const [authMessage, setAuthMessage] = useState<{ type: 'info' | 'warning' | 'error'; message: string } | null>(null);
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    // Log auth state for debugging
    console.log("AdminLogin - Auth state:", { 
      hasUser: !!user, 
      hasSession: !!session, 
      isAdmin, 
      loading,
      redirectAttempted
    });
    
    // Only attempt redirect when we have all information and not loading
    if (loading) {
      return;
    }
    
    if (user && session && isAdmin && !redirectAttempted) {
      console.log("User authenticated as admin, redirecting to dashboard");
      setRedirectAttempted(true);
      
      // Use setTimeout to ensure state is updated before redirect
      setTimeout(() => {
        navigate('/admin-blog/dashboard', { replace: true });
      }, 100);
    } else if (user && session && !isAdmin && !redirectAttempted) {
      setAuthMessage({
        type: 'warning',
        message: "Vous êtes connecté, mais vous n'avez pas les droits d'administrateur."
      });
    }
  }, [user, session, loading, isAdmin, navigate, redirectAttempted]);

  // Prevent showing the login form briefly when already authenticated
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
          
          {authMessage && (
            <Alert className="mb-6" variant={authMessage.type === 'error' ? 'destructive' : 'default'}>
              <AlertDescription>{authMessage.message}</AlertDescription>
            </Alert>
          )}
          
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
                  <AuthForm 
                    mode="login" 
                    onSuccess={() => {
                      setAuthMessage({
                        type: 'info',
                        message: "Connexion réussie! Redirection en cours..."
                      });
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="signup">
                  <AuthForm 
                    mode="signup" 
                    onSuccess={(requiresEmailConfirmation) => {
                      setAuthMessage({
                        type: 'info',
                        message: requiresEmailConfirmation 
                          ? "Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte." 
                          : "Inscription réussie! Vous pouvez maintenant vous connecter."
                      });
                    }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col items-center">
              <p className="text-sm text-orange-600 font-semibold mb-2">
                Pour l'environnement de développement, désactivez la vérification d'email 
                dans les paramètres d'authentification Supabase
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Si vous ne recevez pas d'email de confirmation, contactez l'administrateur
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
