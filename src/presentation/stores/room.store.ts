import { RoomListApiResponse } from "@/application/response/room.response";
import {
  Room,
  Room_ID,
  RoomPaginationParams,
} from "@/domain/entities/room.entity";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useroomStore = defineStore("roomStore", () => {
  const loading = ref(false);
  const RoomList = ref<RoomListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const selectedRoom = ref<Room | null>(null);
  const query = ref<RoomPaginationParams>({ page: 1, limit: 10 });
  const roomAll = ref<Room[]>([]);

  const formState = ref<Room_ID>({
    id: 0,
    room_number: "",
    name: "",
    price: 0,
    brokerage_fees: 0,
    floor: 0,
    description: "",
    room_amenities: "",
    room_type_id: "",
    hotel_id: 0,
  });

  const open_edit = ref<boolean>(false);
  const open_create = ref<boolean>(false);
  return {
    RoomList,
    loading,
    query,
    selectedRoom,
    roomAll,
    formState,
    open_edit,
    open_create,
  };
});
