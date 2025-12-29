-- ============================================================================
-- SCRIPT D'URGENCE - A EXECUTER IMMEDIATEMENT DANS SUPABASE SQL EDITOR
-- ============================================================================
-- Ce script doit être exécuté en PREMIER pour bloquer l'accès public
-- Ensuite, exécutez le script complet 20251229_enable_rls_all_tables.sql
-- ============================================================================

-- ETAPE 1: ACTIVER RLS SUR TOUTES LES TABLES SENSIBLES IMMEDIATEMENT
-- Cela bloque tout accès public même sans politiques définies

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
ALTER TABLE IF EXISTS admin_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS social_media_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS quiz_peur_avion ENABLE ROW LEVEL SECURITY;

-- ETAPE 2: Politiques minimales pour permettre l'insertion des quiz
-- (sinon les formulaires du site ne fonctionneront plus)

-- quiz_results - permettre l'insertion anonyme
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_results' AND policyname = 'anon_insert_quiz_results') THEN
    EXECUTE 'CREATE POLICY "anon_insert_quiz_results" ON quiz_results FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- avion_quiz_responses - permettre l'insertion anonyme
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'avion_quiz_responses' AND policyname = 'anon_insert_avion_quiz_responses') THEN
    EXECUTE 'CREATE POLICY "anon_insert_avion_quiz_responses" ON avion_quiz_responses FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- avion_quiz_question_responses
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'avion_quiz_question_responses' AND policyname = 'anon_insert_avion_quiz_question_responses') THEN
    EXECUTE 'CREATE POLICY "anon_insert_avion_quiz_question_responses" ON avion_quiz_question_responses FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- peur_avion_test_results
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'peur_avion_test_results' AND policyname = 'anon_insert_peur_avion') THEN
    EXECUTE 'CREATE POLICY "anon_insert_peur_avion" ON peur_avion_test_results FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- fear_flight_tests
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'fear_flight_tests' AND policyname = 'anon_insert_fear_flight') THEN
    EXECUTE 'CREATE POLICY "anon_insert_fear_flight" ON fear_flight_tests FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- questionnaire_avion_pre_accompagnement
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questionnaire_avion_pre_accompagnement' AND policyname = 'anon_insert_questionnaire') THEN
    EXECUTE 'CREATE POLICY "anon_insert_questionnaire" ON questionnaire_avion_pre_accompagnement FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- quiz_prise_parole_responses
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_prise_parole_responses' AND policyname = 'anon_insert_prise_parole') THEN
    EXECUTE 'CREATE POLICY "anon_insert_prise_parole" ON quiz_prise_parole_responses FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- quizaqualibre
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quizaqualibre' AND policyname = 'anon_insert_aqualibre') THEN
    EXECUTE 'CREATE POLICY "anon_insert_aqualibre" ON quizaqualibre FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- inscriptions
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'inscriptions' AND policyname = 'anon_insert_inscriptions') THEN
    EXECUTE 'CREATE POLICY "anon_insert_inscriptions" ON inscriptions FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- subscribers
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'subscribers' AND policyname = 'anon_insert_subscribers') THEN
    EXECUTE 'CREATE POLICY "anon_insert_subscribers" ON subscribers FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- package_orders
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'package_orders' AND policyname = 'anon_insert_orders') THEN
    EXECUTE 'CREATE POLICY "anon_insert_orders" ON package_orders FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- ============================================================================
-- VERIFICATION: Exécutez cette requête pour vérifier que RLS est activé
-- ============================================================================
-- SELECT tablename, rowsecurity FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;
-- ============================================================================
