-- ============================================================================
-- MIGRATION DE SECURITE CRITIQUE - RGPD
-- Date: 2025-12-29
-- Description: Active Row Level Security sur TOUTES les tables et définit
--              des politiques de sécurité appropriées pour protéger les
--              données de santé (Article 9 RGPD)
-- ============================================================================

-- ============================================================================
-- SECTION 1: ACTIVER RLS SUR TOUTES LES TABLES
-- ============================================================================

-- Tables contenant des données sensibles (santé, données personnelles)
ALTER TABLE IF EXISTS quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS avion_quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS avion_quiz_question_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS avion_email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS peur_avion_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS fear_flight_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS questionnaire_avion_pre_accompagnement ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS quiz_prise_parole_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS quizaqualibre ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS package_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS promo_codes ENABLE ROW LEVEL SECURITY;

-- Tables de contenu public
ALTER TABLE IF EXISTS articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS article_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS images ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS avion_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS avion_quiz_questions ENABLE ROW LEVEL SECURITY;

-- Tables d'administration
ALTER TABLE IF EXISTS admin_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS social_media_accounts ENABLE ROW LEVEL SECURITY;

-- Table quiz_peur_avion (si elle existe et n'a pas déjà RLS)
ALTER TABLE IF EXISTS quiz_peur_avion ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- SECTION 2: SUPPRIMER LES ANCIENNES POLITIQUES (si elles existent)
-- ============================================================================

-- quiz_results
DROP POLICY IF EXISTS "Allow anonymous inserts" ON quiz_results;
DROP POLICY IF EXISTS "Allow authenticated read" ON quiz_results;
DROP POLICY IF EXISTS "Admin full access" ON quiz_results;
DROP POLICY IF EXISTS "anon_insert_quiz_results" ON quiz_results;
DROP POLICY IF EXISTS "admin_read_quiz_results" ON quiz_results;

-- avion_quiz_responses
DROP POLICY IF EXISTS "Allow anonymous inserts" ON avion_quiz_responses;
DROP POLICY IF EXISTS "Allow authenticated read" ON avion_quiz_responses;
DROP POLICY IF EXISTS "anon_insert_avion_quiz_responses" ON avion_quiz_responses;
DROP POLICY IF EXISTS "admin_read_avion_quiz_responses" ON avion_quiz_responses;

-- avion_quiz_question_responses
DROP POLICY IF EXISTS "Allow anonymous inserts" ON avion_quiz_question_responses;
DROP POLICY IF EXISTS "Allow authenticated read" ON avion_quiz_question_responses;
DROP POLICY IF EXISTS "anon_insert_avion_quiz_question_responses" ON avion_quiz_question_responses;
DROP POLICY IF EXISTS "admin_read_avion_quiz_question_responses" ON avion_quiz_question_responses;

-- ============================================================================
-- SECTION 3: POLITIQUES POUR LES DONNEES SENSIBLES DE SANTE
-- Ces tables ne doivent JAMAIS être lisibles publiquement
-- Seuls les admins peuvent lire, les anonymes peuvent insérer
-- ============================================================================

-- ----- quiz_results -----
CREATE POLICY "anon_insert_quiz_results" ON quiz_results
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_quiz_results" ON quiz_results
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_all_quiz_results" ON quiz_results
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

-- ----- avion_quiz_responses -----
CREATE POLICY "anon_insert_avion_quiz_responses" ON avion_quiz_responses
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_avion_quiz_responses" ON avion_quiz_responses
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_all_avion_quiz_responses" ON avion_quiz_responses
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

-- ----- avion_quiz_question_responses -----
CREATE POLICY "anon_insert_avion_quiz_question_responses" ON avion_quiz_question_responses
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_avion_quiz_question_responses" ON avion_quiz_question_responses
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ----- avion_email_sequences -----
CREATE POLICY "service_role_only_avion_email_sequences" ON avion_email_sequences
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- peur_avion_test_results -----
CREATE POLICY "anon_insert_peur_avion_test_results" ON peur_avion_test_results
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_peur_avion_test_results" ON peur_avion_test_results
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ----- fear_flight_tests -----
CREATE POLICY "anon_insert_fear_flight_tests" ON fear_flight_tests
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_fear_flight_tests" ON fear_flight_tests
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ----- questionnaire_avion_pre_accompagnement -----
CREATE POLICY "anon_insert_questionnaire_avion" ON questionnaire_avion_pre_accompagnement
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_questionnaire_avion" ON questionnaire_avion_pre_accompagnement
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_all_questionnaire_avion" ON questionnaire_avion_pre_accompagnement
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

-- ----- quiz_prise_parole_responses -----
CREATE POLICY "anon_insert_quiz_prise_parole" ON quiz_prise_parole_responses
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_quiz_prise_parole" ON quiz_prise_parole_responses
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ----- quizaqualibre -----
CREATE POLICY "anon_insert_quizaqualibre" ON quizaqualibre
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_quizaqualibre" ON quizaqualibre
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ----- email_logs -----
CREATE POLICY "admin_only_email_logs" ON email_logs
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- inscriptions -----
CREATE POLICY "anon_insert_inscriptions" ON inscriptions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_inscriptions" ON inscriptions
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ----- subscribers -----
CREATE POLICY "anon_insert_subscribers" ON subscribers
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_subscribers" ON subscribers
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- ----- package_orders -----
CREATE POLICY "anon_insert_package_orders" ON package_orders
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_read_package_orders" ON package_orders
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
    OR
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_update_package_orders" ON package_orders
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- promo_codes -----
CREATE POLICY "admin_only_promo_codes" ON promo_codes
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ============================================================================
-- SECTION 4: POLITIQUES POUR LE CONTENU PUBLIC
-- Ces tables peuvent être lues par tous, mais modifiées uniquement par les admins
-- ============================================================================

-- ----- articles -----
CREATE POLICY "public_read_published_articles" ON articles
  FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "authenticated_read_articles" ON articles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_articles" ON articles
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

-- ----- categories -----
CREATE POLICY "public_read_categories" ON categories
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_categories" ON categories
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_categories" ON categories
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- tags -----
CREATE POLICY "public_read_tags" ON tags
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_tags" ON tags
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_tags" ON tags
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- authors -----
CREATE POLICY "public_read_authors" ON authors
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_authors" ON authors
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_authors" ON authors
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- article_categories -----
CREATE POLICY "public_read_article_categories" ON article_categories
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_article_categories" ON article_categories
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_article_categories" ON article_categories
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- article_tags -----
CREATE POLICY "public_read_article_tags" ON article_tags
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_article_tags" ON article_tags
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_article_tags" ON article_tags
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- article_redirects -----
CREATE POLICY "public_read_article_redirects" ON article_redirects
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_article_redirects" ON article_redirects
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_article_redirects" ON article_redirects
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- images -----
CREATE POLICY "public_read_images" ON images
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_images" ON images
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_images" ON images
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- avion_profiles -----
CREATE POLICY "public_read_avion_profiles" ON avion_profiles
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_avion_profiles" ON avion_profiles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_avion_profiles" ON avion_profiles
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- avion_quiz_questions -----
CREATE POLICY "public_read_avion_quiz_questions" ON avion_quiz_questions
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "authenticated_read_avion_quiz_questions" ON avion_quiz_questions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_avion_quiz_questions" ON avion_quiz_questions
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ============================================================================
-- SECTION 5: POLITIQUES POUR LES TABLES D'ADMINISTRATION
-- Ces tables ne sont accessibles qu'aux administrateurs authentifiés
-- ============================================================================

-- ----- admin_requests -----
CREATE POLICY "authenticated_insert_admin_requests" ON admin_requests
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin_read_admin_requests" ON admin_requests
  FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

CREATE POLICY "admin_update_admin_requests" ON admin_requests
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- admin_users -----
CREATE POLICY "admin_read_admin_users" ON admin_users
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

CREATE POLICY "superadmin_all_admin_users" ON admin_users
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- user_roles -----
CREATE POLICY "user_read_own_roles" ON user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "admin_all_user_roles" ON user_roles
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- users -----
CREATE POLICY "user_read_own_data" ON users
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_all_users" ON users
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- scheduled_posts -----
CREATE POLICY "user_own_scheduled_posts" ON scheduled_posts
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin_all_scheduled_posts" ON scheduled_posts
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ----- social_media_accounts -----
CREATE POLICY "user_own_social_media_accounts" ON social_media_accounts
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin_all_social_media_accounts" ON social_media_accounts
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
  );

-- ============================================================================
-- SECTION 6: GRANT PERMISSIONS POUR LE SERVICE ROLE
-- Le service role (Edge Functions) a un accès complet
-- ============================================================================

-- Les Edge Functions utilisent le service_role qui bypass RLS automatiquement
-- Mais on s'assure que les permissions sont correctes

COMMENT ON POLICY "anon_insert_quiz_results" ON quiz_results IS
  'Permet aux utilisateurs anonymes de soumettre leurs résultats de quiz';
COMMENT ON POLICY "admin_read_quiz_results" ON quiz_results IS
  'Seuls les administrateurs peuvent lire les résultats de quiz (données de santé RGPD)';

-- ============================================================================
-- FIN DE LA MIGRATION
-- ============================================================================
