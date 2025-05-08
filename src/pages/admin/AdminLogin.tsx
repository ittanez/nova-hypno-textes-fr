
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez saisir une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to verify credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin login (email: admin@example.com, password: admin123)
      if (values.email === 'admin@example.com' && values.password === 'admin123') {
        localStorage.setItem('admin_token', 'mock_token_' + Date.now());
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'administration du blog",
        });
        navigate('/admin-blog/dashboard');
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur s'est produite lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion Admin | NovaHypnose Blog</title>
      </Helmet>

      <div className="container max-w-lg mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Administration du Blog</CardTitle>
            <CardDescription>Connectez-vous pour gérer vos articles</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
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
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                      Connexion en cours...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p>Identifiants de démo: admin@example.com / admin123</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
