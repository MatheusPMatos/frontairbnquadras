const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: { name: "contatos" },
    meta: { requiresAuth: true }, // Marcando como rota protegida
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
    meta: { requiresAuth: false },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
