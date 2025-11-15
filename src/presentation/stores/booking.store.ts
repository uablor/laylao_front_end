import {
  Booking,
  BookingPaginationParams,
  BookingReport,
  IBooking,
} from "@/domain/entities/booking.entity";
import {
  BookingDetailPaginationParams,
  IBookingDetail,
} from "@/domain/entities/booking_detail.entity";
import { PaginatedResponse } from "@/shared/types";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useBookingStore = defineStore("bookingStore", () => {
  const booking = ref<Booking>({
    customer_name: "",
    customer_tel: "",
    rooms: [],
  });
  const loading = ref<boolean>(false);
  const booking_pagination = ref<PaginatedResponse<IBooking>>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const booking_all = ref<IBooking[]>([]);
  const booking_one = ref<IBooking | null>(null);
  const query = ref<BookingPaginationParams>({ page: 1, limit: 10 });
  const query_details = ref<BookingDetailPaginationParams>({
    page: 1,
    limit: 10,
  });

  const booking_details_all = ref<IBookingDetail[]>([]);
  const booking_details_one = ref<IBookingDetail | null>(null);
  const booking_details_pagination = ref<PaginatedResponse<IBookingDetail>>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  // const loading_details = ref<boolean>(false);
  const loading_report = ref<boolean>(false);
  const booking_report = ref<BookingReport>({
    total_price: 0,
    total_booking: 0,
    total_brokerage_fees: 0,
    total_total: 0,
  });
  return {
    loading,
    loading_report,
    booking,
    booking_pagination,
    booking_all,
    booking_one,
    query,
    query_details,
    booking_report,
    booking_details_all,
    booking_details_one,
    booking_details_pagination,
  };
});
