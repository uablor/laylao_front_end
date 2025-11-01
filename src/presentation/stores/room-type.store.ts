import {
  RoomTypeApiResponse,
  RoomTypeListApiResponse,
} from "@/application/response/roomtype.response";
import { RoomType } from "@/domain/entities/roomtype.entity";
import { PaginationParams } from "@/shared/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useroomTypeStore = defineStore("roomTyeStore", () => {
  const loading = ref<boolean>(false);
  const RoomTypeList = ref<RoomTypeListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  const query = ref<PaginationParams>({ page: 1, limit: 10 });
  const selectedRoomType = ref<RoomTypeApiResponse | null>(null);
  const RoomTypeAll = ref<RoomType[] >([]);
  return {
    RoomTypeList,
    loading,
    query,
    selectedRoomType,
    RoomTypeAll,
  };
});
