import { Booking, IBooking } from "@/domain/entities/booking.entity";
import { BookingDetailPaginationParams, IBookingDetail } from "@/domain/entities/booking_detail.entity";
import { PaginatedResponse, PaginationParams } from "@/shared/types";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useBookingStore = defineStore("bookingStore", () => {
  const booking = ref<Booking>({
    customer_name: "",
    customer_tel: "",
    rooms: []
  });
  const loading = ref<boolean>(false)
  const booking_pagination = ref<PaginatedResponse<IBooking>>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const booking_all = ref<IBooking[]>([]);
  const booking_one = ref<IBooking | null>(null);
  const query = ref<PaginationParams>({ page: 1, limit: 10 });
  const query_details = ref<BookingDetailPaginationParams>({ page: 1, limit: 10 });

  const booking_details_all = ref<IBookingDetail[]>([]);
  const booking_details_one = ref<IBookingDetail | null>(null);
  const booking_details_pagination = ref<PaginatedResponse<IBookingDetail>>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  })
  return {
    loading,
    booking,
    booking_pagination,
    booking_all,
    booking_one,
    query,
    query_details,

    booking_details_all,
    booking_details_one,
    booking_details_pagination
    
  };
});
