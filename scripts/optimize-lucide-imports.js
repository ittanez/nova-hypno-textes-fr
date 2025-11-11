#!/usr/bin/env node

/**
 * Script pour optimiser les imports lucide-react
 * Transforme: import { Icon1, Icon2 } from 'lucide-react'
 * En: import Icon1 from 'lucide-react/dist/esm/icons/icon-1'
 *     import Icon2 from 'lucide-react/dist/esm/icons/icon-2'
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convertir PascalCase en kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])([a-z])/g, '$1-$2$3')
    .toLowerCase();
}

// Traiter un fichier
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Pattern pour détecter les imports lucide-react
  const lucideImportRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g;

  let modified = false;
  let newContent = content;

  // Trouver tous les imports lucide-react
  const matches = [...content.matchAll(lucideImportRegex)];

  for (const match of matches) {
    const fullImport = match[0];
    const iconsString = match[1];

    // Extraire les noms d'icônes (gérer les espaces et newlines)
    const icons = iconsString
      .split(',')
      .map(icon => icon.trim())
      .filter(icon => icon && !icon.startsWith('//'));

    // Créer les imports individuels
    const individualImports = icons
      .map(icon => {
        const kebabIcon = toKebabCase(icon);
        return `import ${icon} from 'lucide-react/dist/esm/icons/${kebabIcon}';`;
      })
      .join('\n');

    // Remplacer l'import groupé par les imports individuels
    newContent = newContent.replace(fullImport, individualImports);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Optimisé: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }

  return false;
}

// Parcourir récursivement les fichiers
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let filesProcessed = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Ignorer node_modules et dist
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        filesProcessed += processDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      // Traiter les fichiers .tsx, .ts, .jsx, .js
      if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        if (processFile(fullPath)) {
          filesProcessed++;
        }
      }
    }
  }

  return filesProcessed;
}

// Exécution principale
const srcDir = path.join(__dirname, '..', 'src');
console.log('🚀 Optimisation des imports lucide-react...\n');

const filesModified = processDirectory(srcDir);

console.log(`\n✨ Terminé ! ${filesModified} fichier(s) optimisé(s)`);

if (filesModified > 0) {
  console.log('\n💡 Gain attendu: ~50-100 KiB de bundle JS en moins');
  console.log('📊 Lancer "npm run build" pour mesurer l\'impact');
}
