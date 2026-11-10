# Guides PDF NovaHypnose : sources modifiables

Ce dossier contient les **sources** des 7 guides gratuits (texte, mise en page, PDF). Les PDF publiés sur Supabase sont fabriqués ici.

## Où est le texte modifiable

| Guide | Texte source | Fichier Word (modifiable) | PDF généré |
|---|---|---|---|
| Sommeil | [document de travail Claude Docs](https://claude.ai/artifact/K6F2MwDJTm3a18c6wNQiMX) et `sommeil/guide-legacy.html` | non | `dist/sommeil.pdf` |
| Procrastination | `procrastination/guide.md` | `dist/procrastination.docx` | `dist/procrastination.pdf` |
| Arrêt du tabac | `tabac/guide.md` | `dist/tabac.docx` | `dist/tabac.pdf` |
| Colère | `colere/guide.md` | `dist/colere.docx` | `dist/colere.pdf` |
| Carrière | `carriere/guide.md` | `dist/carriere.docx` | `dist/carriere.pdf` |
| Émotions au travail | `emotions-travail/guide.md` | `dist/emotions-travail.docx` | `dist/emotions-travail.pdf` |
| Autohypnose | `autohypnose/guide.md` | `dist/autohypnose.docx` | `dist/autohypnose.pdf` |

- `guide.md` est du texte simple (Markdown) : c'est la **source de référence**. Le fichier Word contient le même texte, sans la mise en page ; il sert à relire ou corriger dans Word ou Google Docs, mais **les corrections doivent être reportées dans `guide.md`** (ou demandées à Claude) pour régénérer le PDF.
- Le guide Sommeil a été fait en premier, à la main : sa mise en page est dans `sommeil/guide-legacy.html`. À migrer vers le même système que les autres.

## Régénérer les PDF

Prérequis : `pandoc` installé, et le projet installé (`npm install`).

```bash
node guides-pdf/build.mjs                 # tous les guides
node guides-pdf/build.mjs colere tabac    # certains guides
```

Si Playwright ne trouve pas son navigateur : `CHROMIUM_PATH=/chemin/vers/chromium node guides-pdf/build.mjs`.

Sortie : `guides-pdf/dist/<guide>.pdf` et `.docx`. La mise en page est dans `charte.css` (couleurs et polices du site) et `template.html` (couverture).

## Version de relecture ou version finale

Chaque `guide.md` commence par un bloc `relecture: true` : la couverture affiche alors un bandeau et les repères `[à vérifier]` sont surlignés en jaune. Pour la version finale : passer `relecture: false` (ou supprimer la ligne) et traiter chaque repère `{.verif}` (confirmer avec une source, reformuler ou retirer).

## Syntaxe utile dans `guide.md`

- Chapitre : `::: {.chap}` puis `## Titre *mot en italique* {num="01"}` puis `:::` (ajouter `.cont` pour ne pas forcer un saut de page).
- Page libre (introduction, conclusion, sources) : `::: {.page kicker="Introduction"}` puis `## Titre` puis `:::`.
- Encadré : `::: {.card .retenir title="À retenir"}` (types : `.retenir`, `.attention`, `.medecin`, `.limite`).
- Citation : `::: quote` avec `[Alain Zenatti]{.by}` pour la signature.
- Chiffres clés : `::: stats` contenant des `::: {.stat v="31 %"}`.
- Appel à l'action : `::: cta` avec un lien `{.btn}` ; contact : `::: contact` avec des `::: {.box label="..."}`.
- Repère à vérifier : `[à vérifier]{.verif}`.

## Publier un guide

Remplacer le PDF dans le stockage Supabase (bucket indiqué), **sous le même nom**, pour conserver l'adresse utilisée par les emails et les pages :

| Guide | Fichier à remplacer |
|---|---|
| Émotions au travail | `images/guide-emotions-travail.pdf` |
| Autohypnose | `pdf/REPRENEZ_LA_MAIN_COMPLET.pdf` |
| Sommeil | `pdf/Ebook-Sommeil-et-Hypnose-Alain-Zenatti.pdf` |
| Procrastination | `pdf/ebook-procrastination.pdf` |
| Arrêt du tabac | `pdf/Ebook-Tabac-et-Hypnose-Alain-Zenatti.pdf` |
| Colère | `pdf/Ebook-Colere-et-Hypnose-Alain-Zenatti.pdf` |
| Carrière | `pdf/carriere.pdf` |

Après remplacement, vérifier le nombre de pages annoncé dans les emails Brevo et sur les landings.

## Suivi des clics sur le Décryptage

Chaque guide renvoie vers `/decryptage` avec `utm_source=guide&utm_medium=pdf&utm_content=<guide>`. La source est enregistrée dans la table `decryptage_responses` quand la personne laisse son email.
