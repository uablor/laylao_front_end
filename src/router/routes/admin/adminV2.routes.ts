import { RouteRecordRaw } from "vue-router";
import AppLoyout from "@/components/layouts/admin-layoutsV2/Applayout.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
import MapHotelPage from "@/presentation/views/admin/MapHotelPage.vue";
import HotelProflile from "@/presentation/components/hotel/HotelProflile.vue";
export const AppV2Route: RouteRecordRaw[] = [
  {
    path: "/booking",
    name: "app-v2",
    component: AppLoyout,
    meta: {
      title: "Admin",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
    children: [
      {
        path: "/map-hotel",
        name: "app-v2.map-hotel",
        component: MapHotelPage,
        meta: {
          title: "maphotel",
          roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
          skipAuthCheck: false,
        },
      },
      {
        path: "/hotel-profile/:id",
        name: "app-v2.hotel-profile",
        component: HotelProflile,
        meta: {
          title: "hotelprofile",
          roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
          skipAuthCheck: false,
        },
      },
    ],
  },
];
