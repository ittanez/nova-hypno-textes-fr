import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft } from 'lucide-react';

type EmailStepProps = {
  email: string;
  firstName: string;
  gdprConsent: boolean;
  onEmailChange: (email: string) => void;
  onFirstNameChange: (firstName: string) => void;
  onGdprChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
};

export const EmailStep = ({
  email,
  firstName,
  gdprConsent,
  onEmailChange,
  onFirstNameChange,
  onGdprChange,
  onSubmit,
  onPrevious,
  isSubmitting
}: EmailStepProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-nova-blue-dark mb-4">
          Recevez vos résultats par email
        </h2>
        <p className="text-nova-neutral-dark mb-8">
          Entrez votre prénom et votre adresse email pour recevoir vos résultats détaillés et des conseils personnalisés.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-nova-neutral-dark mb-2">
              Prénom
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="Votre prénom"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-nova-neutral-dark mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="gdpr"
              checked={gdprConsent}
              onCheckedChange={(checked) => onGdprChange(checked === true)}
              required
            />
            <label htmlFor="gdpr" className="text-sm text-nova-neutral-dark leading-relaxed cursor-pointer">
              J'accepte de recevoir mes résultats par email et d'être contacté(e) par NovaHypnose concernant mes résultats.
              Conformément au RGPD, vos données ne seront jamais partagées avec des tiers.
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={onPrevious}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !gdprConsent}
              className="bg-nova-blue hover:bg-nova-blue-dark"
            >
              {isSubmitting ? "Envoi en cours..." : "Voir mes résultats"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
