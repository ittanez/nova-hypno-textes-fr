-- Contrainte UNIQUE sur email (nécessaire pour l'upsert dans formation-liste-attente)
ALTER TABLE public.formation_attente ADD CONSTRAINT formation_attente_email_unique UNIQUE (email);
