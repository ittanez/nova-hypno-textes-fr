/**
 * Sécurise le JSON-LD pour éviter les injections XSS et erreurs de syntaxe JavaScript.
 * À utiliser pour toutes les balises <script type="application/ld+json">.
 */
export const safeJSONStringify = (data: unknown): string => {
  try {
    return JSON.stringify(data)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001f\u007f-\u009f]/g, '');
  } catch {
    return '{}';
  }
};
