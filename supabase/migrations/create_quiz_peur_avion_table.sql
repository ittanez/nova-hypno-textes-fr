-- Create table for quiz peur de l'avion results
CREATE TABLE IF NOT EXISTS quiz_peur_avion (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  total_score INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  fear_level TEXT NOT NULL,
  recommendations TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quiz_peur_avion_email ON quiz_peur_avion(email);
CREATE INDEX IF NOT EXISTS idx_quiz_peur_avion_created_at ON quiz_peur_avion(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_peur_avion_fear_level ON quiz_peur_avion(fear_level);

-- Enable Row Level Security
ALTER TABLE quiz_peur_avion ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anonymous users
CREATE POLICY "Allow anonymous inserts" ON quiz_peur_avion
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all data
CREATE POLICY "Allow authenticated read" ON quiz_peur_avion
  FOR SELECT
  TO authenticated
  USING (true);

-- Comments
COMMENT ON TABLE quiz_peur_avion IS 'Stocke les résultats du quiz de peur de l''avion';
COMMENT ON COLUMN quiz_peur_avion.email IS 'Email du participant';
COMMENT ON COLUMN quiz_peur_avion.first_name IS 'Prénom du participant';
COMMENT ON COLUMN quiz_peur_avion.total_score IS 'Score total sur 48 points';
COMMENT ON COLUMN quiz_peur_avion.percentage IS 'Pourcentage de peur (0-100%)';
COMMENT ON COLUMN quiz_peur_avion.fear_level IS 'Niveau de peur identifié';
COMMENT ON COLUMN quiz_peur_avion.answers IS 'Réponses détaillées au format JSON';
