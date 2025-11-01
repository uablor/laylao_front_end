import { computed } from "vue";
import { useBookingStore } from "../stores/booking.store";
import { storeToRefs } from "pinia";
import { bookingService } from "@/infrastructure/services/booking.service";
import { useI18n } from "vue-i18n";
import { handleApiError } from "@/shared/utils/error";
import { message } from "ant-design-vue";
import { PaginationParams } from "@/shared/types";
import { useRoom } from "./useRoom";
import { BookingDetailPaginationParams } from "@/domain/entities/booking_detail.entity";

export function useBooking() {
  const { t } = useI18n();
  const {
    booking,
    loading,
    booking_pagination,
    query,
    booking_all,
    booking_one,
    booking_details_all,
    booking_details_one,
    booking_details_pagination,
    query_details,
  } = storeToRefs(useBookingStore());
  const { fetchRoomList } = useRoom();

  const setQuery = (q: Partial<PaginationParams>) => {
    const { page, ...query_not_page } = q;
    query.value = { ...query.value, ...query_not_page };
    if (page !== undefined && page !== null && !isNaN(Number(page))) {
      query.value.page = Number(page);
    }
    findallWithPagination();
  };

  const findallWithPagination = async () => {
    try {
      loading.value = true;
      const res = await bookingService.findallWithPagination(query.value);
      booking_pagination.value = res;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const findall = async () => {
    try {
      loading.value = true;
      const res = await bookingService.findall();
      booking_all.value = res.result;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const findone = async (id: number) => {
    try {
      loading.value = true;
      const res = await bookingService.findOne(id);
      booking_one.value = res.result;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const findallWithPagination_details = async () => {
    try {
      loading.value = true;
      const res = await bookingService.findallWithPaginationdetails(
        query_details.value
      );
      booking_details_pagination.value = res;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const findall_details = async () => {
    try {
      loading.value = true;
      const res = await bookingService.findalldetails();
      booking_details_all.value = res.result;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const findone_details = async (id: number) => {
    try {
      loading.value = true;
      const res = await bookingService.findOnedetails(id);
      booking_details_one.value = res.result;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const CreateBooking = async () => {
    try {
      loading.value = true;
      await bookingService.create(booking.value);
      message.success(t("success"));
      fetchRoomList();
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const setQuery_details = (q: BookingDetailPaginationParams) => {
    console.log(q);
    const { page, ...query_not_page } = q;
    query_details.value = { ...query_details.value, ...query_not_page };
    if (page !== undefined && page !== null && !isNaN(Number(page))) {
      query_details.value.page = Number(page);
    }
    console.log(query_details.value);
    findallWithPagination_details();
  };
  return {
    loading: computed(() => loading.value),
    booking: computed(() => booking.value),
    query_details: computed(() => query_details.value),
    CreateBooking,
    findallWithPagination,
    findall,
    findone,
    setQuery,
    findallWithPagination_details,
    findall_details,
    findone_details,
    setQuery_details,
  };
}
