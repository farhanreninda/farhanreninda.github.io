import { fileURLToPath, URL } from "node:url";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), {
    name: 'pages-entry-points',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        const assets = Object.values(context.bundle ?? {});
        const entryCss = assets.find(asset => asset.type === 'asset' && /^assets\/index-.*\.css$/.test(asset.fileName));
        const tags = assets
          .filter(asset => /^assets\/HomeView-.*\.(js|css)$/.test(asset.fileName))
          .map(asset => ({ tag: 'link', attrs: {
            rel: asset.fileName.endsWith('.js') ? 'modulepreload' : 'stylesheet',
            href: '/' + asset.fileName,
          } }));
        if (entryCss?.type !== 'asset') return tags;
        // Inline the small entry stylesheet to avoid a render-blocking request.
        return {
          html: html.replace(/<link\b[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/, ''),
          tags: [...tags, { tag: 'style', children: String(entryCss.source), injectTo: 'head' as const }],
        };
      },
    },
    async closeBundle() {
      await mkdir('dist/admin', { recursive: true });
      await copyFile('dist/index.html', 'dist/admin/index.html');
      await copyFile('dist/index.html', 'dist/404.html');
      await copyFile('CNAME', 'dist/CNAME');
      await writeFile('dist/.nojekyll', '');
    },
  }],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: { __VUE_OPTIONS_API__: false },
  base: "/",
  preview: {
    proxy: { "/api": "http://127.0.0.1:3001" },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: { "/api": "http://127.0.0.1:3001" },
  },
});
