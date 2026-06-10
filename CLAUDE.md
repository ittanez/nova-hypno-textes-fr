# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**NovaHypnose.fr** — official website of a hypnotherapy practice in Paris. React 18 SPA built with Vite, deployed primarily to Netlify. The site is bilingual in purpose (French content, English code), privately owned.

## Commands

```bash
npm run dev              # Dev server at http://localhost:8080
npm run build            # Production build (runs generate-sitemap as prebuild)
npm run lint             # ESLint
npm run test             # Vitest (watch mode)
npm run test:run         # Vitest (single pass)
npm run test:coverage    # Vitest with coverage
npm run test:e2e         # Playwright e2e (requires dev server on :8080)
npx tsc --noEmit         # TypeScript type-check without building
```

Run a single unit test file:
```bash
npm run test -- src/lib/__tests__/logger.test.ts
```

Pre-commit verification:
```bash
npm run lint && npm run test:run && npm run build
```

## Architecture

### Stack

React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui. Backend is **Supabase** (PostgreSQL + Auth + Storage + Edge Functions). Hosting is **Netlify** with edge functions. State management uses **TanStack Query v5** for server state and React Context for auth.

### Three Supabase clients

There are three separate Supabase client instances — use the right one:

- `@/integrations/supabase/client` → `supabase` — main client with full auth (PKCE flow, `localStorage` session persistence). Use for admin operations and authenticated calls.
- `@/integrations/supabase/main-client` → `supabaseMain` — equivalent alias for the main authenticated client.
- `@/integrations/supabase/public-client` → `publicSupabase` — lightweight client with auth disabled (`persistSession: false`). Use for public read-only queries on public-facing pages to avoid unnecessary auth overhead.

### Routing and page types

`App.tsx` defines all routes. Only `Index` (homepage), `ContentLayout`, and `PrivateRoute` are eagerly loaded; everything else uses `React.lazy()`.

There are two visual page types:
1. **Standard pages** — wrapped by `ContentLayout` (header + footer), used for main site sections.
2. **Standalone landing pages** — no header/footer (guide downloads, thank-you pages, `/autohypnose-gratitude`, etc.).

Admin routes under `/admin-blog/*` are protected by `<PrivateRoute>`, which uses `useAuth()` to check both authentication and admin status via `checkIsAdmin()` in `src/lib/services/authService.ts`.

### SEO architecture (two-tier)

The site is a client-rendered SPA that needs SEO for crawlers that don't execute JS:

1. **`netlify/edge-functions/seo-prerender.ts`** — intercepts requests to blog routes (`/blog`, `/blog/article/*`, etc.) from known bot user-agents and returns fully server-rendered HTML fetched from Supabase.
2. **`netlify/edge-functions/seo-prerender-static.ts`** — same pattern for static routes (`/`, specialty pages `/hypnose-*`, etc.).
3. Regular users always receive the SPA (`/index.html`).

The bot detection list and which paths use which edge function are both configured in `netlify.toml`.

`sitemap.xml` is a 200-redirect to a **Supabase Edge Function** (`supabase/functions/generate-sitemap`) so it always includes the latest blog articles.

### Supabase Edge Functions

Located in `supabase/functions/`. These are Deno-based functions deployed to Supabase. They handle:
- Transactional emails via **Brevo** (lead magnets, quiz results, guide downloads, confirmations)
- Sitemap generation
- IndexNow ping to Bing after publish
- Promo code assignment

Deploy scripts: `deploy-edge-functions.sh` (Linux) / `deploy-edge-functions.bat` (Windows).

### JSON-LD / structured data

**Always** use `safeJSONStringify()` from `@/lib/seo-utils` when injecting JSON-LD into `<script>` tags. It escapes `<`, `>`, `&`, and Unicode line separators to prevent XSS. Never use plain `JSON.stringify()` for this purpose.

Centralized schema definitions (LocalBusiness, FAQ, etc.) live in `src/data/schemaOrg.ts`. The `<SEOHead>` component (`src/components/blog/SEOHead.tsx`) accepts a `structuredData` prop and handles full Open Graph, Twitter Cards, canonical URLs, and JSON-LD injection.

### Build and deployment

- **Netlify** (primary): triggered on push to `main`. `netlify.toml` sets `VITE_BASE_PATH=/` for the base URL, configures security headers, cache headers, 301 redirects from old WordPress URLs, and wires up edge functions.
- **GitHub Pages** (secondary): `.github/workflows/deploy.yml` builds with `VITE_BASE_PATH=/nova-hypno-textes-fr/` and deploys `dist/`. After deploy, it runs `scripts/indexnow.js` to notify Bing.

The `base` in `vite.config.ts` reads `process.env.VITE_BASE_PATH` (defaults to `/nova-hypno-textes-fr/` when not set, which is wrong for local dev on Netlify; Netlify CI sets it to `/`).

### Bundle splitting

`vite.config.ts` defines `manualChunks`: `vendor-react`, `vendor-ui` (Radix), `vendor-router`, `vendor-supabase`, `vendor-icons` (lucide-react), `vendor-utils`. TinyMCE assets are copied to `dist/` via `vite-plugin-static-copy` for the admin article editor.

### Logging

Use `logger` from `@/lib/logger.ts` instead of `console.*`. `logger.debug()` and `logger.info()` are suppressed in production; `logger.warn()` and `logger.error()` remain visible.

## Key conventions

### Commit format
```
type(scope): description
# feat | fix | refactor | docs | test | style | perf | chore
```

### Environment variables

Required in `.env`:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_GOOGLE_MAPS_API_KEY=...   # optional, for CommuteMap
```

### Path alias

`@` maps to `src/`. Use it for all imports from within `src/`.

### Tests

- Unit tests: Vitest + Testing Library, co-located in `__tests__/` subdirectories, environment is `jsdom`.
- E2E tests: Playwright in `e2e/`, expects dev server at `http://localhost:8080`.
- E2E tests are excluded from the Vitest run (`**/e2e/**`).

### React Query config

Default: `staleTime: 5min`, `gcTime: 10min`. Always call `queryClient.invalidateQueries()` in mutation `onSuccess` callbacks to keep UI in sync.

### Data files

Static content (FAQs, testimonials, carousel slides, application descriptions) lives in `src/data/` as typed TypeScript modules. Keep content changes there rather than inline in components.

## Claude Code orchestration (agentic workflows)

### Command-Agent-Skill pattern

Structure agentic work in three layers:
- **Commands** — entry points; orchestrate agents and invoke skills; handle user interaction.
- **Agents** — fetch data and perform domain-specific reasoning; use preloaded skills as reference material injected at startup.
- **Skills** — handle output generation; invoked directly from commands via the Skill tool, receiving data already assembled by agents.

This creates a clean separation: agents gather, skills output, commands coordinate.

### Two skill types

1. **Agent skills (preloaded)** — full skill content is injected into the agent's context at startup and used as reference, not dynamically called.
2. **Direct invocation skills** — called via the Skill tool from a command; execute independently in the caller's context.

### Information flow

Data flows **agents → commands → skills**. Avoid circular or back-channel dependencies between these layers.

### Single responsibility

Each component has one job: agents for data retrieval, skills for output creation, commands for orchestration. Do not blur these roles.

### Model selection

- Commands: lightweight model (haiku) — orchestration logic only.
- Agents: capable model (sonnet) — domain reasoning and data gathering.
- Skills: capable model (sonnet) — high-quality content and output generation.
