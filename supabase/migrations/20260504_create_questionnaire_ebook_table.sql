-- ============================================================================
-- MIGRATION - Table questionnaire_ebook
-- Date: 2026-05-04
-- Description: Stocke les réponses au questionnaire envoyé aux personnes
--              ayant téléchargé un ebook (auto-hypnose, sommeil, procrastination).
--              Génère également un bon de réduction de 10€ valable sur la
--              première séance d'hypnothérapie (présentiel ou visio).
-- ============================================================================

CREATE TABLE IF NOT EXISTS questionnaire_ebook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Quel ebook a été téléchargé
  ebook_telecharge TEXT NOT NULL,
  -- Comment l'ebook a été utilisé / où en est la personne
  utilisation_ebook TEXT,
  progression TEXT,

  -- Connaissance / consultation hypnothérapie
  deja_consulte_hypnotherapeute TEXT,
  freins_consultation TEXT,
  besoin_si_consultation TEXT,

  -- Suggestion prochain ebook (réponse libre)
  prochain_ebook_souhaite TEXT,

  -- Profil
  zone_geographique TEXT,
  genre TEXT,
  tranche_age TEXT,

  -- Email facultatif
  email TEXT,

  -- Bon de réduction
  questionnaire_complete BOOLEAN DEFAULT false,
  code_promo TEXT,
  bon_montant_eur INTEGER DEFAULT 10,
  bon_valide_jusqu_au DATE,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS questionnaire_ebook_email_idx ON questionnaire_ebook (email);
CREATE INDEX IF NOT EXISTS questionnaire_ebook_ebook_idx ON questionnaire_ebook (ebook_telecharge);
CREATE INDEX IF NOT EXISTS questionnaire_ebook_code_promo_idx ON questionnaire_ebook (code_promo);

ALTER TABLE questionnaire_ebook ENABLE ROW LEVEL SECURITY;

-- Les visiteurs anonymes peuvent répondre au questionnaire
CREATE POLICY "anon_insert_questionnaire_ebook" ON questionnaire_ebook
  FOR INSERT TO anon
  WITH CHECK (true);

-- Seuls les admins peuvent lire les réponses
CREATE POLICY "admin_read_questionnaire_ebook" ON questionnaire_ebook
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_all_questionnaire_ebook" ON questionnaire_ebook
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

COMMENT ON TABLE questionnaire_ebook IS 'Réponses au questionnaire post-téléchargement ebook (auto-hypnose, sommeil, procrastination) — incluant bon de réduction 10€';
