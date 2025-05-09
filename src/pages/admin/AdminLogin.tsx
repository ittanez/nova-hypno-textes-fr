
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/blog/useAuth';
import AuthForm from '@/components/auth/AuthForm';
import { supabase } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, session, loading, isAdmin, setAdminRole } = useAuth();
  const { toast } = useToast();
  const [authMessage, setAuthMessage] = useState<{ type: 'info' | 'warning' | 'error'; message: string } | null>(null);
  const [redirectAttempted, setRedirectAttempted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  
  const handleAdminRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !session) return;
    
    setIsSubmitting(true);
    
    try {
      // Option 1: If the user is authorized to set their own admin role
      if (typeof setAdminRole === 'function') {
        const success = await setAdminRole(user.id);
        
        if (success) {
          toast({
            title: "Droits administrateur accordés",
            description: "Vous avez maintenant accès au tableau de bord d'administration.",
          });
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate('/admin-blog/dashboard', { replace: true });
          }, 1000);
        } else {
          throw new Error("Impossible d'accorder les droits administrateur");
        }
      } 
      // Option 2: Log the request for manual review by an existing admin
      else {
        // Enregistrer la demande dans une table de demandes ou envoyer un e-mail
        const { error } = await supabase.from('admin_requests').insert({
          user_id: user.id,
          user_email: user.email,
          full_name: fullName,
          reason: reason,
          status: 'pending'
        });
        
        if (error) throw error;
        
        toast({
          title: "Demande envoyée",
          description: "Votre demande de droits administrateur a été soumise et sera examinée prochainement.",
        });
        
        setFullName('');
        setReason('');
      }
    } catch (error: any) {
      console.error("Admin request error:", error);
      
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la demande de droits administrateur.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          
          {user && session && !isAdmin ? (
            <Card>
              <CardHeader>
                <CardTitle>Demande de droits administrateur</CardTitle>
                <CardDescription>
                  Veuillez remplir ce formulaire pour demander les droits d'administrateur
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleAdminRequest}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={user.email} 
                      disabled 
                      readOnly 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input 
                      id="fullName" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      placeholder="Votre nom complet" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Raison de la demande</Label>
                    <Textarea 
                      id="reason" 
                      value={reason} 
                      onChange={(e) => setReason(e.target.value)} 
                      placeholder="Expliquez pourquoi vous avez besoin des droits administrateur..." 
                      required 
                      rows={4}
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      "Soumettre la demande"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : !user || !session ? (
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
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
