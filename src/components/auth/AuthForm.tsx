import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/blog/useAuth';

const formSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

type FormValues = z.infer<typeof formSchema>;

type AuthFormProps = {
  mode: 'login' | 'signup';
  onSuccess?: (requiresEmailConfirmation?: boolean) => void;
};

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const { success, error } = await signIn(values.email, values.password);
        
        if (success) {
          console.log("Login successful, triggering onSuccess callback");
          toast({
            title: 'Connexion réussie',
            description: 'Vous êtes maintenant connecté',
          });
          
          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast({
            title: 'Erreur de connexion',
            description: error?.message || "Une erreur s'est produite lors de la connexion",
            variant: 'destructive',
          });
        }
      } else {
        const { success, error, data } = await signUp(values.email, values.password);
        
        const requiresEmailConfirmation = data?.user?.identities?.[0]?.identity_data?.email_verified === false;
        
        if (success) {
          toast({
            title: 'Inscription réussie',
            description: requiresEmailConfirmation 
              ? 'Veuillez vérifier votre email pour confirmer votre compte'
              : 'Votre compte a été créé',
          });
          
          if (onSuccess) {
            onSuccess(requiresEmailConfirmation);
          }
        } else {
          toast({
            title: "Erreur d'inscription",
            description: error?.message || "Une erreur s'est produite lors de l'inscription",
            variant: 'destructive',
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur inattendue est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="votre@email.com" 
                  {...field} 
                  autoComplete={mode === 'login' ? 'username' : 'email'}
                  type="email"
                />
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
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  {...field} 
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
              {mode === 'login' ? 'Connexion en cours...' : 'Inscription en cours...'}
            </>
          ) : (
            mode === 'login' ? 'Se connecter' : "S'inscrire"
          )}
        </Button>
      </form>
    </Form>
  );
}
