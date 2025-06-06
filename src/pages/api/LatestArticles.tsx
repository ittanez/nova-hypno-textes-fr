// Créer src/pages/api/LatestArticles.tsx
import { useEffect, useState } from 'react';
import { getAllArticlesNoPagination } from '@/lib/services/articleService';

// Endpoint API : /api/latest-articles
export const LatestArticlesAPI = async () => {
  try {
    const { data: articles, error } = await getAllArticlesNoPagination();
    
    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    // Prendre les 3 derniers articles publiés
    const latestArticles = articles
      ?.filter(article => article.published)
      ?.slice(0, 3)
      ?.map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        image_url: article.image_url,
        slug: article.slug,
        published_at: article.published_at || article.created_at,
        categories: article.categories,
        read_time: article.read_time,
        url: `https://votre-blog.com/article/${article.slug}` // URL complète
      })) || [];

    return {
      success: true,
      data: {
        articles: latestArticles,
        total: latestArticles.length,
        updated_at: new Date().toISOString()
      }
    };

  } catch (error) {
    return {
      success: false,
      error: 'Erreur lors de la récupération des articles'
    };
  }
};

// Route API Express/Next.js (exemple)
// GET /api/latest-articles
export async function GET() {
  const result = await LatestArticlesAPI();
  
  const response = new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Permettre CORS
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=300' // Cache 5 minutes
    }
  });

  return response;
}
