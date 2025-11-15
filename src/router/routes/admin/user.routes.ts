import { BaseRole } from "@/shared/enum/base.role.enum";
import { RouteRecordRaw } from "vue-router";
export const UserRoute: RouteRecordRaw[] = [
  {
    path: "user",
    name: "admin.user",
    component: () => import("@/presentation/views/admin/UserPage.vue"),
    meta: {
      title: "user",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
            skipAuthCheck: false,
    },
  },
];
