import { RouteRecordRaw } from "vue-router";
import AppLoyout from "@/components/layouts/admin-layouts/AppLoyout.vue";
import ZonePage from "@/presentation/views/admin/ZonePage.vue";
import { HotelRoute } from "./hotel.routes";
import { RoomRoute } from "./room.routes";
import { DashboardRoute } from "./dashboard.routes";
import { UserRoute } from "./user.routes";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { BookingRoute } from "./booking.routes";
export const AppRoute: RouteRecordRaw[] = [
  {
    path: "/laylao",
    name: "admin",
    component: AppLoyout,
    meta: {
      title: "Admin",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
    children: [
      ...HotelRoute,
      ...RoomRoute,
      ...DashboardRoute,
      ...UserRoute,
      ...BookingRoute,
      {
        path: "zone",
        name: "admin.zone",
        component: ZonePage,
        meta: {
          title: "zone",
          roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
          skipAuthCheck: false,
        },
      },

      {
        path: ":pathMatch(.*)*",
        redirect: { name: "admin.hotel" },
        meta: { title: "Not Found", skipAuthCheck: false, },
      },
      {
        path: "/laylao",
        redirect: { name: "admin.hotel" },
        meta: { title: "Not Found", skipAuthCheck: false, },
      },
    ],
  },
];
