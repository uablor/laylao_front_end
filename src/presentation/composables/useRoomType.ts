import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { PaginationParams } from "@/shared/types";
import { message } from "ant-design-vue";
import {
  CreateRoomTypeCredentialsDto,
  UpdateRoomTypeCredentialsDto,
} from "@/application/dto/roomtype.dto";
import { RoomTypeService } from "@/infrastructure/services/roomtype.service";
import { useroomTypeStore } from "../stores/room-type.store";
import { storeToRefs } from "pinia";
import { handleApiError } from "@/shared/utils/error";

export function useRoomType() {
  const { t } = useI18n();
  const { RoomTypeList, RoomTypeAll, loading, query, selectedRoomType } =
    storeToRefs(useroomTypeStore());

  const findAllRoomType = async () => {
    try {
      loading.value = true;
      const res = await RoomTypeService.findall();
      if (res && res.result && Array.isArray(res.result)) {
        RoomTypeAll.value = res.result;
      } else {
        RoomTypeAll.value = [];
      }
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };
  const fetchRoomTypeWithPagination = async () => {
    try {
      loading.value = true;
      const res = await RoomTypeService.findallWithPagination(query.value);
      if (res && res.data && Array.isArray(res.data)) {
        console.log(res);
        RoomTypeList.value = res;
      } else {
        RoomTypeList.value.data = [];
        message.error(t("loading") + t("failed"));
      }
    } catch (err) {
      message.error(t("loading") + t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const setQuery = (q: Partial<PaginationParams>) => {
    const { page, ...query_not_page } = q;
    query.value = { ...query.value, ...query_not_page };
    if (page !== undefined && page !== null && !isNaN(Number(page))) {
      query.value.page = Number(page);
    }
    fetchRoomTypeWithPagination();
  };

  const fetchRoomType = async (id: number) => {
    try {
      loading.value = true;
      selectedRoomType.value = await RoomTypeService.findOne(id);
    } catch (err) {
      message.error(t("loading") + t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const createRoomType = async (data: CreateRoomTypeCredentialsDto) => {
    try {
      loading.value = true;
      const res = await RoomTypeService.create(data);
      message.success(t("roomtype") + t("create") + t("success"));
      await fetchRoomTypeWithPagination();
      return res;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const updateRoomType = async (data: UpdateRoomTypeCredentialsDto) => {
    try {
      loading.value = true;
      const res = await RoomTypeService.update(data);
      message.success(t("roomtype") + t("update") + t("success"));
      fetchRoomTypeWithPagination();
      return res;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const deleteRoomType = async (id: number) => {
    try {
      loading.value = true;
      await RoomTypeService.delete(id);
      message.success(t("roomtype") + t("deleted") + t("success"));
      RoomTypeList.value.data = RoomTypeList.value.data.filter(
        (r) => r.id !== id
      );
      fetchRoomTypeWithPagination();
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading: computed(() => loading.value),
    RoomTypeList: computed(() => RoomTypeList),
    selectedRoomType: computed(() => selectedRoomType.value),
    query: computed(() => query.value),
    RoomTypeAll: computed(() => RoomTypeAll.value),
    fetchRoomTypeWithPagination,
    findAllRoomType,
    setQuery,
    fetchRoomType,
    createRoomType,
    updateRoomType,
    deleteRoomType,
  };
}
