# Documentation NovaHypnose.fr

Bienvenue dans la documentation complète du projet NovaHypnose.fr.

---

## Vue d'ensemble du projet

**NovaHypnose.fr** est le site web officiel du cabinet d'hypnothérapie NovaHypnose à Paris 4ème, dirigé par Alain Zenatti, Maître Hypnologue certifié.

### Technologies principales

- **Frontend** : React 18.3 + TypeScript 5.5 + Vite 5.4
- **UI** : Tailwind CSS 3.4 + shadcn/ui
- **Backend** : Supabase (PostgreSQL, Auth, Storage)
- **Déploiement** : Netlify (CI/CD automatique)
- **Performance** : Score SEO 9.5/10, Lighthouse > 90

---

## Table des matières de la documentation

### Guides de démarrage

| Document | Description | Audience |
|----------|-------------|----------|
| [README.md](../README.md) | Documentation principale et démarrage rapide | Tous |
| [QUICK_START.md](../QUICK_START.md) | Démarrage en 5 minutes | Développeurs |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Guide de contribution et standards | Contributeurs |

### Documentation technique

| Document | Description | Audience |
|----------|-------------|----------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Architecture technique complète | Développeurs, Architectes |
| [DATABASE.md](./DATABASE.md) | Schéma base de données Supabase | Développeurs Backend |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Guide de déploiement Netlify | DevOps, Administrateurs |

### Documentation opérationnelle

| Document | Description | Audience |
|----------|-------------|----------|
| [MAINTENANCE.md](./MAINTENANCE.md) | Procédures de maintenance | Ops, Administrateurs |
| [SEO.md](./SEO.md) | Stratégie et optimisation SEO | Marketing, Content |
| [CHANGELOG.md](../CHANGELOG.md) | Historique des versions | Tous |

### Documentation de référence

| Document | Description | Audience |
|----------|-------------|----------|
| [REFACTORING.md](../REFACTORING.md) | Guide du refactoring et patterns | Développeurs |
| [SEO-OPTIMIZATION-GUIDE.md](../SEO-OPTIMIZATION-GUIDE.md) | Guide optimisation SEO H1-H6 | Développeurs, SEO |

---

## Guides par cas d'usage

### Je veux...

#### ...démarrer le projet localement

1. Lire [README.md](../README.md) section "Démarrage rapide"
2. Lire [QUICK_START.md](../QUICK_START.md) pour les détails
3. Configurer les variables d'environnement (voir [DEPLOYMENT.md](./DEPLOYMENT.md#variables-denvironnement))

#### ...contribuer au projet

1. Lire [CONTRIBUTING.md](../CONTRIBUTING.md) en entier
2. Comprendre l'architecture : [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Suivre le workflow Git décrit dans CONTRIBUTING.md

#### ...déployer en production

1. Lire [DEPLOYMENT.md](./DEPLOYMENT.md) section "Workflow de déploiement"
2. Vérifier la checklist de déploiement
3. Suivre les procédures de rollback en cas de problème

#### ...optimiser le SEO

1. Lire [SEO.md](./SEO.md) stratégie complète
2. Suivre la checklist SEO pour nouveau contenu
3. Utiliser [SEO-OPTIMIZATION-GUIDE.md](../SEO-OPTIMIZATION-GUIDE.md) pour H1-H6

#### ...gérer la base de données

1. Lire [DATABASE.md](./DATABASE.md) schéma complet
2. Comprendre Row Level Security (RLS)
3. Suivre les procédures de migration et backup

#### ...assurer la maintenance

1. Lire [MAINTENANCE.md](./MAINTENANCE.md) procédures complètes
2. Suivre les checklists quotidiennes/hebdomadaires/mensuelles
3. Mettre à jour les dépendances selon le calendrier

---

## Structure de la documentation

```
nova-hypno-textes-fr/
├── README.md                       # Documentation principale
├── CHANGELOG.md                    # Historique des versions
├── CONTRIBUTING.md                 # Guide de contribution
├── QUICK_START.md                  # Démarrage rapide
├── REFACTORING.md                  # Guide refactoring
├── SEO-OPTIMIZATION-GUIDE.md       # Guide SEO H1-H6
│
└── docs/                           # Documentation approfondie
    ├── README.md                   # Ce fichier (index)
    ├── ARCHITECTURE.md             # Architecture technique
    ├── DATABASE.md                 # Base de données
    ├── DEPLOYMENT.md               # Déploiement
    ├── MAINTENANCE.md              # Maintenance
    └── SEO.md                      # Stratégie SEO
```

---

## Références rapides

### Commandes essentielles

```bash
# Développement
npm run dev

# Build production
npm run build

# Tests
npm run test

# Linter
npm run lint

# Générer sitemap
npm run generate-sitemap
```

### Liens importants

| Ressource | URL |
|-----------|-----|
| **Site web** | https://novahypnose.fr |
| **Repository GitHub** | https://github.com/ittanez/nova-hypno-textes-fr |
| **Netlify Dashboard** | https://app.netlify.com |
| **Supabase Dashboard** | https://supabase.com/dashboard |
| **Google Search Console** | https://search.google.com/search-console |

### Fichiers de configuration

| Fichier | Description |
|---------|-------------|
| `vite.config.ts` | Configuration Vite (build) |
| `netlify.toml` | Configuration Netlify (deploy) |
| `tailwind.config.ts` | Configuration Tailwind CSS |
| `tsconfig.json` | Configuration TypeScript |
| `.env.example` | Variables d'environnement (template) |

---

## Contributions à la documentation

### Comment améliorer cette documentation

1. **Identifier** : Trouver une section manquante ou obsolète
2. **Créer branche** : `git checkout -b docs/amelioration-xyz`
3. **Modifier** : Éditer les fichiers Markdown
4. **Tester** : Vérifier la lisibilité et les liens
5. **Commit** : `git commit -m "docs(scope): amélioration xyz"`
6. **Pull Request** : Créer une PR avec description claire

### Standards de documentation

**Format Markdown** :
- Titres clairs et hiérarchisés (H1 → H6)
- Code blocks avec langage spécifié
- Tables pour données structurées
- Listes à puces pour énumérations
- Liens internes entre documents

**Ton** :
- Professionnel mais accessible
- Clair et concis
- Exemples concrets
- Pas de jargon inutile

**Maintenance** :
- Mettre à jour la "Dernière mise à jour" en bas de chaque fichier
- Ajouter les changements significatifs dans CHANGELOG.md
- Vérifier les liens cassés

---

## Checklist qualité documentation

Pour chaque nouveau document ou mise à jour :

- [ ] Table des matières présente
- [ ] Exemples de code fonctionnels
- [ ] Commandes testées
- [ ] Chemins de fichiers absolus corrects
- [ ] Liens internes valides
- [ ] Orthographe et grammaire vérifiées
- [ ] Format Markdown respecté
- [ ] Date de mise à jour ajoutée
- [ ] CHANGELOG.md mis à jour si pertinent

---

## Support et questions

### Besoin d'aide ?

1. Chercher dans cette documentation
2. Vérifier [CONTRIBUTING.md](../CONTRIBUTING.md) FAQ
3. Consulter les issues GitHub existantes
4. Créer une nouvelle issue si nécessaire

### Rapporter un problème de documentation

**GitHub Issues** :
- Label : `documentation`
- Template : Décrire le problème, la section concernée, suggestion d'amélioration

---

## Statistiques de la documentation

| Métrique | Valeur |
|----------|--------|
| **Documents** | 11 fichiers |
| **Lignes totales** | ~4000 lignes |
| **Taille totale** | ~150 KB |
| **Dernière mise à jour** | 6 octobre 2025 |
| **Couverture** | Déploiement, Architecture, Database, SEO, Maintenance |

---

## Roadmap documentation

### À venir

- [ ] Guide de tests (unit, integration, e2e)
- [ ] Guide de debugging
- [ ] Guide de performance optimization avancée
- [ ] Guide d'accessibilité (a11y) détaillé
- [ ] Guide d'internationalisation (i18n) si multilingue
- [ ] Diagrammes architecture (Mermaid ou Draw.io)
- [ ] Vidéos tutoriels (déploiement, développement)

---

## Licence

Ce projet et sa documentation sont privés et propriétaires de **NovaHypnose**.

Tous droits réservés © 2025 NovaHypnose

---

**Maintenu par** : Équipe NovaHypnose
**Contact** : contact@novahypnose.fr
**Dernière mise à jour** : 6 octobre 2025
