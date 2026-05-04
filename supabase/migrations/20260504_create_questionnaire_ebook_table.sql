-- ============================================================================
-- MIGRATION - Table questionnaire_ebook
-- Date: 2026-05-04
-- Description: Stocke les réponses au questionnaire envoyé aux personnes
--              ayant téléchargé un ebook (auto-hypnose, sommeil, procrastination).
--              Génère un crédit de bienvenue de 10€ valable 6 mois sur la
--              première séance d'hypnothérapie (présentiel ou visio).
--              Inclut un suivi de relance automatique J-15 avant expiration.
-- ============================================================================

CREATE TABLE IF NOT EXISTS questionnaire_ebook (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Q1 — Ebook(s) téléchargé(s) (multi-choix, séparés par | : "autohypnose|sommeil")
  ebook_telecharge TEXT,

  -- Q2 — Sujet qui occupe le plus la personne (multi-choix, séparé par |)
  sujet_principal TEXT,

  -- Q3 — La « pépite » trouvée dans l'ebook (champ libre court)
  pepite_ebook TEXT,

  -- Q4 — Mise en pratique + ressenti (champ libre)
  pratique_ressenti TEXT,

  -- Q5 — Principale interrogation / hésitation à consulter (multi-choix)
  interrogation_principale TEXT,

  -- Q6 — Déjà vécu une séance d'hypnose (oui / non)
  deja_seance TEXT,

  -- Q7 — Localisation (Paris / Province / Étranger)
  localisation TEXT,

  -- Q8 — Email pour recevoir le chèque cadeau
  email TEXT,

  -- Q9 — Mot libre de fin (ouverture : suggestion prochain guide, retour, etc.)
  -- Stocké dans la colonne `prochain_guide` pour rétro-compatibilité
  prochain_guide TEXT,

  -- Crédit de bienvenue
  questionnaire_complete BOOLEAN DEFAULT false,
  code_promo TEXT,
  bon_montant_eur INTEGER DEFAULT 10,
  bon_valide_jusqu_au DATE,

  -- Suivi de la relance J-15
  rappel_envoye_le TIMESTAMPTZ,
  bon_utilise_le TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS questionnaire_ebook_email_idx ON questionnaire_ebook (email);
CREATE INDEX IF NOT EXISTS questionnaire_ebook_ebook_idx ON questionnaire_ebook (ebook_telecharge);
CREATE INDEX IF NOT EXISTS questionnaire_ebook_code_promo_idx ON questionnaire_ebook (code_promo);
-- Index pour la recherche des bons à relancer (J-15 avant expiration)
CREATE INDEX IF NOT EXISTS questionnaire_ebook_rappel_idx
  ON questionnaire_ebook (bon_valide_jusqu_au)
  WHERE rappel_envoye_le IS NULL AND bon_utilise_le IS NULL;

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

COMMENT ON TABLE questionnaire_ebook IS 'Réponses questionnaire post-ebook + crédit de bienvenue 10€ (entonnoir inversé : besoins → utilité → frein → admin)';
COMMENT ON COLUMN questionnaire_ebook.rappel_envoye_le IS 'Timestamp de l''envoi du rappel automatique J-15 avant expiration';
COMMENT ON COLUMN questionnaire_ebook.bon_utilise_le IS 'Timestamp d''utilisation du crédit (à mettre à jour manuellement ou lors de la prise de RDV)';
