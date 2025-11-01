import { RouteRecordRaw } from "vue-router";
import HotelPage from "@/presentation/views/HotelPage.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
export const HotelRoute: RouteRecordRaw[] = [
  {
    path: "hotel",
    name: "admin.hotel",
    component: HotelPage,
    meta: {
      title: "hotel",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
  },
  {
    path: "detailhotel/:id",
    name: "admin.detailhotel",
    component: () => import("@/presentation/components/hotel/DetailsHotel.vue"),
    meta: {
      title: "detailhotel",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
    props: true,
  },
];
