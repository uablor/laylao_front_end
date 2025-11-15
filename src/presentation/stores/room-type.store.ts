import { RoomTypeListApiResponse } from "@/application/response/roomtype.response";
import {
  RoomType,
  RoomType_hotel_id,
  RoomTypePaginationParams,
} from "@/domain/entities/roomtype.entity";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useroomTypeStore = defineStore("roomTyeStore", () => {
  const loading = ref<boolean>(false);
  const RoomTypeList = ref<RoomTypeListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  const query = ref<RoomTypePaginationParams>({ page: 1, limit: 10 });
  const selectedRoomType = ref<RoomType | null>(null);
  const RoomTypeAll = ref<RoomType[]>([]);
  const open_edit = ref<boolean>(false);
  const open_create = ref<boolean>(false);
  const formState = ref<RoomType_hotel_id>({
    id: 0,
    name: "",
    hotel_id: 0,
    image_ids: [],
    images: [],
    createdAt: "",
    updatedAt: "",
  });

  return {
    RoomTypeList,
    loading,
    query,
    selectedRoomType,
    RoomTypeAll,
    formState,
    open_edit,
    open_create
  };
});
