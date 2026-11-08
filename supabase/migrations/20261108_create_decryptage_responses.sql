-- Tunnel « Décryptage » (novahypnose.fr/decryptage)
-- Réponses enregistrées uniquement quand la personne donne son email ET coche
-- le consentement. Données de santé : aucune lecture publique, aucune écriture
-- anonyme (seule la fonction `decryptage-submit`, en service_role, insère).

CREATE TABLE IF NOT EXISTS public.decryptage_responses (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       timestamptz NOT NULL DEFAULT now(),
  prenom           text NOT NULL CHECK (char_length(prenom) BETWEEN 1 AND 50),
  email            text NOT NULL CHECK (char_length(email) <= 254),
  answers          jsonb NOT NULL,
  autre_texte      text CHECK (autre_texte IS NULL OR char_length(autre_texte) <= 120),
  message          text CHECK (message IS NULL OR char_length(message) <= 500),
  repere           text NOT NULL CHECK (repere IN ('pret', 'hesitant', 'attente_passive')),
  consent_version  text NOT NULL,
  consent_at       timestamptz NOT NULL
);

CREATE INDEX IF NOT EXISTS decryptage_responses_created_at_idx
  ON public.decryptage_responses (created_at DESC);

ALTER TABLE public.decryptage_responses ENABLE ROW LEVEL SECURITY;

-- Lecture et suppression réservées aux admins (même règle que quiz_results).
DROP POLICY IF EXISTS "admin_read_decryptage_responses" ON public.decryptage_responses;
CREATE POLICY "admin_read_decryptage_responses" ON public.decryptage_responses
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "admin_delete_decryptage_responses" ON public.decryptage_responses;
CREATE POLICY "admin_delete_decryptage_responses" ON public.decryptage_responses
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

REVOKE ALL ON public.decryptage_responses FROM anon;

-- Conservation : 12 mois, comme annoncé dans la case de consentement.
CREATE OR REPLACE FUNCTION public.purge_decryptage_responses()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.decryptage_responses WHERE created_at < now() - interval '12 months';
$$;

REVOKE ALL ON FUNCTION public.purge_decryptage_responses() FROM PUBLIC, anon, authenticated;
-- Appelée par la fonction `decryptage-submit` (pg_cron n'est pas activé sur le projet).
GRANT EXECUTE ON FUNCTION public.purge_decryptage_responses() TO service_role;

-- Purge quotidienne à 3 h si pg_cron est disponible sur le projet.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.unschedule(jobid) FROM cron.job WHERE jobname = 'purge-decryptage-responses';
    PERFORM cron.schedule('purge-decryptage-responses', '0 3 * * *', 'SELECT public.purge_decryptage_responses()');
  ELSE
    RAISE NOTICE 'pg_cron absent : planifier public.purge_decryptage_responses() autrement.';
  END IF;
END $$;
