import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteSeoHeaders } from "./vite-plugin-seo-headers.js";
import { deferCss } from "./vite-plugin-defer-css.js";
import analyze from "rollup-plugin-analyzer";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: '/',
  plugins: [
    react(),
    viteSeoHeaders(),
    deferCss(),
    mode === 'development' &&
    componentTagger(),
    // Copy TinyMCE assets to dist folder
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/tinymce/skins',
          dest: ''
        },
        {
          src: 'node_modules/tinymce/models',
          dest: ''
        },
        {
          src: 'node_modules/tinymce/plugins',
          dest: ''
        },
        {
          src: 'node_modules/tinymce/icons',
          dest: ''
        }
      ]
    })
  ].filter(Boolean),
  build: {
    rollupOptions: {
      plugins: [
        analyze({
          summaryOnly: true,
          limit: 20
        })
      ],
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-toast', '@radix-ui/react-dialog'],
          'vendor-router': ['react-router-dom'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-utils': ['tailwind-merge', 'clsx', 'date-fns']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    target: 'es2022',
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
