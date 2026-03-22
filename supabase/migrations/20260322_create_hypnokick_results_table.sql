-- Table pour stocker les résultats du test de réceptivité à l'hypnose (HypnoKick)
CREATE TABLE IF NOT EXISTS public.hypnokick_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_email TEXT NOT NULL,
  first_name TEXT,
  localisation TEXT,
  score INTEGER NOT NULL,
  category TEXT NOT NULL,
  dominant_sense TEXT,
  vakog_scores JSONB
);

-- Index sur l'email pour les recherches
CREATE INDEX IF NOT EXISTS idx_hypnokick_results_email ON public.hypnokick_results(user_email);

-- RLS
ALTER TABLE public.hypnokick_results ENABLE ROW LEVEL SECURITY;

-- Politique : insertion publique (pour le formulaire front)
CREATE POLICY "Allow public insert" ON public.hypnokick_results
  FOR INSERT WITH CHECK (true);

-- Politique : lecture réservée aux admins (service role)
CREATE POLICY "Allow service role select" ON public.hypnokick_results
  FOR SELECT USING (auth.role() = 'service_role');
