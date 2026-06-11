
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from "@/components/ErrorBoundary";

// Create a client with cache configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - les données restent fraîches
      gcTime: 10 * 60 * 1000, // 10 minutes - durée de conservation en cache
    },
  },
});

import PreviewCharte from "@/pages/PreviewCharte"; // Nouvelle homepage (charte risographie) — eager pour le LCP
import ContentLayout from "./components/layout/ContentLayout";
import PrivateRoute from "./components/auth/PrivateRoute";

// Toaster (Radix) chargé en lazy : non nécessaire au premier rendu, il sort
// ainsi le chunk vendor-ui du bundle initial (meilleur FCP/LCP).
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);

// Lazy loading for less critical pages
const Index = lazy(() => import("@/pages/Index")); // Ancienne homepage — archivée sous /v1
const MentionsLegales = lazy(() => import("@/pages/MentionsLegales"));
const Maquette = lazy(() => import("@/pages/Maquette"));
const PreviewCharteAutohypnose = lazy(() => import("@/pages/PreviewCharteAutohypnose"));
const PreviewCharteBlog = lazy(() => import("@/pages/PreviewCharteBlog"));
const PreviewCharteBlogArticle = lazy(() => import("@/pages/PreviewCharteBlogArticle"));
const PreviewCharteMentionsLegales = lazy(() => import("@/pages/PreviewCharteMentionsLegales"));
const PreviewCharteAdmin = lazy(() => import("@/pages/PreviewCharteAdmin"));
const BlogMaquette = lazy(() => import("@/pages/BlogMaquette"));
const Custom404 = lazy(() => import("@/pages/Custom404"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDirect = lazy(() => import("./pages/admin/AdminDirect"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

// Blog public pages
const BlogIndex = lazy(() => import("@/pages/blog/BlogIndex"));
const ArticlePage = lazy(() => import("@/pages/blog/ArticlePage"));
const CategoryPage = lazy(() => import("@/pages/blog/CategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/blog/CategoriesPage"));
const AuthorPage = lazy(() => import("@/pages/AuthorPage"));

// Blog admin pages
const AdminArticles = lazy(() => import("@/pages/admin/blog/AdminArticles"));
const AdminArticleEditor = lazy(() => import("@/pages/admin/blog/AdminArticleEditor"));
const AdminBlogLogin = lazy(() => import("@/pages/admin/blog/AdminLogin"));

// Auto-hypnose pages
const AutohypnoseIndex = lazy(() => import("@/pages/autohypnose/Index"));
const AutohypnoseQuiz = lazy(() => import("@/pages/autohypnose/Quiz"));
const AutohypnoseQuestionnaire = lazy(() => import("@/pages/autohypnose/Questionnaire"));

// Test de réceptivité
const TestReceptivite = lazy(() => import("@/pages/TestReceptivite"));
const TestReceptiviteTest = lazy(() => import("@/pages/TestReceptiviteTest"));
const PreviewCharteTestReceptivite = lazy(() => import("@/pages/PreviewCharteTestReceptivite"));

// Zone d'intervention
const ZoneIntervention = lazy(() => import("@/pages/ZoneIntervention"));

// Landing pages (pages isolées, pas dans la navigation)
const GuideEbook = lazy(() => import("@/pages/GuideEbook"));
const GuideEbookMerci = lazy(() => import("@/pages/GuideEbookMerci"));
const LandingProfessionnels = lazy(() => import("@/pages/LandingProfessionnels"));

// Guide autohypnose (landing page isolée)
const GuideAutohypnose = lazy(() => import("@/pages/GuideAutohypnose"));
const GuideAutohypnoseMerci = lazy(() => import("@/pages/GuideAutohypnoseMerci"));

// Script autohypnose Gratitude (page isolée)
const AutohypnoseGratitude = lazy(() => import("@/pages/AutohypnoseGratitude"));

// Guide sommeil (landing page isolée)
const GuideSommeil = lazy(() => import("@/pages/GuideSommeil"));
const GuideSommeilMerci = lazy(() => import("@/pages/GuideSommeilMerci"));

// Guide procrastination (landing page isolée)
const GuideProcrastination = lazy(() => import("@/pages/GuideProcrastination"));
const GuideProcrastinationMerci = lazy(() => import("@/pages/GuideProcrastinationMerci"));

// Politique de confidentialité de l'app mobile NovaRespire (URL déclarée dans Play Console)
const PolitiqueConfidentialiteNovaRespire = lazy(() => import("@/pages/PolitiqueConfidentialiteNovaRespire"));

// Page de redirection WhatsApp (emails Brevo)
const ContactWaBrevo = lazy(() => import("@/pages/ContactWaBrevo"));

// Page de test ebook (isolée, pas dans le menu)
const TestEbook = lazy(() => import("@/pages/TestEbook"));

// Questionnaire ebook (page isolée, pas dans le menu)
const QuestionnaireEbook = lazy(() => import("@/pages/QuestionnaireEbook"));

// Pages de spécialités SEO
const HypnoseStressParis = lazy(() => import("@/pages/HypnoseStressParis"));
const HypnosePhobiesParis = lazy(() => import("@/pages/HypnosePhobiesParis"));
const HypnoseSommeilParis = lazy(() => import("@/pages/HypnoseSommeilParis"));
const HypnoseEmotionsParis = lazy(() => import("@/pages/HypnoseEmotionsParis"));
const HypnoseBlocagesParis = lazy(() => import("@/pages/HypnoseBlocagesParis"));
const HypnoseConfianceParis = lazy(() => import("@/pages/HypnoseConfianceParis"));
const HypnoseEnLigne = lazy(() => import("@/pages/HypnoseEnLigne"));

// Composant pour forcer HTTPS en production et faire les redirections
function AppRedirects() {
  const location = useLocation();
  
  useEffect(() => {
    // En production seulement, rediriger HTTP vers HTTPS
    if (
      window.location.protocol === "http:" &&
      !window.location.href.includes("localhost") &&
      !window.location.href.includes("127.0.0.1")
    ) {
      window.location.replace(
        `https://${window.location.hostname}${window.location.pathname}${window.location.search}`
      );
    }
  }, [location]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppRedirects />
        
        <ErrorBoundary>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nova-blue"></div></div>}>
          <Routes>
            {/* Route principale — nouvelle charte risographie (ex /preview-charte) */}
            <Route path="/" element={<PreviewCharte />} />
            <Route path="/autohypnose" element={<PreviewCharteAutohypnose />} />
            <Route path="/blog" element={<PreviewCharteBlog />} />
            <Route path="/blog/article/:slug" element={<PreviewCharteBlogArticle />} />
            <Route path="/mentions-legales" element={<PreviewCharteMentionsLegales />} />

            {/* Charte graphique — page privée admin */}
            <Route path="/preview-charte-admin" element={<PrivateRoute><PreviewCharteAdmin /></PrivateRoute>} />

            {/* ─── ARCHIVE — ancien site, accessible par URL directe uniquement (noindex) ─── */}
            <Route path="/v1" element={<Index />} />
            <Route path="/v1/autohypnose" element={<AutohypnoseIndex />} />
            <Route path="/v1/blog" element={<BlogIndex />} />
            <Route path="/v1/blog/article/:slug" element={<ArticlePage />} />
            <Route path="/v1/mentions-legales" element={<MentionsLegales />} />

            <Route path="/maquette" element={<Maquette />} />
            <Route path="/preview-charte" element={<PreviewCharte />} />
            <Route path="/preview-charte-autohypnose" element={<PreviewCharteAutohypnose />} />
            <Route path="/preview-charte-blog" element={<PreviewCharteBlog />} />
            <Route path="/preview-charte-blog/article/:slug" element={<PreviewCharteBlogArticle />} />
            <Route path="/preview-charte-mentions-legales" element={<PreviewCharteMentionsLegales />} />

            <Route path="/maquette" element={<Maquette />} />

            {/* Page d'erreur 404 personnalisée */}
            <Route path="/404" element={<Custom404 />} />

            {/* Routes Blog publiques — /blog et /blog/article/:slug sont servis par la charte (voir plus haut) */}
            <Route path="/blog-maquette" element={<BlogMaquette />} />
            <Route path="/blog/categorie/:slug" element={<CategoryPage />} />
            <Route path="/blog/categories" element={<CategoriesPage />} />

            {/* Profil Auteur */}
            <Route path="/alain-zenatti" element={<AuthorPage />} />

            {/* Routes Auto-hypnose — /autohypnose est servi par la charte (voir plus haut) */}
            <Route path="/autohypnose/quiz" element={<AutohypnoseQuiz />} />
            <Route path="/autohypnose-questionnaire" element={<AutohypnoseQuestionnaire />} />

            {/* Test de réceptivité */}
            <Route path="/test-receptivite" element={<PreviewCharteTestReceptivite />} />
            <Route path="/test-receptivite-archive" element={<TestReceptivite />} />

            {/* Zone d'intervention */}
            <Route path="/zone-intervention" element={<ZoneIntervention />} />

            {/* Landing pages — pas de header/footer */}
            <Route path="/guide-emotions-travail" element={<GuideEbook />} />
            <Route path="/guide-emotions-travail/merci" element={<GuideEbookMerci />} />
            <Route path="/guide-autohypnose" element={<GuideAutohypnose />} />
            <Route path="/guide-autohypnose/merci" element={<GuideAutohypnoseMerci />} />
            <Route path="/autohypnose-gratitude" element={<AutohypnoseGratitude />} />
            <Route path="/guide-sommeil" element={<GuideSommeil />} />
            <Route path="/guide-sommeil/merci" element={<GuideSommeilMerci />} />
            <Route path="/guide-procrastination" element={<GuideProcrastination />} />
            <Route path="/guide-procrastination/merci" element={<GuideProcrastinationMerci />} />
            <Route path="/hypnose-professionnels-paris" element={<LandingProfessionnels />} />

            {/* Politique de confidentialité app NovaRespire — URL déclarée dans Play Console */}
            <Route path="/politique-de-confidentialite-novarespire" element={<PolitiqueConfidentialiteNovaRespire />} />

            {/* Page de test ebook — pas dans le menu */}
            <Route path="/test-ebook" element={<TestEbook />} />

            {/* Questionnaire post-téléchargement ebook — page isolée */}
            <Route path="/questionnaire-ebook" element={<QuestionnaireEbook />} />

            {/* Page de redirection WhatsApp — emails Brevo */}
            <Route path="/contact-wa-brevo" element={<ContactWaBrevo />} />
            <Route path="/wa" element={<ContactWaBrevo />} />

            {/* Pages de spécialités */}
            <Route path="/hypnose-stress-anxiete-paris" element={<HypnoseStressParis />} />
            <Route path="/hypnose-phobies-paris" element={<HypnosePhobiesParis />} />
            <Route path="/hypnose-sommeil-paris" element={<HypnoseSommeilParis />} />
            <Route path="/hypnose-gestion-emotions-paris" element={<HypnoseEmotionsParis />} />
            <Route path="/hypnose-blocages-paris" element={<HypnoseBlocagesParis />} />
            <Route path="/hypnose-confiance-en-soi-paris" element={<HypnoseConfianceParis />} />
            <Route path="/hypnose-en-ligne" element={<HypnoseEnLigne />} />

            {/* Route de connexion admin blog */}
            <Route path="/admin-blog/login" element={<AdminBlogLogin />} />
            <Route path="/admin-blog" element={<Navigate to="/admin-blog/login" replace />} />

            {/* Routes admin générales */}
            <Route
              path="/admin-blog/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-blog/direct"
              element={
                <PrivateRoute>
                  <AdminDirect />
                </PrivateRoute>
              }
            />

            {/* Routes admin blog */}
            <Route
              path="/admin-blog/articles"
              element={
                <PrivateRoute>
                  <AdminArticles />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-blog/article/new"
              element={
                <PrivateRoute>
                  <AdminArticleEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-blog/article/:id/edit"
              element={
                <PrivateRoute>
                  <AdminArticleEditor />
                </PrivateRoute>
              }
            />
            
            {/* Au lieu d'une route * vague, rediriger spécifiquement vers la page 404 */}
            <Route path="*" element={<Custom404 />} />
          </Routes>
        </Suspense>

        {/* Toaster dans l'ErrorBoundary : un échec de chargement de son chunk lazy
            déclenche un rechargement propre (cf. ErrorBoundary) au lieu de planter l'app */}
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
        </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
