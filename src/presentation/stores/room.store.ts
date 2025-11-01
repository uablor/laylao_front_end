import {
  RoomListApiResponse,
} from "@/application/response/room.response";
import { Room, RoomPaginationParams } from "@/domain/entities/room.entity";

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
  return {
    RoomList,
    loading,
    query,
    selectedRoom,
    roomAll
  };
});
