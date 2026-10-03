import { fileURLToPath, URL } from "node:url";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), {
    name: 'pages-entry-points',
    apply: 'build',
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
