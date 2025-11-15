import {
  HotelListApiResponse,
} from "@/application/response/hotel.response";
import { baseEnv } from "@/base.env";
import { Hotel, HotelPaginationParams, HotelSummary } from "@/domain/entities/hotel.entity";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useHotelStore = defineStore("hotelStore", () => {
  const onlyHotel = ref<number | null>();
  const UpdateHotel = ref<Hotel | null>(null);
  const hotelDetails = ref<HotelSummary>();

  const loading = ref(false);
  const HotelList = ref<HotelListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const selectedHotel = ref<Hotel | null>(null);
  const query = ref<HotelPaginationParams>({ page: 1, limit: 10, });
  const hotelAll = ref<Hotel[]>([]);
  const imageUrls = ref<string>(baseEnv.IMAGE_URL);

  const hotel_edit = ref<Hotel | null>(null);
  return {
    HotelList,
    loading,
    query,
    selectedHotel,
    onlyHotel,
    UpdateHotel,
    hotelDetails,
    hotelAll,
    imageUrls,
    hotel_edit
  };
});
