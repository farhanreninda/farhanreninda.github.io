import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/HomeView.vue"),
    meta: { title: "Farhan Reninda — Portfolio" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/components/NotFoundView.vue"),
    meta: { title: "Halaman tidak ditemukan | Farhan Reninda" },
  },
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0, behavior: "smooth" };
  },
});

router.afterEach((to) => {
  const title = (to.meta?.title as string | undefined) ?? "Farhan Reninda — Portfolio";
  if (typeof document !== "undefined") document.title = title;
});
