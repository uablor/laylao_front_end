import { RouteRecordRaw } from "vue-router";
import RoomPage from "@/presentation/views/admin/RoomPage.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
export const RoomRoute: RouteRecordRaw[] = [
  {
    path: "roomtype",
    name: "admin.roomtype",
    component: () => import("@/presentation/views/admin/RoomTypePage.vue"),
    meta: {
      title: "roomtype",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
            skipAuthCheck: false,
    },
    props: true,
  },

  {
    path: "room",
    name: "admin.room",
    component: RoomPage,
    meta: {
      title: "room",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
            skipAuthCheck: false,
    },
  },
];
