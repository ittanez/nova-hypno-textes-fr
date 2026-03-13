#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '..', '.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const { data, error } = await supabase
  .from('articles')
  .select('id, title, slug, content, excerpt, published, read_time, categories, keywords, seo_description, faq, image_url')
  .ilike('slug', '%autophobie%');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log('Found articles:', data?.length);
if (data && data.length > 0) {
  const article = data[0];
  console.log('ID:', article.id);
  console.log('Title:', article.title);
  console.log('Slug:', article.slug);
  console.log('Published:', article.published);
  console.log('Image:', article.image_url);
  console.log('Categories:', JSON.stringify(article.categories));
  const wordCount = article.content?.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length || 0;
  console.log('Word count (approx):', wordCount);
  console.log('FAQ count:', article.faq?.length);
  console.log('\nExcerpt:', article.excerpt);
  console.log('\n--- FULL CONTENT ---');
  console.log(article.content);
}
