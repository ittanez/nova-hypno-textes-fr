import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { logger } from '@/lib/logger';

/**
 * Parse le contenu pour corriger les problèmes de formatage
 * - Supporte HTML déjà formaté
 * - Convertit Markdown complet en HTML avec la librairie 'marked'
 * - Sécurise le HTML avec DOMPurify
 * - Corrige les apostrophes doublées
 */
export const parseMarkdownToHtml = (content: string): string => {
  if (!content) return '';

  let processed = content;

  // 1. Corriger les problèmes d'encodage et apostrophes
  processed = processed
    // Apostrophes doublées '' → '
    .replace(/''/g, "'")
    // Apostrophes typographiques → apostrophe simple
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    // Guillemets problématiques
    .replace(/"/g, '"')
    .replace(/"/g, '"');

  // 2. Si le contenu contient déjà beaucoup de balises HTML, le retourner tel quel (après nettoyage)
  const htmlTagCount = (processed.match(/<[^>]+>/g) || []).length;
  const hasStructuredHtml = processed.includes('<p>') && processed.includes('</p>');

  if (hasStructuredHtml && htmlTagCount > 5) {
    // Extraire et supprimer les balises <style> du contenu
    const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
    processed = processed.replace(styleRegex, '');

    // Nettoyer le HTML pour la sécurité
    return DOMPurify.sanitize(processed, {
      ALLOWED_TAGS: ['article', 'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr', 'div', 'span'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel']
    });
  }

  // 3. Sinon, traiter comme du Markdown
  try {
    // Configurer marked pour un meilleur rendu
    marked.setOptions({
      breaks: true, // Convertir les sauts de ligne simples en <br>
      gfm: true, // GitHub Flavored Markdown
    });

    // Convertir Markdown en HTML
    const html = marked.parse(processed) as string;

    // Nettoyer le HTML pour la sécurité
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['article', 'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr', 'div', 'span'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel']
    });
  } catch (error) {
    logger.error('Erreur lors du parsing Markdown:', error);
    // En cas d'erreur, retourner le contenu tel quel avec les paragraphes
    return `<p>${processed.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
  }
};

/**
 * Parser léger pour convertir seulement la syntaxe de gras **texte** → <strong>texte</strong>
 * et corriger les apostrophes
 */
export const parseBasicMarkdown = (content: string): string => {
  if (!content) return '';
  
  return content
    // Corriger apostrophes doublées
    .replace(/''/g, "'")
    // Gras: **texte** → <strong>texte</strong>
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italique: *texte* → <em>texte</em>
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
};