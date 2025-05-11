
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
import { useBlogAuth } from '@/hooks/bloghypnose/useBlogAuth';
import { Label } from '@/components/ui/label';

const BlogAdminLogin = () => {
  const navigate = useNavigate();
  const { user, session, loading, isAdmin, signIn, signUp, requestAdminAccess } = useBlogAuth();
  const { toast } = useToast();
  const [authMessage, setAuthMessage] = useState<{ type: 'info' | 'warning' | 'error'; message: string } | null>(null);
  const [fullName, setFullName] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Journalisation pour le débogage
    console.log("BlogAdminLogin - État d'authentification:", { 
      hasUser: !!user, 
      hasSession: !!session, 
      isAdmin, 
      loading
    });
    
    // Tentative de redirection uniquement lorsque toutes les informations sont disponibles
    if (!loading && user && session && isAdmin) {
      console.log("Utilisateur authentifié en tant qu'admin, redirection vers le tableau de bord");
      // Utiliser un petit délai pour éviter une redirection immédiate qui pourrait causer une boucle
      const redirectTimer = setTimeout(() => {
        navigate('/bloghypnose-admin/dashboard', { replace: true });
      }, 300);
      
      return () => clearTimeout(redirectTimer);
    } 
    
    if (!loading && user && session && !isAdmin) {
      setAuthMessage({
        type: 'warning',
        message: "Vous êtes connecté, mais vous n'avez pas les droits d'administrateur."
      });
    }
  }, [user, session, loading, isAdmin, navigate]);

  // Gestion de la connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { success, error } = await signIn(email, password);
      
      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
      } else {
        throw new Error(error?.message || "Échec de la connexion");
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestion de l'inscription
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Mots de passe différents",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { success, error } = await signUp(email, password);
      
      if (success) {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
        });
        setAuthMessage({
          type: 'info',
          message: "Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte."
        });
      } else {
        throw new Error(error?.message || "Échec de l'inscription");
      }
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAdminRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !session) return;
    
    if (!fullName || !reason) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { success, error } = await requestAdminAccess(fullName, reason);
      
      if (success) {
        toast({
          title: "Demande envoyée",
          description: "Votre demande de droits administrateur a été soumise et sera examinée prochainement.",
        });
        
        setFullName('');
        setReason('');
      } else {
        throw new Error(error || "Échec de la demande");
      }
    } catch (error: any) {
      console.error("Erreur de demande admin:", error);
      
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la demande de droits administrateur.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Éviter d'afficher brièvement le formulaire de connexion lorsque l'utilisateur est déjà authentifié
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
        <title>Connexion | BlogHypnose Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-nova-blue">BlogHypnose</h1>
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
                      autoComplete="name"
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
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input 
                          id="login-email" 
                          type="email" 
                          placeholder="votre@email.com" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Mot de passe</Label>
                        </div>
                        <Input 
                          id="login-password" 
                          type="password" 
                          placeholder="••••••••" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
                            Connexion...
                          </>
                        ) : (
                          "Se connecter"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="votre@email.com" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Mot de passe</Label>
                        <Input 
                          id="signup-password" 
                          type="password" 
                          placeholder="••••••••" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password">Confirmer le mot de passe</Label>
                        <Input 
                          id="signup-confirm-password" 
                          type="password" 
                          placeholder="••••••••" 
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
                            Inscription...
                          </>
                        ) : (
                          "S'inscrire"
                        )}
                      </Button>
                    </form>
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

export default BlogAdminLogin;
