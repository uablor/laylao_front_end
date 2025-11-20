import { BaseRole } from "@/shared/enum/base.role.enum";
import { RouteRecordRaw } from "vue-router";
export const DashboardRoute: RouteRecordRaw[] = [
  {
    path: "dashboard",
    name: "admin.dashboard",
    component: () => import("@/presentation/views/admin/DashboardPage.vue"),
    meta: {
      title: "dashboard",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
  },
];
