-- Tunnel « Décryptage » : origine de la visite (guide, blog, email…).
-- Valeurs nettoyées côté fonction (minuscules, [a-z0-9_-], 60 caractères max).
-- Exemples : guide / merci / sommeil ; blog / encart / <slug> ; email / sequence / email2-sommeil.

ALTER TABLE public.decryptage_responses
  ADD COLUMN IF NOT EXISTS utm_source  text CHECK (utm_source  IS NULL OR char_length(utm_source)  <= 60),
  ADD COLUMN IF NOT EXISTS utm_medium  text CHECK (utm_medium  IS NULL OR char_length(utm_medium)  <= 60),
  ADD COLUMN IF NOT EXISTS utm_content text CHECK (utm_content IS NULL OR char_length(utm_content) <= 60);
