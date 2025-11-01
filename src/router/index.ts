import { createRouter, createWebHistory } from "vue-router";
import AuthorizedPage from "@/components/Authorized.vue";
import { AppRoute } from "./routes/app.routes";
import { AuthRoute } from "./routes/auth.routes";
import NotFound from "@/components/NotFound.vue";
import { authGuard } from "./guards/auth.guard";
// import { authGuard } from "./guard/authGuard";
// import { roleGuard } from "./guard/roleGuard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...AppRoute,
    ...AuthRoute,
    {
      path: "/:pathMatch(.*)*",
      redirect: "/not-found",
    },
    {
      path: "/not-found",
      name: "not-found",
      component: NotFound,
      meta: { title: "Not Found", skipAuthCheck: true },
    },
    {
      path: "/authorized",
      name: "authorized",
      component: AuthorizedPage,
      meta: { title: "Authorized", skipAuthCheck: true },
    },
  ],
});
router.beforeEach(authGuard);
export default router;
