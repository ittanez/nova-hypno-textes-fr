
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet';
import { LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(1, { message: "Nom d'utilisateur requis" }),
  password: z.string().min(6, { message: "Mot de passe requis (6 caractères minimum)" }),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if already logged in
  const isLoggedIn = localStorage.getItem('admin_token') !== null;
  if (isLoggedIn) {
    navigate('/admin-blog/dashboard');
  }
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to validate credentials
      // For demo purposes, we'll use hardcoded credentials
      if (values.username === 'admin' && values.password === 'password123') {
        // Create a simple token (in a real app, use JWT or OAuth)
        const mockToken = `mock-token-${Date.now()}`;
        localStorage.setItem('admin_token', mockToken);
        localStorage.setItem('admin_username', values.username);
        
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté à l'interface d'administration.",
        });
        
        navigate('/admin-blog/dashboard');
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion Admin | NovaHypnose Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-nova-blue-light p-3 rounded-full">
                <LockKeyhole className="h-8 w-8 text-nova-blue" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin NovaHypnose Blog</CardTitle>
            <CardDescription>
              Connectez-vous pour gérer votre blog
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-nova-blue hover:bg-nova-blue-dark"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p className="w-full">
              Pour les besoins de la démo, utilisez:
              <br />
              Identifiant: <strong>admin</strong> | Mot de passe: <strong>password123</strong>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
