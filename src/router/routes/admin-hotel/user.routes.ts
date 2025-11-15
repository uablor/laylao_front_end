import { BaseRole } from "@/shared/enum/base.role.enum";
import { RouteRecordRaw } from "vue-router";
export const UserRoute: RouteRecordRaw[] = [
  {
    path: "user",
    name: "admin-hotel.user",
    component: () => import("@/presentation/views/admin/UserPage.vue"),
    meta: {
      title: "user",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
  },
];
