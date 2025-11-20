import { BaseRole } from "@/shared/enum/base.role.enum";
import { RouteRecordRaw } from "vue-router";
export const DashboardRoute: RouteRecordRaw[] = [
  {
    path: "dashboard",
    name: "admin-hotel.dashboard",
    component: () => import("@/presentation/views/admin-hotel/DashboardPage.vue"),
    meta: {
      title: "dashboard",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
  },
];
