#!/bin/bash

# Script pour configurer IndexNow pour Bing
# Ce script génère une clé aléatoire et crée le fichier de vérification

echo "🔧 Configuration IndexNow pour Bing"
echo "===================================="
echo ""

# Vérifier si openssl est disponible
if ! command -v openssl &> /dev/null; then
    echo "❌ Erreur: openssl n'est pas installé"
    echo "   Sur Ubuntu/Debian: sudo apt-get install openssl"
    echo "   Sur macOS: openssl est préinstallé"
    exit 1
fi

# Générer une clé aléatoire de 64 caractères hexadécimaux
echo "📝 Génération d'une clé IndexNow unique..."
INDEXNOW_KEY=$(openssl rand -hex 32)

echo "✅ Clé générée: $INDEXNOW_KEY"
echo ""

# Créer le fichier de clé dans /public/
KEY_FILE="public/${INDEXNOW_KEY}.txt"
echo "$INDEXNOW_KEY" > "$KEY_FILE"

echo "✅ Fichier de clé créé: $KEY_FILE"
echo ""

# Afficher les instructions
echo "📋 Étapes suivantes:"
echo ""
echo "1. Ajouter la variable d'environnement dans Supabase:"
echo "   - Aller sur: https://supabase.com/dashboard/project/_/settings/functions"
echo "   - Créer un nouveau secret:"
echo "     Nom: INDEXNOW_KEY"
echo "     Valeur: $INDEXNOW_KEY"
echo ""
echo "2. Déployer le site avec le fichier de clé:"
echo "   npm run build"
echo "   git add public/${INDEXNOW_KEY}.txt"
echo "   git commit -m 'Add IndexNow key file'"
echo "   git push"
echo ""
echo "3. Vérifier que la clé est accessible:"
echo "   https://novahypnose.fr/${INDEXNOW_KEY}.txt"
echo ""
echo "4. Tester la fonction IndexNow:"
echo "   curl -X POST https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow"
echo ""
echo "5. Vérifier dans Bing Webmaster Tools:"
echo "   https://www.bing.com/webmasters > Outils > URL Submission"
echo ""
echo "✅ Configuration terminée!"
