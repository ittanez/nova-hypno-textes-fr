# Guide de configuration IndexNow pour Bing

## Qu'est-ce qu'IndexNow ?

IndexNow est un protocole simple qui permet de notifier instantanément les moteurs de recherche (Bing, Yandex, Seznam) lorsque vous publiez ou modifiez du contenu. Cela accélère considérablement l'indexation comparé à l'attente du crawl naturel.

**Avantages** :
- ⚡ Indexation en quelques minutes (vs plusieurs jours)
- 🌐 Notifie plusieurs moteurs en une requête
- 💰 Gratuit et sans limite stricte
- 🔧 Facile à intégrer

## Configuration

La clé IndexNow est déjà configurée et intégrée :

- **Clé** : `5968d7e532b5983b2fd3e35266137f4dea73cd37a3d99ef2a32b86ad1fe3e1f3`
- **Fichier de vérification** : `/public/5968d7e532b5983b2fd3e35266137f4dea73cd37a3d99ef2a32b86ad1fe3e1f3.txt`
- **Edge Function** : La clé est intégrée en dur (publique par design)

### Vérifier que tout fonctionne

```bash
# Vérifier que le fichier de clé est accessible
curl https://novahypnose.fr/5968d7e532b5983b2fd3e35266137f4dea73cd37a3d99ef2a32b86ad1fe3e1f3.txt
```

> **Note** : La clé IndexNow est publique par design (Bing doit pouvoir y accéder pour vérification). Pas besoin de la configurer comme secret Supabase.

## Utilisation

### Soumettre toutes les URLs du sitemap

```bash
# Appel direct à l'API IndexNow (recommandé, aucune dépendance)
node scripts/submit-all-urls-indexnow.js

# Ou via la edge function Supabase
node scripts/submit-all-urls-indexnow.js --via-supabase
```

Ce script va :
1. Récupérer le sitemap depuis `https://novahypnose.fr/sitemap.xml`
2. Extraire toutes les URLs
3. Les soumettre à IndexNow en un seul appel

### Soumettre des URLs spécifiques

```bash
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://novahypnose.fr/blog/nouvel-article",
      "https://novahypnose.fr/autohypnose"
    ]
  }'
```

### Soumettre les URLs principales

```bash
# Sans paramètres, soumet automatiquement les pages principales
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow
```

## Intégration dans le workflow

### Lors de la publication d'un nouvel article

```javascript
// Dans votre code de publication
await fetch('https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    urls: [`https://novahypnose.fr/blog/article/${slug}`]
  })
});
```

### Après une mise à jour du sitemap

```bash
# Notifier Google
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-google-sitemap

# Notifier Bing via IndexNow
node scripts/submit-all-urls-indexnow.js
```

## Vérification dans Bing Webmaster Tools

1. Aller sur [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sélectionner votre site
3. Aller dans **Outils > URL Submission**
4. Voir l'historique des soumissions IndexNow

## Maintenance

### Mensuelle

- [ ] Vérifier les statistiques d'indexation dans Bing Webmaster Tools
- [ ] Soumettre les nouvelles URLs depuis le dernier check
- [ ] Vérifier que la clé est toujours accessible

### Lors de changements importants

Si vous changez de domaine ou restructurez le site :

1. Générer une nouvelle clé : `./scripts/setup-indexnow.sh`
2. Mettre à jour la clé dans `supabase/functions/notify-bing-indexnow/index.ts`
3. Mettre à jour la clé dans `scripts/submit-all-urls-indexnow.js`
4. Redéployer
5. Soumettre toutes les URLs : `node scripts/submit-all-urls-indexnow.js`

## Troubleshooting

### La fonction retourne une erreur 403

**Cause** : La clé n'est pas valide ou non accessible

**Solution** :
```bash
# Vérifier que le fichier de clé est accessible
curl https://novahypnose.fr/5968d7e532b5983b2fd3e35266137f4dea73cd37a3d99ef2a32b86ad1fe3e1f3.txt
```

### Les URLs ne sont pas indexées

**Causes possibles** :
1. Attendre quelques heures (indexation pas instantanée)
2. Vérifier que les URLs sont accessibles (pas de 404)
3. Vérifier robots.txt n'interdit pas l'indexation

**Solution** :
```bash
# Vérifier une URL spécifique
curl -I https://novahypnose.fr/blog/article
# Devrait retourner 200 OK

# Vérifier robots.txt
curl https://novahypnose.fr/robots.txt
```

### Rate limiting (429 Too Many Requests)

**Cause** : Trop de requêtes trop rapidement

**Solution** : Attendre quelques minutes avant de réessayer

## Ressources

- [Documentation officielle IndexNow](https://www.indexnow.org/)
- [Guide Bing Webmaster](https://www.bing.com/indexnow)
- [Documentation Edge Function](/supabase/functions/notify-bing-indexnow/README.md)
- [Documentation SEO complète](/docs/SEO.md)

## Support

Pour toute question ou problème :
1. Vérifier la [documentation SEO](/docs/SEO.md)
2. Consulter les logs Supabase
3. Vérifier Bing Webmaster Tools

---

**Dernière mise à jour** : Février 2026
