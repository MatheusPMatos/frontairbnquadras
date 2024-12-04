const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        component: () => import("pages/homecomprador/home_comprador.vue"),
      },
      {
        path: "homev",
        component: () => import("pages/homevendedor/homevendedor.vue"),
      },
      {
        path: "agendamento",
        component: () => import("pages/agendamento/agendamentopage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("pages/cadastro/cadastropage.vue"),
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
