import { RouteRecordRaw } from "vue-router";
import { BaseRole } from "@/shared/enum/base.role.enum";
import BookingPage from "@/presentation/views/admin/BookingPage.vue";
export const BookingRoute: RouteRecordRaw[] = [
  {
    path: "booking",
    name: "admin.booking",
    component: BookingPage,
    meta: {
      title: "Booking",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
  },
  {
    path: "detail/:id",
    name: "admin.detail",
    component: () =>
      import("@/presentation/components/booking/BookingDetail.vue"),
    meta: {
      title: "detail",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
    props: true,
  },
  {
    path: "detailbooking/",
    name: "admin.detailbooking",
    component: () => import("@/presentation/views/admin/BookingDetailPage.vue"),
    meta: {
      title: "detailbooking",
      roles: [BaseRole.SUPER_ADMIN, BaseRole.ADMIN],
      skipAuthCheck: false,
    },
    props: true,
  },
];
