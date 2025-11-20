import { RouteRecordRaw } from "vue-router";
import RoomPage from "@/presentation/views/admin/RoomPage.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
export const RoomRoute: RouteRecordRaw[] = [
  {
    path: "roomtype",
    name: "admin-hotel.roomtype",
    component: () => import("@/presentation/views/admin/RoomTypePage.vue"),
    meta: {
      title: "roomtype",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
            skipAuthCheck: false,
    },
    props: true,
  },

  {
    path: "room",
    name: "admin-hotel.room",
    component: RoomPage,
    meta: {
      title: "room",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
            skipAuthCheck: false,
    },
  },
];
