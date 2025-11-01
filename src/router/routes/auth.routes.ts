import LoginPage from "@/presentation/views/LoginPage.vue";
import { RouteRecordRaw } from "vue-router";

export const AuthRoute: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "auth.Login",
    component: LoginPage,
    meta: {
      skipAuthCheck: true,
    },
  },
];
