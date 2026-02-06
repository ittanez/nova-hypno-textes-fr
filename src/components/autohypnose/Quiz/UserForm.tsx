
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/types/quiz";
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';

interface UserFormProps {
  onSubmit: (userData: UserData) => void;
  isSubmitting?: boolean;
}

const UserForm = ({ onSubmit, isSubmitting = false }: UserFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    email: ""
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      email: ""
    };

    if (!firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        firstName,
        lastName: "", // We keep this empty as requested
        email
      });
    }
  };

  return (
    <div className="quiz-card max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-harmonia-600">Recevez vos résultats</h3>
      <p className="text-gray-600 mb-8">
        Veuillez remplir vos informations pour recevoir votre analyse détaillée et vos recommandations personnalisées.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="firstName" className="mb-1 block">Prénom</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email" className="mb-1 block">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-red-500" : ""}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="pt-4">
          <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traitement en cours...
              </>
            ) : (
              "Voir mes résultats"
            )}
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          En soumettant ce formulaire, vous acceptez de recevoir vos résultats et des informations sur la formation Harmonia par email. Je respecte votre vie privée et ne partagerai jamais vos données.
        </p>
      </form>
    </div>
  );
};

export default UserForm;
