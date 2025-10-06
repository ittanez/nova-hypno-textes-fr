# Documentation Base de Données - NovaHypnose.fr

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Supabase](#architecture-supabase)
3. [Schéma de la base de données](#schéma-de-la-base-de-données)
4. [Tables détaillées](#tables-détaillées)
5. [Relations](#relations)
6. [Row Level Security (RLS)](#row-level-security-rls)
7. [Fonctions et procédures](#fonctions-et-procédures)
8. [Migrations](#migrations)
9. [Backups](#backups)
10. [Best practices](#best-practices)

---

## Vue d'ensemble

### Stack Backend

- **BaaS** : Supabase (Backend as a Service)
- **Database** : PostgreSQL 15
- **Storage** : Supabase Storage (images)
- **Auth** : Supabase Auth (JWT)
- **Edge Functions** : Deno (sitemap generation)
- **ORM** : Supabase JS Client

### Informations de connexion

**Fichier types** : `C:\Users\zenat\nova-hypno-textes-fr\src\integrations\supabase\types.ts`

**Clients Supabase** :
- `main-client.ts` : Client principal (authentifié)
- `public-client.ts` : Client public (lecture seule)
- `client.ts` : Client général

### Statistiques

| Métrique | Valeur |
|----------|--------|
| Tables | 14 |
| Relations | 5 |
| Fonctions | 6 |
| Storage buckets | 1 (images) |
| RLS policies | ~20 |
| Rows (estimation) | ~500 |

---

## Architecture Supabase

```
┌────────────────────────────────────────────────────────────┐
│                     APPLICATION REACT                       │
│                  (novahypnose.fr)                          │
└────────────┬───────────────────────────────────────────────┘
             │
             │ Supabase JS Client
             │ (@supabase/supabase-js)
             ▼
┌────────────────────────────────────────────────────────────┐
│                    SUPABASE PROJECT                         │
│            akrlyzmfszumibwgocae.supabase.co                │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   PostgreSQL    │  │    Auth      │  │   Storage    │ │
│  │   (Database)    │  │    (JWT)     │  │   (Images)   │ │
│  │                 │  │              │  │              │ │
│  │  • Tables       │  │  • Users     │  │  • Buckets   │ │
│  │  • Functions    │  │  • Sessions  │  │  • Files     │ │
│  │  • Triggers     │  │  • Roles     │  │              │ │
│  └─────────────────┘  └──────────────┘  └──────────────┘ │
│                                                             │
│  ┌─────────────────┐  ┌──────────────┐                    │
│  │  Edge Functions │  │  Realtime    │                    │
│  │    (Deno)       │  │  (WebSocket) │                    │
│  │                 │  │              │                    │
│  │  • Sitemap      │  │  • Live data │                    │
│  │  • Email        │  │  • Pub/Sub   │                    │
│  └─────────────────┘  └──────────────┘                    │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## Schéma de la base de données

### Diagramme ERD (Entity Relationship Diagram)

```
┌─────────────────┐         ┌──────────────────┐
│    articles     │◄────────│article_categories│
│─────────────────│         │──────────────────│
│ id (PK)         │         │ article_id (FK)  │
│ title           │         │ category_id (FK) │
│ slug            │         └──────────────────┘
│ content         │                  │
│ excerpt         │                  │
│ published       │                  ▼
│ featured        │         ┌──────────────────┐
│ image_url       │         │   categories     │
│ author          │         │──────────────────│
│ created_at      │         │ id (PK)          │
│ updated_at      │         │ name             │
└────────┬────────┘         │ slug             │
         │                  │ description      │
         │                  └──────────────────┘
         │
         │                  ┌──────────────────┐
         └──────────────────┤  article_tags    │
                            │──────────────────│
                            │ article_id (FK)  │
                            │ tag_id (FK)      │
                            └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │      tags        │
                            │──────────────────│
                            │ id (PK)          │
                            │ name             │
                            │ slug             │
                            └──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│   subscribers    │       │    authors       │
│──────────────────│       │──────────────────│
│ id (PK)          │       │ id (PK)          │
│ email            │       │ name             │
│ verified         │       │ email            │
│ created_at       │       │ bio              │
└──────────────────┘       │ avatar_url       │
                           └──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│   quiz_results   │       │   promo_codes    │
│──────────────────│       │──────────────────│
│ id (PK)          │       │ id (PK)          │
│ user_email       │       │ code (UNIQUE)    │
│ answers          │       │ is_assigned      │
│ total_score      │       │ user_id          │
│ recommendations  │       │ user_email       │
│ created_at       │       │ expiration_date  │
└────────┬─────────┘       └──────────────────┘
         │
         │
         ▼
┌──────────────────┐
│   email_logs     │
│──────────────────│
│ id (PK)          │
│ quiz_result_id(FK)│
│ recipient        │
│ email_type       │
│ status           │
│ sent_at          │
└──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│   admin_users    │       │ admin_requests   │
│──────────────────│       │──────────────────│
│ user_id (PK)     │       │ id (PK)          │
│ created_at       │       │ user_id          │
└──────────────────┘       │ status           │
                           │ reason           │
                           └──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│  user_roles      │       │     users        │
│──────────────────│       │──────────────────│
│ id (PK)          │       │ id (PK)          │
│ user_id          │       │ user_mail        │
│ role             │       │ first_name       │
│ created_at       │       │ last_name        │
└──────────────────┘       │ role             │
                           └──────────────────┘
```

---

## Tables détaillées

### articles

**Description** : Articles de blog du site "Émergences"

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\integrations\supabase\types.ts` (ligne 123)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `title` | text | NOT NULL | Titre de l'article |
| `slug` | text | UNIQUE | URL-friendly (ex: `hypnose-anxiete`) |
| `content` | text | NOT NULL | Contenu Markdown/HTML |
| `excerpt` | text | | Résumé court (150-200 car.) |
| `published` | boolean | DEFAULT false | Publié ou brouillon |
| `featured` | boolean | DEFAULT false | Article en vedette |
| `image_url` | text | | URL image principale |
| `author` | text | | Nom de l'auteur |
| `categories` | text[] | | Tableau de catégories (legacy) |
| `tags` | text[] | | Tableau de tags (legacy) |
| `created_at` | timestamp | DEFAULT now() | Date de création |
| `updated_at` | timestamp | DEFAULT now() | Dernière modification |

**Indexes** :
- `articles_slug_idx` sur `slug` (UNIQUE)
- `articles_published_idx` sur `published`
- `articles_created_at_idx` sur `created_at`

**Triggers** :
- `update_articles_updated_at` : Met à jour `updated_at` automatiquement

**Usage** :

```typescript
// Récupérer tous les articles publiés
const { data, error } = await supabase
  .from('articles')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false });

// Récupérer un article par slug
const { data, error } = await supabase
  .from('articles')
  .select('*')
  .eq('slug', 'hypnose-anxiete')
  .single();
```

---

### categories

**Description** : Catégories d'articles de blog

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `name` | text | NOT NULL | Nom de la catégorie |
| `slug` | text | UNIQUE, NOT NULL | URL slug |
| `description` | text | | Description |
| `created_at` | timestamp | DEFAULT now() | Date de création |

**Exemples** :
- Hypnose thérapeutique
- Auto-hypnose
- Techniques
- Témoignages

---

### tags

**Description** : Tags pour articles de blog

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `name` | text | NOT NULL | Nom du tag |
| `slug` | text | UNIQUE, NOT NULL | URL slug |
| `created_at` | timestamp | DEFAULT now() | Date de création |

**Exemples** :
- anxiété, tabac, confiance, sommeil, phobies

---

### article_categories

**Description** : Table de liaison articles ↔ categories (Many-to-Many)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `article_id` | uuid | FK, NOT NULL | Référence article |
| `category_id` | uuid | FK, NOT NULL | Référence catégorie |

**Contrainte composite** : PRIMARY KEY (`article_id`, `category_id`)

**Relations** :
- `article_id` → `articles.id` (ON DELETE CASCADE)
- `category_id` → `categories.id` (ON DELETE CASCADE)

---

### article_tags

**Description** : Table de liaison articles ↔ tags (Many-to-Many)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `article_id` | uuid | FK, NOT NULL | Référence article |
| `tag_id` | uuid | FK, NOT NULL | Référence tag |

**Contrainte composite** : PRIMARY KEY (`article_id`, `tag_id`)

---

### subscribers

**Description** : Newsletter subscribers

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `email` | text | UNIQUE, NOT NULL | Email |
| `verified` | boolean | DEFAULT false | Email vérifié |
| `created_at` | timestamp | DEFAULT now() | Date d'inscription |

**RLS** :
- Public : INSERT autorisé
- Admin : SELECT, UPDATE, DELETE

---

### quiz_results

**Description** : Résultats du quiz VAKOG auto-hypnose

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | serial | PK, NOT NULL | Identifiant unique |
| `user_email` | text | NOT NULL | Email utilisateur |
| `first_name` | text | | Prénom |
| `last_name` | text | | Nom |
| `answers` | jsonb | NOT NULL | Réponses au quiz |
| `total_score` | integer | NOT NULL | Score total |
| `recommendations` | text | NOT NULL | Recommandations |
| `sense_dominant` | text | | Sens dominant (V/A/K/O/G) |
| `dimension_scores` | jsonb | | Scores par dimension |
| `category` | text | | Catégorie de profil |
| `pdf_url` | text | | URL du PDF résultats |
| `email_sent` | boolean | DEFAULT false | Email envoyé |
| `email_sent_at` | timestamp | | Date envoi email |
| `vakog_answers` | text | | Réponses VAKOG (legacy) |
| `created_at` | timestamp | DEFAULT now() | Date de création |

**Indexes** :
- `quiz_results_email_idx` sur `user_email`

---

### email_logs

**Description** : Logs des emails envoyés (quiz, newsletter, etc.)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `quiz_result_id` | integer | FK | Référence quiz_results |
| `recipient` | text | NOT NULL | Destinataire |
| `email_type` | text | NOT NULL | Type (quiz, newsletter) |
| `status` | text | NOT NULL | sent, failed, pending |
| `resend_id` | text | | ID Resend (service email) |
| `error_message` | text | | Message d'erreur si échec |
| `sent_at` | timestamp | DEFAULT now() | Date d'envoi |

---

### promo_codes

**Description** : Codes promo Stripe (auto-hypnose, packs)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `code` | text | UNIQUE, NOT NULL | Code promo (ex: `NOVA2025`) |
| `is_assigned` | boolean | DEFAULT false | Assigné à un utilisateur |
| `user_id` | text | | ID utilisateur |
| `user_email` | text | | Email utilisateur |
| `stripe_promo_code_id` | text | | ID Stripe |
| `stripe_synced` | boolean | DEFAULT false | Synchronisé avec Stripe |
| `expiration_date` | timestamp | | Date d'expiration |
| `assigned_at` | timestamp | | Date d'assignation |
| `created_at` | timestamp | DEFAULT now() | Date de création |

---

### admin_users

**Description** : Utilisateurs administrateurs (accès admin dashboard)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `user_id` | uuid | PK, NOT NULL | Référence auth.users |
| `created_at` | timestamp | DEFAULT now() | Date de création |

**RLS** :
- Lecture : Authentifié uniquement
- Écriture : Super admin uniquement

---

### admin_requests

**Description** : Demandes d'accès admin (workflow d'approbation)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `user_id` | text | NOT NULL | ID utilisateur demandeur |
| `user_email` | text | NOT NULL | Email |
| `full_name` | text | NOT NULL | Nom complet |
| `reason` | text | NOT NULL | Raison de la demande |
| `status` | text | DEFAULT 'pending' | pending, approved, rejected |
| `reviewed_by` | text | | ID admin qui a validé |
| `reviewed_at` | timestamp | | Date de validation |
| `created_at` | timestamp | DEFAULT now() | Date de demande |

---

### user_roles

**Description** : Rôles utilisateurs (admin, editor, viewer)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `user_id` | text | NOT NULL | ID utilisateur |
| `role` | text | NOT NULL | admin, editor, viewer |
| `created_at` | timestamp | DEFAULT now() | Date d'assignation |

---

### images

**Description** : Métadonnées des images uploadées (Supabase Storage)

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| `id` | uuid | PK, NOT NULL | Identifiant unique |
| `name` | text | NOT NULL | Nom du fichier |
| `storage_path` | text | NOT NULL | Chemin dans storage |
| `public_url` | text | NOT NULL | URL publique |
| `mime_type` | text | | Type MIME |
| `size` | integer | | Taille en octets |
| `width` | integer | | Largeur (pixels) |
| `height` | integer | | Hauteur (pixels) |
| `description` | text | | Description |
| `uploaded_at` | timestamp | DEFAULT now() | Date d'upload |

---

## Relations

### Article ↔ Categories (Many-to-Many)

```sql
-- Un article peut avoir plusieurs catégories
-- Une catégorie peut avoir plusieurs articles

SELECT a.title, c.name as category
FROM articles a
JOIN article_categories ac ON a.id = ac.article_id
JOIN categories c ON ac.category_id = c.id;
```

### Article ↔ Tags (Many-to-Many)

```sql
-- Un article peut avoir plusieurs tags
-- Un tag peut être sur plusieurs articles

SELECT a.title, t.name as tag
FROM articles a
JOIN article_tags at ON a.id = at.article_id
JOIN tags t ON at.tag_id = t.id;
```

### Quiz Result → Email Logs (One-to-Many)

```sql
-- Un quiz_result peut avoir plusieurs email_logs (envoi, rappel)

SELECT qr.user_email, el.status, el.sent_at
FROM quiz_results qr
JOIN email_logs el ON qr.id = el.quiz_result_id;
```

---

## Row Level Security (RLS)

### Principe

Supabase utilise **Row Level Security (RLS)** de PostgreSQL pour sécuriser les données au niveau des lignes.

**Avantages** :
- Sécurité au niveau base de données
- Pas de logique de sécurité côté client
- Protection contre les requêtes malveillantes

### Configuration générale

```sql
-- Activer RLS sur une table
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
CREATE POLICY "Public read access"
ON articles FOR SELECT
USING (published = true);

-- Politique d'écriture admin uniquement
CREATE POLICY "Admin write access"
ON articles FOR ALL
USING (auth.uid() IN (SELECT user_id FROM admin_users));
```

### Politiques par table

#### articles

```sql
-- Lecture : Tout le monde peut lire les articles publiés
CREATE POLICY "articles_public_read"
ON articles FOR SELECT
USING (published = true);

-- Écriture : Admin uniquement
CREATE POLICY "articles_admin_write"
ON articles FOR INSERT
WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "articles_admin_update"
ON articles FOR UPDATE
USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "articles_admin_delete"
ON articles FOR DELETE
USING (auth.uid() IN (SELECT user_id FROM admin_users));
```

#### subscribers

```sql
-- Insertion publique (formulaire newsletter)
CREATE POLICY "subscribers_public_insert"
ON subscribers FOR INSERT
WITH CHECK (true);

-- Lecture/modification admin uniquement
CREATE POLICY "subscribers_admin_read"
ON subscribers FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM admin_users));
```

#### quiz_results

```sql
-- Insertion publique (quiz auto-hypnose)
CREATE POLICY "quiz_results_public_insert"
ON quiz_results FOR INSERT
WITH CHECK (true);

-- Lecture admin uniquement
CREATE POLICY "quiz_results_admin_read"
ON quiz_results FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM admin_users));
```

#### admin_users

```sql
-- Lecture : Utilisateur authentifié peut voir s'il est admin
CREATE POLICY "admin_users_read"
ON admin_users FOR SELECT
USING (auth.uid() = user_id);

-- Écriture : Super admin uniquement (manuel)
-- Pas de politique INSERT pour éviter auto-promotion
```

### Tester les politiques RLS

```sql
-- Se connecter en tant qu'utilisateur spécifique
SET LOCAL role authenticated;
SET LOCAL request.jwt.claim.sub = '<user_id>';

-- Tester une requête
SELECT * FROM articles;

-- Reset
RESET role;
```

**Interface Supabase** :
1. Dashboard > Authentication > Policies
2. Tester les politiques avec différents utilisateurs

---

## Fonctions et procédures

### Fonctions stockées

**Fichier types** : `C:\Users\zenat\nova-hypno-textes-fr\src\integrations\supabase\types.ts` (ligne 578)

#### generate_promo_code()

```sql
CREATE OR REPLACE FUNCTION generate_promo_code()
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'NOVA' || UPPER(random_string(6));
END;
$$;
```

**Usage** :

```typescript
const { data, error } = await supabase.rpc('generate_promo_code');
// Retourne: "NOVAABC123"
```

#### get_article_id_by_slug(slug_param text)

```sql
CREATE OR REPLACE FUNCTION get_article_id_by_slug(slug_param text)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  article_id uuid;
BEGIN
  SELECT id INTO article_id
  FROM articles
  WHERE slug = slug_param;

  RETURN article_id;
END;
$$;
```

**Usage** :

```typescript
const { data, error } = await supabase.rpc('get_article_id_by_slug', {
  slug_param: 'hypnose-anxiete'
});
// Retourne: uuid de l'article
```

#### is_admin(user_id text)

```sql
CREATE OR REPLACE FUNCTION is_admin(user_id text)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = is_admin.user_id
  );
END;
$$;
```

**Usage** :

```typescript
const { data, error } = await supabase.rpc('is_admin', {
  user_id: auth.user.id
});
// Retourne: true/false
```

#### has_role(user_id text, required_role text)

```sql
CREATE OR REPLACE FUNCTION has_role(user_id text, required_role text)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = has_role.user_id
    AND role = required_role
  );
END;
$$;
```

---

## Migrations

### Gestion des migrations

**Outil** : Supabase CLI

```bash
# Installation
npm install -g supabase

# Login
supabase login

# Initialiser le projet local
supabase init

# Créer une nouvelle migration
supabase migration new add_featured_column_to_articles

# Éditer le fichier SQL généré
# supabase/migrations/20251006_add_featured_column_to_articles.sql
```

### Exemple de migration

**Fichier** : `supabase/migrations/20251006_add_featured_column.sql`

```sql
-- Add featured column to articles table
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Create index
CREATE INDEX IF NOT EXISTS articles_featured_idx ON articles(featured);

-- Update existing articles (optionnel)
UPDATE articles SET featured = false WHERE featured IS NULL;
```

### Appliquer les migrations

```bash
# Local (dev)
supabase db push

# Production
# Via Supabase Dashboard > Database > Migrations
# Ou via CI/CD
```

### Rollback

```sql
-- Créer une migration de rollback
-- supabase/migrations/20251006_rollback_featured_column.sql

ALTER TABLE articles DROP COLUMN IF EXISTS featured;
DROP INDEX IF EXISTS articles_featured_idx;
```

### Best practices migrations

1. **Toujours tester en local** avant production
2. **Migrations incrémentales** : Petits changements
3. **Nommer clairement** : `YYYYMMDD_description.sql`
4. **Rollback plan** : Prévoir une migration inverse
5. **Pas de données sensibles** dans les migrations

---

## Backups

### Backups automatiques Supabase

**Fréquence** :
- **Daily backups** : 7 derniers jours (plan Pro)
- **Point-in-time recovery** : Dernières 24h (plan Pro)

**Accès** :
1. Supabase Dashboard
2. **Database** > **Backups**
3. Sélectionner un backup
4. **Restore** ou **Download**

### Backup manuel

```bash
# Installer pg_dump (PostgreSQL tools)
# Windows : https://www.postgresql.org/download/windows/
# Mac : brew install postgresql

# Backup complet
pg_dump -h db.akrlyzmfszumibwgocae.supabase.co \
  -U postgres \
  -d postgres \
  -F c \
  -f backup_$(date +%Y%m%d).dump

# Backup d'une table spécifique
pg_dump -h db.akrlyzmfszumibwgocae.supabase.co \
  -U postgres \
  -d postgres \
  -t articles \
  -F c \
  -f articles_backup_$(date +%Y%m%d).dump
```

### Restore depuis backup

```bash
# Restore complet
pg_restore -h db.akrlyzmfszumibwgocae.supabase.co \
  -U postgres \
  -d postgres \
  -c \
  backup_20251006.dump

# Restore d'une table
pg_restore -h db.akrlyzmfszumibwgocae.supabase.co \
  -U postgres \
  -d postgres \
  -t articles \
  backup_20251006.dump
```

### Backup de Storage (images)

**Via Supabase CLI** :

```bash
# Télécharger tous les fichiers d'un bucket
supabase storage download images --bucket images --directory ./backup_images/
```

**Script automatisé** :

```bash
#!/bin/bash
# backup-storage.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="./backups/$DATE"

mkdir -p $BACKUP_DIR

# Backup bucket images
supabase storage download images \
  --bucket images \
  --directory $BACKUP_DIR/images

echo "Backup completed: $BACKUP_DIR"
```

### Stratégie de backup recommandée

**Quotidien** :
- Backup automatique Supabase (actif)
- Retention : 7 jours

**Hebdomadaire** :
- Backup manuel téléchargé
- Stockage externe (Google Drive, Dropbox)

**Mensuel** :
- Backup complet + storage
- Archivage long terme

---

## Best practices

### Requêtes optimisées

```typescript
// ✅ BON - Sélectionner uniquement les colonnes nécessaires
const { data } = await supabase
  .from('articles')
  .select('id, title, slug, created_at')
  .eq('published', true)
  .limit(10);

// ❌ MAUVAIS - Sélectionner toutes les colonnes
const { data } = await supabase
  .from('articles')
  .select('*')
  .eq('published', true);
```

### Utiliser les indexes

```sql
-- Créer un index sur les colonnes fréquemment interrogées
CREATE INDEX articles_published_idx ON articles(published);
CREATE INDEX articles_created_at_idx ON articles(created_at DESC);

-- Index composite pour requêtes multiples
CREATE INDEX articles_published_created_idx ON articles(published, created_at DESC);
```

### Pagination

```typescript
// Pagination avec offset
const { data, count } = await supabase
  .from('articles')
  .select('*', { count: 'exact' })
  .range(0, 9); // Page 1 (0-9)

// Pagination avec cursor (meilleure performance)
const { data } = await supabase
  .from('articles')
  .select('*')
  .lt('created_at', lastArticleDate)
  .order('created_at', { ascending: false })
  .limit(10);
```

### Éviter les N+1 queries

```typescript
// ✅ BON - Jointure avec select()
const { data } = await supabase
  .from('articles')
  .select(`
    *,
    article_categories(category_id, categories(name))
  `);

// ❌ MAUVAIS - Requête séparée pour chaque article
const articles = await supabase.from('articles').select('*');
for (const article of articles.data) {
  const categories = await supabase
    .from('article_categories')
    .select('*, categories(*)')
    .eq('article_id', article.id);
}
```

### Gestion des erreurs

```typescript
const { data, error } = await supabase
  .from('articles')
  .insert({ title: 'Test', content: 'Content' });

if (error) {
  console.error('Database error:', error.message);
  // Log vers service de monitoring (Sentry, LogRocket)
  throw new Error('Failed to create article');
}
```

### Types TypeScript

```typescript
import { Database } from '@/integrations/supabase/types';

type Article = Database['public']['Tables']['articles']['Row'];
type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

// Usage
const newArticle: ArticleInsert = {
  title: 'Mon article',
  content: 'Contenu...',
  slug: 'mon-article'
};
```

### Sécurité

1. **Jamais exposer les clés secrètes** côté client
2. **Utiliser RLS** pour toutes les tables
3. **Valider les données** avant insertion
4. **Échapper les entrées utilisateur**
5. **Limiter les permissions** des API keys

---

## Ressources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Types](C:\Users\zenat\nova-hypno-textes-fr\src\integrations\supabase\types.ts)

---

**Dernière mise à jour** : 6 octobre 2025
**Maintenu par** : Équipe NovaHypnose
