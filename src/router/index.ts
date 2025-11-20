import { createRouter, createWebHistory } from "vue-router";
import AuthorizedPage from "@/components/ui/Authorized.vue";
import NotFound from "@/components/ui/NotFound.vue";
import { authGuard } from "./guards/auth.guard";
import { AdminHotelRoute } from "./routes/admin-hotel/admin-hotel.routes";
import { AuthRoute } from "./routes/auth/auth.routes";
import { AppV2Route } from "./routes/admin/adminV2.routes";
import { AppRoute } from "./routes/admin/admin.routes";

const routes = [
  ...AppRoute,
  ...AppV2Route,
  ...AuthRoute,
  ...AdminHotelRoute,

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);

export default router;
