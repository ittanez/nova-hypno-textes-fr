@echo off
REM Script de déploiement des Edge Functions Supabase
REM Usage: deploy-edge-functions.bat [function-name]
REM Si aucun nom n'est fourni, déploie les fonctions critiques

echo.
echo 🚀 Déploiement des Edge Functions Supabase...
echo.

REM Vérifier si l'utilisateur est connecté
npx supabase projects list >nul 2>&1
if errorlevel 1 (
    echo ❌ Vous n'êtes pas connecté à Supabase.
    echo 👉 Exécutez: npx supabase login
    exit /b 1
)

REM Si un nom de fonction est fourni, déployer seulement celle-ci
if not "%~1"=="" (
    echo 📦 Déploiement de la fonction: %~1
    npx supabase functions deploy %~1
    exit /b
)

REM Sinon, déployer les fonctions critiques
echo 📦 Déploiement des fonctions critiques...
echo.

REM Fonction sitemap (toujours à jour)
echo 1️⃣ Déploiement: generate-sitemap
npx supabase functions deploy generate-sitemap
echo.

REM Fonction de notification Google
echo 2️⃣ Déploiement: notify-google-sitemap
npx supabase functions deploy notify-google-sitemap
echo.

echo ✅ Déploiement terminé!
echo.
echo 📊 Pour vérifier les logs:
echo    npx supabase functions logs generate-sitemap
echo    npx supabase functions logs notify-google-sitemap
echo.
