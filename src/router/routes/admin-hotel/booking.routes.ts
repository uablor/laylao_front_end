import { RouteRecordRaw } from "vue-router";
import { BaseRole } from "@/shared/enum/base.role.enum";
import BookingPage from "@/presentation/views/admin/BookingPage.vue";
export const BookingRoute: RouteRecordRaw[] = [
  {
    path: "booking",
    name: "admin-hotel.booking",
    component: BookingPage,
    meta: {
      title: "Booking",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
  },
  {
    path: "detail/:id",
    name: "admin-hotel.detail",
    component: () =>
      import("@/presentation/components/booking/BookingDetail.vue"),
    meta: {
      title: "detail",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
    props: true,
  },
  {
    path: "detailbooking/",
    name: "admin-hotel.detailbooking",
    component: () => import("@/presentation/views/admin/BookingDetailPage.vue"),
    meta: {
      title: "detailbooking",
      roles: [BaseRole.ADMIN_HOTEL, BaseRole.USER_HOTEL],
      skipAuthCheck: false,
    },
    props: true,
  },
];
