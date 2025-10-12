# 🚀 Configuration Notification Google Search Console

Ce guide vous explique comment déployer le système de notification automatique Google Search Console.

## ✅ Ce qui a été fait

### 1. Corrections appliquées

- ✅ **Cache React Query synchronisé** : Les pages blog et catégories affichent maintenant les mêmes données
- ✅ **URLs catégories corrigées** : `/blog/category/` → `/blog/categorie/`
- ✅ **Sitemap dynamique** : Se met à jour automatiquement sans rebuild

### 2. Nouvelle fonctionnalité : Notification Google

Quand vous publiez un article, le système **notifie automatiquement Google** pour une indexation plus rapide.

**Fichiers créés** :
- `supabase/functions/notify-google-sitemap/index.ts` : Edge Function de notification
- `src/lib/services/blog/articleService.ts` : Intégration dans le workflow de publication
- `deploy-edge-functions.bat` : Script de déploiement Windows
- `docs/SITEMAP_GOOGLE_NOTIFICATION.md` : Documentation complète

## 🎯 Déploiement en 3 étapes

### Étape 1 : Se connecter à Supabase

```bash
npx supabase login
```

Une fenêtre de navigateur s'ouvrira pour vous authentifier.

### Étape 2 : Déployer les Edge Functions

```bash
# Option facile : Script automatique
deploy-edge-functions.bat

# OU manuellement
npx supabase functions deploy generate-sitemap
npx supabase functions deploy notify-google-sitemap
```

### Étape 3 : Vérifier le déploiement

```bash
# Tester le sitemap
curl https://novahypnose.fr/sitemap.xml

# Tester la notification Google
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-google-sitemap ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcmx5em1mc3p1bWlid2dvY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NjUyNDcsImV4cCI6MjA1ODM0MTI0N30.UDVk1wzm36OJGK0usCHEtvmkC2QxABvG9KQ8p2lKz30" ^
  -H "Content-Type: application/json"
```

Vous devriez recevoir :
```json
{
  "success": true,
  "message": "Google Search Console notifié",
  "sitemapUrl": "https://novahypnose.fr/sitemap.xml"
}
```

## 🎉 C'est tout !

À partir de maintenant :

1. **Vous publiez un article** via votre interface admin
2. **Le sitemap se met à jour automatiquement** (pas de rebuild)
3. **Google est notifié automatiquement**
4. **Google indexe votre article plus rapidement** (quelques heures au lieu de plusieurs jours)

## 📊 Comment vérifier que ça fonctionne

### Dans la console du navigateur

Lors de la publication, vous verrez :
```
🔔 Notification Google Search Console...
✅ Google Search Console notifié avec succès
```

### Dans Google Search Console

1. Allez sur https://search.google.com/search-console
2. Sélectionnez votre propriété (novahypnose.fr)
3. **Sitemaps** → Vérifiez la date de dernière lecture

## 🐛 En cas de problème

Consultez la documentation complète : `docs/SITEMAP_GOOGLE_NOTIFICATION.md`

Ou contactez-moi pour assistance !

## 📚 Ressources

- [Documentation complète](docs/SITEMAP_GOOGLE_NOTIFICATION.md)
- [Google Search Console](https://search.google.com/search-console)
- [Supabase Dashboard](https://supabase.com/dashboard/project/akrlyzmfszumibwgocae)
