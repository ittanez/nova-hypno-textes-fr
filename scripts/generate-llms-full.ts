// Génère public/llms-full.txt : le résumé de public/llms.txt suivi du texte
// complet des pages statiques, tel qu'il est servi aux robots par l'edge
// function seo-prerender-static. Lancé par `prebuild` (via vite-node) pour
// rester synchronisé avec le contenu prérendu.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PAGES } from "../netlify/edge-functions/seo-prerender-static.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const SITE_URL = "https://novahypnose.fr";

// Pages d'archive : servies aux robots mais sans intérêt pour un assistant IA
const EXCLUDED = new Set(["/test-receptivite-archive"]);

const ENTITIES: Record<string, string> = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#039;": "'", "&#39;": "'", "&nbsp;": " ", "&rsquo;": "'",
};

function decode(text: string): string {
  return text.replace(/&[a-z0-9#]+;/gi, (e) => ENTITIES[e] ?? e);
}

function htmlToMarkdown(html: string): string {
  return decode(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
      .replace(/<a[^>]*class="cta"[^>]*>[\s\S]*?<\/a>/gi, "")
      .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, text) => {
        const url = href.startsWith("/") ? SITE_URL + href : href;
        return `[${text.trim()}](${url})`;
      })
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n### $1\n\n")
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n#### $1\n\n")
      .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
      .replace(/<(em|i|cite)>([\s\S]*?)<\/\1>/gi, "*$2*")
      .replace(/<li[^>]*>/gi, "\n- ")
      .replace(/<blockquote[^>]*>/gi, "\n\n> ")
      .replace(/<\/(p|ul|ol|blockquote)>/gi, "\n\n")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n+- /g, "\n- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const summary = fs.readFileSync(path.join(PUBLIC_DIR, "llms.txt"), "utf8").trim();

const sections = Object.entries(PAGES)
  .filter(([route]) => !EXCLUDED.has(route))
  .map(([route, page]) => {
    const url = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    return `## ${decode(page.h1)}\n\nURL : ${url}\n\n${decode(page.description)}\n\n${htmlToMarkdown(page.content)}`;
  });

const output = `${summary}\n\n---\n\n# Contenu complet des pages\n\n${sections.join("\n\n---\n\n")}\n`;

fs.writeFileSync(path.join(PUBLIC_DIR, "llms-full.txt"), output, "utf8");
console.log(`llms-full.txt : ${sections.length} pages, ${Math.round(output.length / 1024)} Ko`);
