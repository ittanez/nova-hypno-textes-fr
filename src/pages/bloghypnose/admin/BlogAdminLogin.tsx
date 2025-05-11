
import React, { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Schéma de validation pour les formulaires d'authentification
const formSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

const requestFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Veuillez entrer votre nom complet' }),
  reason: z.string().min(20, { message: 'Veuillez fournir une raison détaillée (minimum 20 caractères)' }),
});

type FormValues = z.infer<typeof formSchema>;
type RequestFormValues = z.infer<typeof requestFormSchema>;

const BlogAdminLogin = () => {
  const navigate = useNavigate();
  const { user, session, loading, isAdmin, signIn, signUp, requestAdminAccess } = useBlogAuth();
  const { toast } = useToast();
  const [authMessage, setAuthMessage] = useState<{ type: 'info' | 'warning' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formulaire pour l'authentification
  const authForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Formulaire pour la demande d'accès admin
  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      fullName: '',
      reason: '',
    },
  });

  useEffect(() => {
    // Journalisation pour le débogage
    console.log("BlogAdminLogin - État d'authentification:", { 
      hasUser: !!user, 
      hasSession: !!session, 
      isAdmin, 
      loading 
    });
    
    // Redirection uniquement lorsque toutes les informations sont disponibles
    if (!loading && user && session && isAdmin) {
      console.log("Utilisateur authentifié en tant qu'admin, redirection vers le tableau de bord");
      // Léger délai pour éviter une redirection immédiate qui pourrait causer une boucle
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
  const handleLogin = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { success, error } = await signIn(values.email, values.password);
      
      if (success) {
        setAuthMessage({
          type: 'info',
          message: "Connexion réussie! Vérification des droits d'accès..."
        });
      } else {
        throw new Error(error?.message || "Échec de la connexion");
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      
      setAuthMessage({
        type: 'error',
        message: error.message || "Une erreur est survenue lors de la connexion"
      });
      
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestion de l'inscription
  const handleSignup = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { success, error, data } = await signUp(values.email, values.password);
      
      if (success) {
        setAuthMessage({
          type: 'info',
          message: data?.session 
            ? "Inscription réussie! Vous pouvez maintenant demander des droits administrateur." 
            : "Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte."
        });
        
        toast({
          title: "Compte créé",
          description: data?.session 
            ? "Vous pouvez maintenant demander des droits administrateur." 
            : "Veuillez vérifier votre email pour confirmer votre compte.",
        });
      } else {
        throw new Error(error?.message || "Échec de l'inscription");
      }
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      
      setAuthMessage({
        type: 'error',
        message: error.message || "Une erreur est survenue lors de l'inscription"
      });
      
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Gestion de la demande d'accès administrateur
  const handleAdminRequest = async (values: RequestFormValues) => {
    if (!user || !session) return;
    
    setIsSubmitting(true);
    
    try {
      const { success, error } = await requestAdminAccess(values.fullName, values.reason);
      
      if (success) {
        toast({
          title: "Demande envoyée",
          description: "Votre demande de droits administrateur a été soumise et sera examinée prochainement.",
        });
        
        requestForm.reset();
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

  // Éviter d'afficher le formulaire de connexion brièvement lorsque déjà authentifié
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
            <p className="text-muted-foreground">Administration</p>
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
              
              <Form {...requestForm}>
                <form onSubmit={requestForm.handleSubmit(handleAdminRequest)}>
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
                    
                    <FormField
                      control={requestForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Votre nom complet" 
                              {...field} 
                              autoComplete="name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={requestForm.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Raison de la demande</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Expliquez pourquoi vous avez besoin des droits administrateur..." 
                              {...field} 
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
              </Form>
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
                    <Form {...authForm}>
                      <form onSubmit={authForm.handleSubmit(handleLogin)} className="space-y-4">
                        <FormField
                          control={authForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="votre@email.com" 
                                  {...field} 
                                  autoComplete="username"
                                  type="email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={authForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mot de passe</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  autoComplete="current-password"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
                              Connexion en cours...
                            </>
                          ) : (
                            "Se connecter"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <Form {...authForm}>
                      <form onSubmit={authForm.handleSubmit(handleSignup)} className="space-y-4">
                        <FormField
                          control={authForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="votre@email.com" 
                                  {...field} 
                                  autoComplete="email"
                                  type="email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={authForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mot de passe</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  {...field} 
                                  autoComplete="new-password"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
                              Inscription en cours...
                            </>
                          ) : (
                            "S'inscrire"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BlogAdminLogin;
