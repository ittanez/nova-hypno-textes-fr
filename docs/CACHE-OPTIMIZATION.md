# Optimisations Cache pour PageSpeed Insights

## Cache Supabase Storage

### Problème actuel
Les images Supabase ont un TTL de seulement **1 heure** par défaut, ce qui force les navigateurs à revalider fréquemment les images. Cela impacte négativement le score PageSpeed Insights.

### Solution recommandée
Configurer les headers de cache dans Supabase pour avoir un TTL d'**1 an** (31536000 secondes).

### Configuration dans Supabase Dashboard

1. **Accéder à Storage Settings**
   - Allez sur https://supabase.com/dashboard
   - Sélectionnez votre projet
   - Allez dans Storage > Configuration

2. **Configurer les Cache-Control headers**

   Pour le bucket `images` :
   ```
   Cache-Control: public, max-age=31536000, immutable
   ```

3. **Alternative via Supabase Edge Function**

   Si les headers ne peuvent pas être configurés directement, créez une Edge Function proxy :

   ```typescript
   // supabase/functions/image-proxy/index.ts
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

   serve(async (req) => {
     const url = new URL(req.url)
     const imagePath = url.searchParams.get('path')

     // Fetch image from storage
     const imageUrl = `https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/${imagePath}`
     const response = await fetch(imageUrl)

     // Clone response with custom headers
     const headers = new Headers(response.headers)
     headers.set('Cache-Control', 'public, max-age=31536000, immutable')

     return new Response(response.body, {
       status: response.status,
       headers
     })
   })
   ```

### Images déjà optimisées

Les images suivantes ont été optimisées avec des transformations Supabase :

1. **alain-nov2025.webp** - srcset responsive (400w, 600w, 800w)
2. **Images carrousel** - transformation avec `width=1920&quality=80`
3. **Dimensions explicites** - width/height ajoutés pour éviter CLS

### Impact estimé

- **Avant** : TTL 1h = 517 KiB à revalider
- **Après** : TTL 1 an = Cache persistant
- **Gain PageSpeed** : +5-10 points estimés

## Google Maps Lazy Loading

Le composant Google Maps est maintenant chargé de manière lazy via `LazyCommuteMap.tsx` :

- Charge uniquement quand visible (IntersectionObserver)
- Économie de **167 KiB** de JavaScript au chargement initial
- Améliore significativement le TBT (Total Blocking Time)

## Références

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Cache-Control Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [PageSpeed Insights](https://pagespeed.web.dev/)
