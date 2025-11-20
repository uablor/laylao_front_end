import { RouteRecordRaw } from "vue-router";
import AppLoyout from "@/components/layouts/hotel-layouts/AppLoyout.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { HotelRoute } from "./hotel.routes.ts";
import { RoomRoute } from "./room.routes.ts";
import { UserRoute } from "./user.routes.ts";
import { BookingRoute } from "./booking.routes.ts";
import { DashboardRoute } from "./dashboard.routes.ts";
export const AdminHotelRoute: RouteRecordRaw[] = [
  {
    path: "/hotel",
    name: "admin-hotel",
    component: AppLoyout,
    meta: {
      title: "admin-hotel",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
    children: [
      ...HotelRoute,
      ...RoomRoute,
      ...DashboardRoute,
      ...UserRoute,
      ...BookingRoute,

      {
        path: ":pathMatch(.*)*",
        redirect: { name: "admin-hotel.detailhotel" },
        meta: { title: "Not Found", skipAuthCheck: false },
      },
      {
        path: "/hotel",
        redirect: { name: "admin-hotel.detailhotel" },
        meta: { title: "Not Found", skipAuthCheck: false },
      },
    ],
  },
];
