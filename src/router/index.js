import { createRouter, createWebHistory } from "vue-router";
import { Notify } from "quasar";
import routes from "./routes";

const Router = createRouter({
  history: createWebHistory(process.env.VUE_ROUTER_BASE),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
});

const whiteListName = ["login", "register"];

Router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!token && !whiteListName.includes(to.name)) {
    Notify.create({
      message: "Necessário realizar login",
      position: "top",
      type: "warning",
    });
    next({ name: "login" });
  } else {
    if (to.path === "/" && from.path === "/") {
      const userType = localStorage.getItem("profile");
      if (userType === "vendedor") {
        next({ path: "homev" });
      } else {
        next({ path: "home" });
      }
    }
    next();
  }
});

Router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default Router;
