
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface AuthFormProps {
  type: 'login' | 'signup' | 'request';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, signup, requestAdminAccess, isLoading } = useAuth();
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [reason, setReason] = React.useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (type === 'login') {
        const { error } = await login(email, password);
        if (error) throw error;
      } else if (type === 'signup') {
        const { error } = await signup(email, password);
        if (error) throw error;
      } else if (type === 'request') {
        const { error } = await requestAdminAccess(fullName, reason);
        if (error) throw error;
        
        toast({
          title: "Demande envoyée",
          description: "Votre demande d'accès administrateur a été envoyée avec succès.",
        });
        
        setFullName('');
        setReason('');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Une erreur est survenue";
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    }
  };
  
  if (type === 'request') {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">
            Nom complet
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="reason" className="block text-sm font-medium">
            Motif de la demande
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            rows={4}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isLoading ? 'Envoi...' : 'Envoyer la demande d\'accès'}
        </button>
      </form>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {isLoading
          ? (type === 'login' ? 'Connexion...' : 'Inscription...')
          : (type === 'login' ? 'Se connecter' : 'S\'inscrire')}
      </button>
      
      {type === 'login' && (
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        >
          Créer un compte
        </button>
      )}
      
      {type === 'signup' && (
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        >
          Déjà un compte ? Se connecter
        </button>
      )}
    </form>
  );
};

export default AuthForm;
