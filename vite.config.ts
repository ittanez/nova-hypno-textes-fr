import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteSeoHeaders } from "./vite-plugin-seo-headers.js";
import analyze from "rollup-plugin-analyzer";

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
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      plugins: [
        analyze({
          summaryOnly: true,
          limit: 20
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
