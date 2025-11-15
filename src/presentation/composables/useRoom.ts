// src/presentation/composables/useRoom.ts
import { useI18n } from "vue-i18n";
import { RoomService } from "@/infrastructure/services/room.service";
import { message } from "ant-design-vue";
import {
  CreateRoomCredentialsDto,
  UpdateRoomCredentialsDto,
} from "@/application/dto/room.dto";

import { storeToRefs } from "pinia";
import { useroomStore } from "../stores/room.store";
import { RoomPaginationParams } from "@/domain/entities/room.entity";
import { handleApiError } from "@/shared/utils/error";
import { RoomStatus } from "@/shared/enum/status-room.enum";

export function useRoom() {
  const { t } = useI18n();
  const { loading, RoomList, selectedRoom, query } = storeToRefs(
    useroomStore()
  );

  const fetchRoomList = async () => {
    try {
      loading.value = true;
      const res = await RoomService.findallWithPagination(query.value);
      if (res && res.data && Array.isArray(res.data)) {
        RoomList.value = res;
      } else {
        RoomList.value.data = [];
      }
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const setStatus = (status: string) => {
    if (status === "all") {
      query.value = { ...query.value, status: undefined };
    } else {
      query.value = { ...query.value, status: status as RoomStatus };
    }
  };

  // const setRoomType = (room_type_id: number | string) => {
  //   if (room_type_id === "") {
  //     query.value = { ...query.value, room_type_id: undefined };
  //   } else {
  //     query.value = { ...query.value, room_type_id: Number(room_type_id) };
  //   }
  // };

  // const setQuery = (q: Partial<RoomPaginationParams>) => {
  //   const { max_price, min_price, ...querys } = query.value;
  //   const { page, ...query_not_page } = q;
  //   setStatus(q);
  //   setRoomType(q);
  //   query.value = { ...querys, ...query_not_page };
  //   if (page !== undefined && page !== null && !isNaN(Number(page))) {
  //     query.value.page = Number(page);
  //   }
  //   if (min_price !== undefined && min_price !== null) {
  //     query.value.min_price = min_price;
  //   }
  //   if (max_price !== undefined && max_price !== null) {
  //     query.value.max_price = max_price;
  //   }
  //   fetchRoomList();
  // };

  // const setStatus = (status: string) => {
  //   query.value.status = status === "all" ? undefined : (status as RoomStatus);
  // };

  const setRoomType = (room_type_id: number | string) => {
    query.value.room_type_id =
      room_type_id === "all" ? undefined : Number(room_type_id);
  };

  const setQuery = (q: Partial<RoomPaginationParams>) => {

    if (q.status !== undefined) {
      setStatus(q.status as string);
    }

    if (q.room_type_id !== undefined) {
      setRoomType(q.room_type_id);
    }

    if (q.page !== undefined && !isNaN(Number(q.page))) {
      query.value.page = Number(q.page);
    }

    if (q.min_price !== undefined) {
      query.value.min_price = q.min_price;
    }
    if (q.max_price !== undefined) {
      query.value.max_price = q.max_price;
    }

    const { status, room_type_id, page, min_price, max_price, ...rest } = q;
    query.value = { ...query.value, ...rest };

    setStatus(query.value.status as string);
    console.log(query.value);
    fetchRoomList();
  };

  const fetchRoom = async (id: number) => {
    try {
      loading.value = true;
      const res = await RoomService.findOne(id);
      selectedRoom.value = res.result;
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const createRoom = async (data: CreateRoomCredentialsDto) => {
    try {
      loading.value = true;
      if (!query.value.hotel_id) return message.error(t("canot create room"));
      data.hotel_id = query.value.hotel_id;
      const res = await RoomService.create(data);
      message.success(t("room") + t("create") + t("success"));
      fetchRoomList();
      return res;
    } catch (err) {
      handleApiError(err, t);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateRoom = async (data: UpdateRoomCredentialsDto) => {
    try {
      loading.value = true;
      const res = await RoomService.update(data);
      message.success(t("room") + t("update") + t("success"));
      fetchRoomList();
      return res;
    } catch (err) {
      handleApiError(err, t);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteRoom = async (id: number) => {
    try {
      loading.value = true;
      await RoomService.delete(id);
      message.success(t("room") + t("deleted") + t("success"));
      RoomList.value.data = RoomList.value.data.filter((r) => r.id !== id);
      fetchRoomList();
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const onChangeStatus = async (id: number, status: RoomStatus) => {
    try {
      loading.value = true;
      await RoomService.updateStatus(id, status);
      message.success(t("room") + t("update") + t("success"));
      fetchRoomList();
      
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    RoomList,
    selectedRoom,
    query,
    fetchRoomList,
    setStatus,
    setRoomType,
    setQuery,
    fetchRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    onChangeStatus,
  };
}
