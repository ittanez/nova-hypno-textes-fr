import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
    },
  },
  {
    // Fonctions Edge Supabase (runtime Deno) : console.* est la façon normale
    // de logger côté serveur (visible dans les logs Supabase), pas un oubli
    // de debug destiné au navigateur. Le logger centralisé de src/lib ne
    // s'applique qu'au frontend.
    files: ["supabase/functions/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
  {
    // src/lib/logger.ts EST le wrapper console.* ; ses tests mockent/
    // restaurent console.* pour vérifier son comportement. Usage légitime.
    files: ["src/lib/logger.ts", "src/lib/__tests__/logger.test.ts"],
    rules: {
      "no-console": "off",
    },
  },
  {
    // Composants shadcn/ui : le pattern "composant + fonction variants
    // exportée" (ex. buttonVariants) est la convention de la librairie,
    // pas un export accidentel. Fast Refresh perd juste le hot-reload sur
    // ces fichiers en dev, aucun impact runtime/production.
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // Contexte + hook d'authentification volontairement co-localisés
    // (provider et hook partagent les mêmes types internes). Un split
    // toucherait 8+ points d'import de la brique auth pour un bénéfice
    // purement DX (Fast Refresh en dev), sans impact production.
    files: ["src/hooks/useAuth.tsx", "src/lib/contexts/AuthContext.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  }
);
