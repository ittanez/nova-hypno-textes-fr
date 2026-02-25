#!/bin/bash

# Script de déploiement des Edge Functions Supabase
# Usage: ./deploy-edge-functions.sh [function-name]
# Si aucun nom n'est fourni, déploie toutes les fonctions

echo "🚀 Déploiement des Edge Functions Supabase..."

# Vérifier si l'utilisateur est connecté
if ! npx supabase projects list &> /dev/null; then
    echo "❌ Vous n'êtes pas connecté à Supabase."
    echo "👉 Exécutez: npx supabase login"
    exit 1
fi

# Si un nom de fonction est fourni, déployer seulement celle-ci
if [ ! -z "$1" ]; then
    echo "📦 Déploiement de la fonction: $1"
    npx supabase functions deploy $1
    exit $?
fi

# Sinon, déployer les fonctions importantes
echo "📦 Déploiement des fonctions critiques..."

# Fonction sitemap (toujours à jour)
echo ""
echo "1️⃣ Déploiement: generate-sitemap"
npx supabase functions deploy generate-sitemap

# Fonction de notification Google
echo ""
echo "2️⃣ Déploiement: notify-google-sitemap"
npx supabase functions deploy notify-google-sitemap

# Fonction d'envoi du guide autohypnose
echo ""
echo "3️⃣ Déploiement: send-guide-autohypnose"
npx supabase functions deploy send-guide-autohypnose

echo ""
echo "✅ Déploiement terminé!"
echo ""
echo "📊 Pour vérifier les logs:"
echo "   npx supabase functions logs generate-sitemap"
echo "   npx supabase functions logs notify-google-sitemap"
echo "   npx supabase functions logs send-guide-autohypnose"
