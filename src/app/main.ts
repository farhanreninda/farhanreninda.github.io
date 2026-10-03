import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";
import App from "./App.vue";
import { router } from "./router";
import "@/styles/main.css";
import { loadPortfolio, setupPortfolioRefresh } from "@/composables/usePortfolio";

async function bootstrap() {
  if (location.pathname.startsWith("/admin") && import.meta.env.VITE_ADMIN_URL && new URL(import.meta.env.VITE_ADMIN_URL).origin !== location.origin) {
    location.replace(import.meta.env.VITE_ADMIN_URL);
    return;
  }
  const root = document.getElementById("app")!;
  const message = document.createElement("p");
  message.style.cssText = "max-width:40rem;margin:15vh auto;padding:1.5rem";
  message.setAttribute("role", "status");
  message.textContent = "Memuat portfolio…";
  root.replaceChildren(message);
  try {
    await loadPortfolio();
    const app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(createHead());
    await router.isReady();
    app.mount("#app");
    if (!location.pathname.startsWith("/admin")) setupPortfolioRefresh();
  } catch {
    message.setAttribute("role", "alert");
    message.textContent = "Portfolio belum dapat dimuat. Pastikan backend CMS berjalan, lalu coba lagi. ";
    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "button";
    retry.textContent = "Coba lagi";
    retry.onclick = () => { void bootstrap(); };
    message.append(retry);
  }
}
void bootstrap();
