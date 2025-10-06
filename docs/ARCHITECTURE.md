# Documentation Architecture - NovaHypnose.fr

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture globale](#architecture-globale)
3. [Structure des dossiers](#structure-des-dossiers)
4. [Composants principaux](#composants-principaux)
5. [Services et hooks](#services-et-hooks)
6. [Routing](#routing)
7. [State management](#state-management)
8. [Patterns et conventions](#patterns-et-conventions)
9. [Performance et optimisations](#performance-et-optimisations)

---

## Vue d'ensemble

### Stack technique complète

| Catégorie | Technologie | Version |
|-----------|-------------|---------|
| **Frontend Framework** | React | 18.3.1 |
| **Build Tool** | Vite | 5.4.1 |
| **Language** | TypeScript | 5.5.3 |
| **Styling** | Tailwind CSS | 3.4.11 |
| **UI Components** | shadcn/ui | - |
| **Routing** | React Router | 6.26.2 |
| **Forms** | React Hook Form | 7.63.0 |
| **Validation** | Zod | 4.1.11 |
| **Backend (BaaS)** | Supabase | 2.58.0 |
| **State Management** | React Query | 5.90.2 |
| **Testing** | Vitest | 3.2.4 |
| **Linting** | ESLint | 9.9.0 |
| **Deployment** | Netlify | - |

### Philosophie architecturale

**Principes directeurs** :

1. **Component-driven** : Architecture basée sur des composants réutilisables
2. **Type-safe** : TypeScript strict pour éviter les erreurs runtime
3. **Performance-first** : Lazy loading, code splitting, optimisations
4. **SEO-optimized** : SSR-friendly meta tags, structured data
5. **Accessible** : ARIA labels, keyboard navigation
6. **Maintainable** : Code propre, documenté, testé

---

## Architecture globale

### Diagramme de l'architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         UTILISATEUR                             │
│                    (Browser / Mobile)                           │
└───────────────────────────┬────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌────────────────────────────────────────────────────────────────┐
│                      NETLIFY CDN/EDGE                           │
│  - SSL/TLS Termination                                          │
│  - Static Files (HTML, CSS, JS)                                 │
│  - Redirections (netlify.toml)                                  │
│  - Headers (Security, Cache)                                    │
└───────────────────────────┬────────────────────────────────────┘
                            │
                            │
                            ▼
┌────────────────────────────────────────────────────────────────┐
│                     REACT APPLICATION                           │
│                   (Single Page App - SPA)                       │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    PRESENTATION LAYER                     │ │
│  │  • Pages (Index, Blog, Admin, etc.)                      │ │
│  │  • Components (Hero, FAQ, Pricing, etc.)                 │ │
│  │  • Layouts (ContentLayout, AdminLayout)                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                     BUSINESS LAYER                        │ │
│  │  • Hooks (useAuth, useCarousel, useSeoMetadata)          │ │
│  │  • Services (API calls, data fetching)                   │ │
│  │  • State Management (React Query, Context)               │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                      DATA LAYER                           │ │
│  │  • Supabase Client (main, public)                        │ │
│  │  • Types (TypeScript interfaces)                         │ │
│  │  • Utils (helpers, formatting)                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└───────────────────────────┬────────────────────────────────────┘
                            │
                            │ API Calls (REST/GraphQL)
                            ▼
┌────────────────────────────────────────────────────────────────┐
│                       SUPABASE (BaaS)                           │
├────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ PostgreSQL  │  │    Auth     │  │   Storage   │           │
│  │  Database   │  │    (JWT)    │  │  (Images)   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                             │
│  │    Edge     │  │  Realtime   │                             │
│  │  Functions  │  │  (WebSocket)│                             │
│  └─────────────┘  └─────────────┘                             │
└────────────────────────────────────────────────────────────────┘
```

### Flux de données

```
User Action (Click, Form Submit)
        ↓
React Component (Button, Form)
        ↓
Event Handler (onClick, onSubmit)
        ↓
Custom Hook (useAuth, useArticles)
        ↓
React Query (useMutation, useQuery)
        ↓
Supabase Client (from, insert, update, delete)
        ↓
Supabase Backend (PostgreSQL + RLS)
        ↓
Response (Data or Error)
        ↓
React Query Cache Update
        ↓
Component Re-render
        ↓
UI Update
```

---

## Structure des dossiers

### Arborescence complète

```
nova-hypno-textes-fr/
├── .github/                    # GitHub Actions, workflows
├── docs/                       # Documentation (ce dossier)
│   ├── DEPLOYMENT.md
│   ├── SEO.md
│   ├── DATABASE.md
│   ├── ARCHITECTURE.md
│   └── MAINTENANCE.md
├── public/                     # Assets statiques
│   ├── _redirects             # Netlify redirects
│   ├── CNAME                  # Custom domain
│   ├── robots.txt
│   ├── favicon.ico
│   ├── cabinet.webp
│   ├── zenatti.webp
│   └── lovable-uploads/       # Images uploadées
├── scripts/                    # Scripts utilitaires
│   ├── generate-sitemap.js
│   └── generate-static-seo.cjs
├── src/
│   ├── components/            # Composants React
│   │   ├── admin/            # Composants admin dashboard
│   │   │   └── AdminLayout.tsx
│   │   ├── auth/             # Authentification
│   │   │   ├── AuthForm.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── blog/             # Blog components
│   │   │   ├── SEOHead.tsx
│   │   │   └── admin/
│   │   ├── common/           # Composants réutilisables
│   │   │   ├── MobileCarousel.tsx
│   │   │   └── README.md
│   │   ├── layout/           # Layouts
│   │   │   └── ContentLayout.tsx
│   │   ├── testimonials/
│   │   │   └── TestimonialControls.tsx
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ... (40+ composants)
│   │   ├── __tests__/        # Tests unitaires
│   │   │   ├── Hero.test.tsx
│   │   │   └── Faq.test.tsx
│   │   ├── ApplicationsGrid.tsx
│   │   ├── Hero.tsx
│   │   ├── Faq.tsx
│   │   ├── Pricing.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ... (20+ composants)
│   ├── data/                  # Données statiques
│   │   ├── testimonials.ts
│   │   ├── carouselData.ts
│   │   └── README.md
│   ├── hooks/                 # Custom hooks
│   │   ├── __tests__/
│   │   │   └── useAuth.test.tsx
│   │   ├── useAuth.tsx
│   │   ├── useCarousel.tsx
│   │   ├── useSeoMetadata.tsx
│   │   ├── useScrollAnimation.tsx
│   │   ├── useArticleEditor.tsx
│   │   ├── useAdminArticles.tsx
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── README.md
│   ├── integrations/          # Intégrations externes
│   │   ├── routes/
│   │   │   └── AdminRoutes.tsx
│   │   └── supabase/
│   │       ├── types.ts       # Types auto-générés
│   │       ├── client.ts
│   │       ├── main-client.ts
│   │       └── public-client.ts
│   ├── lib/                   # Utilitaires
│   │   └── utils.ts
│   ├── pages/                 # Pages de l'application
│   │   ├── admin/
│   │   │   ├── blog/
│   │   │   │   ├── AdminArticles.tsx
│   │   │   │   ├── AdminArticleEditor.tsx
│   │   │   │   └── AdminLogin.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   └── ... (8 pages admin)
│   │   ├── autohypnose/
│   │   │   ├── Index.tsx
│   │   │   └── Quiz.tsx
│   │   ├── blog/
│   │   │   ├── BlogIndex.tsx
│   │   │   ├── ArticlePage.tsx
│   │   │   ├── CategoryPage.tsx
│   │   │   └── CategoriesPage.tsx
│   │   ├── Index.tsx          # Page d'accueil
│   │   ├── MentionsLegales.tsx
│   │   ├── Custom404.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── App.css
├── .env.example               # Variables d'environnement
├── .gitignore
├── CHANGELOG.md               # Historique des versions
├── CONTRIBUTING.md            # Guide de contribution
├── README.md                  # Documentation principale
├── eslint.config.js
├── netlify.toml               # Configuration Netlify
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts             # Configuration Vite
└── vitest.config.ts           # Configuration tests
```

### Organisation par fonctionnalité

```
src/
├── components/
│   ├── [feature]/            # Grouper par fonctionnalité
│   │   ├── Component.tsx
│   │   ├── Component.test.tsx
│   │   └── Component.module.css (si nécessaire)
│   └── ui/                   # Composants UI génériques
```

**Exemple** :

```
src/components/blog/
├── BlogCard.tsx              # Carte article
├── BlogList.tsx              # Liste d'articles
├── SEOHead.tsx               # Meta tags SEO
└── admin/
    ├── ArticleEditor.tsx     # Éditeur
    └── ArticleSEOSection.tsx # Section SEO
```

---

## Composants principaux

### Pages

#### Index.tsx (Page d'accueil)

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\pages\Index.tsx`

**Responsabilités** :
- Point d'entrée principal du site
- Affiche Hero, À propos, Applications, Témoignages, FAQ, Tarifs
- SEO optimisé pour "hypnothérapeute Paris"

**Structure** :

```tsx
const Index = () => {
  return (
    <>
      <SEOHead title="..." description="..." />
      <Hero />
      <AboutSection />
      <ApplicationsGrid />
      <Testimonials />
      <Pricing />
      <Faq />
      <ContactSection />
    </>
  );
};
```

#### BlogIndex.tsx

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\pages\blog\BlogIndex.tsx`

**Responsabilités** :
- Liste des articles de blog
- Filtrage par catégorie
- Pagination
- Articles en vedette

**Hooks utilisés** :
- `useQuery` (React Query) pour fetch articles
- `useSeoMetadata` pour meta tags dynamiques

#### ArticlePage.tsx

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\pages\blog\ArticlePage.tsx`

**Responsabilités** :
- Affichage d'un article complet
- SEO (title, description, schema.org)
- Breadcrumbs
- Articles similaires

**Routing** :

```tsx
<Route path="/blog/article/:slug" element={<ArticlePage />} />
```

#### Admin Pages

**Fichiers** :
- `AdminDashboard.tsx` : Vue d'ensemble admin
- `AdminArticles.tsx` : Gestion des articles
- `AdminArticleEditor.tsx` : Éditeur WYSIWYG
- `AdminLogin.tsx` : Authentification admin

**Protection** :

```tsx
<Route
  path="/admin-blog/articles"
  element={
    <PrivateRoute>
      <AdminArticles />
    </PrivateRoute>
  }
/>
```

### Composants UI

#### Hero

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\Hero.tsx`

**Caractéristiques** :
- Section hero responsive
- CTA vers contact
- Image optimisée (WebP)
- Animation scroll

#### ApplicationsGrid

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\ApplicationsGrid.tsx`

**Caractéristiques** :
- Grille d'applications de l'hypnose
- Carrousel mobile (via `useCarousel`)
- Cards avec icônes Lucide

#### Faq

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\Faq.tsx`

**Caractéristiques** :
- Accordion (shadcn/ui)
- Schema.org FAQPage (SEO)
- Questions/réponses dynamiques

**Schema JSON-LD** :

```tsx
<FAQSchema faqs={faqData} />
```

#### Pricing

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\Pricing.tsx`

**Caractéristiques** :
- Cartes tarifaires
- Badge "RECOMMANDÉ"
- CTA vers contact/Stripe

### Composants réutilisables

#### MobileCarousel

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\common\MobileCarousel.tsx`

**Props** :

```typescript
interface MobileCarouselProps {
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToSlide: (index: number) => void;
  children: React.ReactNode;
}
```

**Usage** :

```tsx
const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(items.length);

<MobileCarousel
  currentIndex={currentIndex}
  totalItems={items.length}
  onNext={goToNext}
  onPrevious={goToPrevious}
  onGoToSlide={goToSlide}
>
  {items.map((item, index) => (
    <div key={index} className={currentIndex === index ? 'block' : 'hidden'}>
      {item.content}
    </div>
  ))}
</MobileCarousel>
```

#### SEOHead

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\components\blog\SEOHead.tsx`

**Props** :

```typescript
interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  robots?: string;
  structuredData?: SchemaMarkup | SchemaMarkup[];
}
```

**Génère** :
- Meta tags (title, description, keywords)
- Open Graph (Facebook)
- Twitter Cards
- Canonical URL
- JSON-LD structured data

---

## Services et hooks

### Custom Hooks

#### useAuth

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\hooks\useAuth.tsx`

**Responsabilités** :
- Gestion de l'authentification Supabase
- State global de l'utilisateur
- Login, logout, signup
- Vérification admin

**API** :

```typescript
const { user, session, isAdmin, login, logout, signup } = useAuth();
```

**Provider** :

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

#### useCarousel

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\hooks\useCarousel.tsx`

**Responsabilités** :
- Logique de navigation carrousel
- Index actuel, next, previous, goToSlide

**API** :

```typescript
const { currentIndex, goToNext, goToPrevious, goToSlide } = useCarousel(totalSlides);
```

**Exemple d'utilisation** :

```tsx
const Carousel = ({ items }) => {
  const { currentIndex, goToNext, goToPrevious } = useCarousel(items.length);

  return (
    <div>
      <div>{items[currentIndex]}</div>
      <button onClick={goToPrevious}>Previous</button>
      <button onClick={goToNext}>Next</button>
    </div>
  );
};
```

#### useSeoMetadata

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\hooks\useSeoMetadata.tsx`

**Responsabilités** :
- Génération de meta tags dynamiques
- Schema.org pour différents types de contenu

**API** :

```typescript
const { generateArticleSchema, generateBreadcrumbs } = useSeoMetadata();
```

#### useArticleEditor

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\hooks\useArticleEditor.tsx`

**Responsabilités** :
- Logique de l'éditeur d'articles
- CRUD articles (Create, Read, Update, Delete)
- Upload d'images
- Génération de slug

#### useAdminArticles

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\hooks\useAdminArticles.tsx`

**Responsabilités** :
- Fetch articles pour admin dashboard
- Filtres, tri, pagination
- Stats (total, publiés, brouillons)

### React Query

**Configuration** :

```typescript
// App.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

**Exemples d'utilisation** :

```typescript
// Fetch articles
const { data: articles, isLoading, error } = useQuery({
  queryKey: ['articles'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true);

    if (error) throw error;
    return data;
  },
});

// Create article (mutation)
const createArticle = useMutation({
  mutationFn: async (article: ArticleInsert) => {
    const { data, error } = await supabase
      .from('articles')
      .insert(article)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['articles']);
  },
});
```

---

## Routing

### Configuration React Router

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\App.tsx`

**Structure** :

```tsx
<BrowserRouter>
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Index />} />
    <Route path="/blog" element={<BlogIndex />} />
    <Route path="/blog/article/:slug" element={<ArticlePage />} />
    <Route path="/autohypnose" element={<AutohypnoseIndex />} />
    <Route path="/autohypnose/quiz" element={<AutohypnoseQuiz />} />

    {/* Admin routes (protected) */}
    <Route path="/admin-blog/login" element={<AdminLogin />} />
    <Route
      path="/admin-blog/articles"
      element={
        <PrivateRoute>
          <AdminArticles />
        </PrivateRoute>
      }
    />

    {/* 404 */}
    <Route path="*" element={<Custom404 />} />
  </Routes>
</BrowserRouter>
```

### Lazy Loading

**Optimisation des performances** :

```tsx
// App.tsx
const BlogIndex = lazy(() => import('@/pages/blog/BlogIndex'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/blog" element={<BlogIndex />} />
    <Route path="/admin-blog" element={<AdminDashboard />} />
  </Routes>
</Suspense>
```

**Avantages** :
- Réduit le bundle initial
- Chargement à la demande
- Améliore Time to Interactive (TTI)

### PrivateRoute

**Protection des routes admin** :

```tsx
// src/components/auth/PrivateRoute.tsx
const PrivateRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/admin-blog/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
```

### Redirections SPA

**Configuration Netlify** :

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

**Permet** :
- Client-side routing
- Pas de 404 sur refresh
- URLs propres sans # (hash)

---

## State management

### Stratégie globale

**Niveaux de state** :

1. **Local state** : `useState` pour UI locale (modals, forms)
2. **Lifted state** : `useContext` pour state partagé (auth, theme)
3. **Server state** : React Query pour données backend
4. **URL state** : React Router pour navigation

### Context API

#### AuthContext

**Fichier** : `C:\Users\zenat\nova-hypno-textes-fr\src\hooks\useAuth.tsx`

```tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  // Auth logic...

  return (
    <AuthContext.Provider value={{ user, session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### React Query (Server State)

**Avantages** :
- Cache automatique
- Refetch intelligent
- Optimistic updates
- Pagination/infinite scroll

**Patterns** :

```typescript
// Query (GET)
const { data, isLoading } = useQuery(['articles'], fetchArticles);

// Mutation (POST, PUT, DELETE)
const mutation = useMutation(createArticle, {
  onSuccess: () => {
    queryClient.invalidateQueries(['articles']);
  },
});

// Optimistic update
const updateArticle = useMutation(updateArticleFn, {
  onMutate: async (newArticle) => {
    await queryClient.cancelQueries(['articles']);
    const previous = queryClient.getQueryData(['articles']);

    queryClient.setQueryData(['articles'], (old) => {
      return old.map((a) => (a.id === newArticle.id ? newArticle : a));
    });

    return { previous };
  },
  onError: (err, variables, context) => {
    queryClient.setQueryData(['articles'], context.previous);
  },
});
```

---

## Patterns et conventions

### Nommage

```typescript
// Composants : PascalCase
export const BlogCard = () => {};

// Hooks : camelCase avec préfixe 'use'
export const useArticles = () => {};

// Functions : camelCase
export const formatDate = () => {};

// Constants : SCREAMING_SNAKE_CASE
export const API_BASE_URL = '...';

// Types/Interfaces : PascalCase
export interface Article {}
```

### Composition de composants

**Pattern Container/Presentational** :

```tsx
// Container (logique)
const ArticleListContainer = () => {
  const { data: articles, isLoading } = useArticles();

  if (isLoading) return <Skeleton />;

  return <ArticleList articles={articles} />;
};

// Presentational (UI)
const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
```

### Render Props

```tsx
<DataFetcher
  url="/api/articles"
  render={({ data, loading }) => (
    loading ? <Spinner /> : <ArticleList articles={data} />
  )}
/>
```

### Higher-Order Components (HOC)

```tsx
const withAuth = (Component) => {
  return (props) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    return <Component {...props} />;
  };
};

const ProtectedPage = withAuth(Dashboard);
```

---

## Performance et optimisations

### Code Splitting

**Vite configuration** :

```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom'],
        'vendor-ui': ['@radix-ui/react-accordion'],
        'vendor-router': ['react-router-dom'],
        'vendor-supabase': ['@supabase/supabase-js'],
      }
    }
  }
}
```

**Résultat** :
- Bundle principal : ~150 KB
- Vendor chunks : ~270 KB
- Total : ~420 KB (gzipped: ~140 KB)

### Lazy Loading Images

```tsx
<img
  src="image.webp"
  alt="Description"
  loading="lazy"
  decoding="async"
/>
```

### React.memo

**Éviter re-renders inutiles** :

```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Rendu coûteux
  return <div>{data}</div>;
}, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
```

### useCallback et useMemo

```tsx
const MemoizedComponent = () => {
  // Mémoriser fonction
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  // Mémoriser calcul
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
  }, [data]);

  return <Button onClick={handleClick}>{expensiveValue}</Button>;
};
```

### Virtual Scrolling (si nécessaire)

```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={1000}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>Item {index}</div>
  )}
</FixedSizeList>
```

### Bundle Analysis

```bash
npm run build
# Voir le rapport dans la console

# Ou visualiser avec rollup-plugin-analyzer
```

---

## Diagrammes techniques

### Flux d'authentification

```
User → Login Form → submit()
                      ↓
                   useAuth.login()
                      ↓
              Supabase.auth.signInWithPassword()
                      ↓
              ← JWT Token + User data
                      ↓
              setUser(user)
              setSession(session)
                      ↓
              localStorage.setItem('session')
                      ↓
              Navigate to /admin-blog
```

### Flux de création d'article

```
Admin → Editor Form → fill content
                         ↓
                    submit()
                         ↓
              useArticleEditor.createArticle()
                         ↓
              React Query useMutation
                         ↓
              Supabase.from('articles').insert()
                         ↓
              RLS check (is admin?)
                         ↓
              ← Article created
                         ↓
              invalidateQueries(['articles'])
                         ↓
              Navigate to /admin-blog/articles
```

---

## Ressources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [REFACTORING.md](C:\Users\zenat\nova-hypno-textes-fr\REFACTORING.md)

---

**Dernière mise à jour** : 6 octobre 2025
**Maintenu par** : Équipe NovaHypnose
