import { RouteRecordRaw } from "vue-router";
import HotelPage from "@/presentation/views/admin/HotelPage.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
import HotelProflile from "@/presentation/components/admin-hotel/hotel/HotelProflile.vue";
export const HotelRoute: RouteRecordRaw[] = [
  {
    path: "hotel",
    name: "admin-hotel.hotel",
    component: HotelPage,
    meta: {
      title: "hotel",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
  },
  {
    path: "detailhotel",
    name: "admin-hotel.detailhotel",
    component: () => import("@/presentation/components/admin-hotel/hotel/DetailsHotel.vue"),
    meta: {
      title: "detailhotel",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
    props: true,
  },
  {
    path: "managehotel",
    name: "admin-hotel.managehotel",
    component: () => import("@/presentation/components/hotel/manageHotel.vue"),
    meta: {
      title: "managehotel",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
    props: true,
  },
  {
    path: "hotel-profile",
    name: "admin-hotel.hotel-profile",
    component: HotelProflile,
    meta: {
      title: "hotelprofile",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
  },
];
