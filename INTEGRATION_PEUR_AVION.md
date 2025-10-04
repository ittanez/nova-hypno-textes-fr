# Intégration Site Peur de l'Avion - Résumé

## ✅ Ce qui a été fait

### 1. **Ajout des 3 sections manquantes**
Les sections suivantes du site en ligne ont été intégrées dans `/public/peur-avion-maquette.html` :

#### Section "Vous reconnaissez-vous ?" (lignes 258-301)
- 4 cartes illustrées avec icons SVG
- Anxiété paralysante, Évitement des voyages, Dépendance médicaments, Nuits blanches
- Design Tailwind responsive

#### Section "Comprendre la peur de l'avion" (lignes 303-389)
- Explication de l'aviophobia (20% de la population)
- 5 causes principales avec icons
- Statistiques rassurantes (1/11 millions, x200 plus sûr, 99.99997% vols sains)
- Images Supabase : hublot d'avion + avion sécurité

#### Section "Pourquoi l'hypnothérapie" (lignes 391-521)
- Comparatif 3 méthodes : Médicaments vs TCC vs Hypnothérapie
- Badge "RECOMMANDÉ" sur hypnothérapie
- Image famille aéroport
- 4 bénéfices clés avec icons verts

### 2. **Intégration Stripe Checkout** ✅

#### Netlify Function créée
- `/netlify/functions/create-checkout.js`
- Gère la création de session Stripe Checkout
- Support CORS
- Métadonnées personnalisées

#### Configuration Netlify
- `netlify.toml` mis à jour avec :
  - `functions = "netlify/functions"`
  - `node_bundler = "esbuild"`
  - Node version 18

#### Bouton de paiement
- Ligne 586-588 : Bouton "Je réserve mon programme maintenant"
- Script JavaScript (lignes 1861-1899) :
  - Appel à `/.netlify/functions/create-checkout`
  - Gestion erreurs
  - Redirection vers Stripe Checkout

### 3. **Connexion Quiz à Supabase + Emails** ✅

#### Netlify Function Email
- `/netlify/functions/send-test-results.js`
- Sauvegarde résultats dans Supabase
- Email personnalisé HTML avec Resend
- Recommandations basées sur le score
- Email notification admin

#### Table Supabase
- `/supabase/migrations/create_quiz_peur_avion_table.sql`
- Table `quiz_peur_avion` avec :
  - id, email, first_name, total_score, percentage, fear_level
  - recommendations, answers (JSONB), created_at
  - Index sur email, created_at, fear_level
  - Row Level Security activé

#### Template Email
- Design moderne avec dégradé NovaHypnose
- Résultats personnalisés
- Recommandations immédiates + long terme
- CTA vers le programme 497€ (si score > 40%)

---

## 🔧 Configuration nécessaire

### Variables d'environnement (.env)
```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_votre_cle
STRIPE_PRICE_ID=price_1QVEWQKYUjGnWJ3C7sYa9eZP  # À vérifier/changer

# Supabase
VITE_SUPABASE_URL=https://akrlyzmfszumibwgocae.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon

# Resend (emails)
RESEND_API_KEY=re_votre_cle
FROM_EMAIL=NovaHypnose <contact@novahypnose.fr>

# Site
SITE_URL=https://novahypnose.fr
```

### Dépendances NPM à installer
```bash
npm install stripe @supabase/supabase-js resend
```

---

## 📋 Prochaines étapes

### 1. **Configuration Stripe**
- [ ] Créer/vérifier le Price ID dans Stripe Dashboard
- [ ] Tester le paiement en mode test
- [ ] Configurer les webhooks Stripe (optionnel)
- [ ] Créer page de succès `/success.html`

### 2. **Configuration Supabase**
- [ ] Exécuter la migration SQL pour créer la table `quiz_peur_avion`
- [ ] Vérifier les policies RLS
- [ ] Tester l'insertion de données

### 3. **Configuration Resend**
- [ ] Créer compte Resend si nécessaire
- [ ] Obtenir API key
- [ ] Vérifier domaine d'envoi

### 4. **Connecter le Quiz existant**
Le quiz est déjà présent dans la page mais il faut l'adapter pour :
- [ ] Collecter email + prénom avant affichage résultats
- [ ] Calculer score + pourcentage + niveau de peur
- [ ] Appeler `/.netlify/functions/send-test-results` avec les données
- [ ] Afficher confirmation d'envoi email

### 5. **Tests**
- [ ] Tester le parcours complet : Quiz → Email → Paiement
- [ ] Vérifier responsive mobile
- [ ] Tester avec différents scores de peur
- [ ] Valider emails reçus (client + admin)

### 6. **Déploiement**
- [ ] Configurer variables d'environnement sur Netlify
- [ ] Déployer sur Netlify
- [ ] Tester en production

---

## 📝 Notes importantes

### Prix affiché
- Site en ligne : **497€** (vérifié sur https://peurdelavion.novahypnose.fr/)
- Maquette : **497€** ✅ IDENTIQUE

### Images utilisées
Toutes les images sont hébergées sur Supabase :
- `https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/peuravion/...`
- vue-depuis-un-hublot-d-avion.webp
- avionsecurite.webp
- familleaeroport.webp

### Différences avec site en ligne
La maquette a maintenant **TOUT le contenu** du site en ligne PLUS :
- ✅ Tableau comparatif concurrents (Air France, AviaSim, CTPA)
- ✅ Bannière urgence "Vol dans moins d'un mois"
- ✅ Navigation complète site NovaHypnose
- ✅ Architecture React (vs HTML simple)

---

## 🚀 Commandes utiles

### Développement local
```bash
npm run dev                    # Lancer le dev server
netlify dev                    # Tester avec Netlify Functions localement
```

### Build et déploiement
```bash
npm run build                  # Build production
netlify deploy --prod          # Déployer sur Netlify
```

### Supabase
```bash
supabase db push              # Appliquer migrations
supabase db reset             # Reset database (dev only)
```

---

## 📧 Support

Pour toute question :
- **Technique** : Vérifier les logs Netlify Functions
- **Stripe** : Dashboard Stripe → Logs
- **Supabase** : Table Editor + SQL Editor
- **Emails** : Dashboard Resend → Logs

---

**Date d'intégration** : 4 octobre 2025
**Fichiers modifiés** :
- `/public/peur-avion-maquette.html`
- `/netlify.toml`
- `/netlify/functions/create-checkout.js` (créé)
- `/netlify/functions/send-test-results.js` (créé)
- `/supabase/migrations/create_quiz_peur_avion_table.sql` (créé)
