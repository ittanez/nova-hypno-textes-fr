# Notification Bing via IndexNow API

## Description

Cette Edge Function permet de notifier Bing et autres moteurs de recherche (via IndexNow) des nouvelles URLs ou mises à jour de contenu sur le site NovaHypnose.fr.

## Configuration

### 1. Générer une clé IndexNow

```bash
# Générer une clé aléatoire de 64 caractères hexadécimaux
openssl rand -hex 32
# Exemple de résultat: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

### 2. Créer le fichier de clé

Créer le fichier `/public/{votre-clé}.txt` contenant uniquement la clé :

```bash
# Exemple: /public/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2.txt
echo "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2" > public/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2.txt
```

### 3. Configurer la variable d'environnement

Dans Supabase Dashboard > Edge Functions > Secrets :

```
INDEXNOW_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

Ou localement dans `.env` :

```bash
INDEXNOW_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

## Utilisation

### Notifier des URLs spécifiques

```bash
# Via curl
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://novahypnose.fr/blog/nouvel-article",
      "https://novahypnose.fr/autohypnose"
    ]
  }'
```

### Notifier les URLs principales

```bash
# Sans body, soumet automatiquement les pages principales
curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow
```

### Intégration dans le workflow

Appeler cette fonction :
- Après la publication d'un nouvel article de blog
- Après la mise à jour du sitemap
- Après des modifications importantes de contenu

## Moteurs de recherche supportés

IndexNow notifie automatiquement :
- **Bing** (Microsoft)
- **Yandex**
- **Seznam.cz**

Et potentiellement d'autres moteurs qui adoptent le protocole IndexNow.

## Réponses API

- **200 OK** : URLs soumises avec succès
- **202 Accepted** : URLs acceptées pour traitement
- **400 Bad Request** : Format de requête invalide
- **403 Forbidden** : Clé invalide ou non vérifiée
- **422 Unprocessable Entity** : URLs invalides
- **429 Too Many Requests** : Limite de taux dépassée

## Limites

- Maximum **10 000 URLs** par requête
- Pas de limite de taux stricte, mais recommandé de ne pas abuser
- La clé doit être accessible publiquement à `https://novahypnose.fr/{key}.txt`

## Ressources

- [Documentation IndexNow](https://www.indexnow.org/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Guide d'implémentation](https://www.bing.com/indexnow)

## Vérification

Vérifier que Bing a bien reçu la notification dans Bing Webmaster Tools :
1. Aller sur https://www.bing.com/webmasters
2. Sélectionner votre site
3. Aller dans **Outils > URL Submission**
4. Voir l'historique des soumissions IndexNow
