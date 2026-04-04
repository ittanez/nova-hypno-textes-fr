-- Table pour stocker les inscriptions en liste d'attente pour les formations
CREATE TABLE IF NOT EXISTS public.formation_attente (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ DEFAULT now() NOT NULL,
  prenom           TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  region           TEXT,         -- valeurs attendues : 'IDF' | 'Autre'
  jour_prefere     TEXT,         -- valeurs attendues : 'Samedi' | 'Dimanche'
  theme_prioritaire TEXT,        -- valeurs attendues : 'Stress' | 'Sommeil' | 'Confiance' | 'Autre'
  commentaire_libre TEXT,
  questionnaire_complete BOOLEAN DEFAULT false NOT NULL,
  ip_address       TEXT
);

-- Index sur l'email pour les recherches
CREATE INDEX IF NOT EXISTS idx_formation_attente_email ON public.formation_attente(email);

-- Activation du Row Level Security
ALTER TABLE public.formation_attente ENABLE ROW LEVEL SECURITY;

-- Policy : seul le service role (Edge Functions) peut lire et écrire
-- Le RLS bloquant tout par défaut, on n'autorise explicitement que le service_role.
CREATE POLICY "service_role_only"
  ON public.formation_attente
  FOR ALL
  USING     (auth.role() = 'service_role')
  WITH CHECK(auth.role() = 'service_role');
