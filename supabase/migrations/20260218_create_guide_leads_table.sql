-- ============================================================================
-- MIGRATION - Table guide_leads
-- Date: 2026-02-18
-- Description: Stocke les leads du formulaire de téléchargement du guide
--              « Vous tenez. Mais jusqu'à quand ? »
-- ============================================================================

CREATE TABLE IF NOT EXISTS guide_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'landing-page',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index unique sur email pour éviter les doublons
CREATE UNIQUE INDEX IF NOT EXISTS guide_leads_email_unique ON guide_leads (email);

-- Activer Row Level Security
ALTER TABLE guide_leads ENABLE ROW LEVEL SECURITY;

-- Les visiteurs anonymes peuvent s'inscrire
CREATE POLICY "anon_insert_guide_leads" ON guide_leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Seuls les admins peuvent lire les leads
CREATE POLICY "admin_read_guide_leads" ON guide_leads
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_all_guide_leads" ON guide_leads
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

COMMENT ON TABLE guide_leads IS 'Leads du guide gratuit — landing page ebook émotions au travail';
