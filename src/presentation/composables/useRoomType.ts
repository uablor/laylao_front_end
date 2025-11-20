
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
import { useImageStore } from "../stores/image.store";
import { toFormData } from "@/shared/utils/toFormData";

export function useRoomType() {
  const { t } = useI18n();
  const { RoomTypeList, RoomTypeAll, loading, query, selectedRoomType } =
    storeToRefs(useroomTypeStore());
  const { pendingFiles } = storeToRefs(useImageStore());
  const findAllRoomType = async (id?: number) => {
    try {
      loading.value = true;
      const res = await RoomTypeService.findall(id);
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
      const res = await RoomTypeService.findOne(id);
      selectedRoomType.value = res.result;
    } catch (err) {
      message.error(t("loading") + t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const createRoomType = async (data: CreateRoomTypeCredentialsDto) => {
    try {
      loading.value = true;
      const excludeKeys = ["id", "image_ids", "images", "rooms"];
      const formData = toFormData<CreateRoomTypeCredentialsDto>(
        data,
        pendingFiles.value,
        "files",
        excludeKeys
      );
      const res = await RoomTypeService.create(formData);
      message.success(t("roomtype") + t("create") + t("success"));
      await fetchRoomTypeWithPagination();
      pendingFiles.value = [];
      return res;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
      pendingFiles.value = [];
    }
  };

  const updateRoomType = async (data: UpdateRoomTypeCredentialsDto) => {
    try {
      loading.value = true;
      const excludeKeys = ["id", "image_ids", "images", "rooms"];
      const formData = toFormData<UpdateRoomTypeCredentialsDto>(
        data,
        pendingFiles.value,
        "files",
        excludeKeys
      );
      const res = await RoomTypeService.update(data.id, formData);
      message.success(t("roomtype") + t("update") + t("success"));
      fetchRoomTypeWithPagination();
      pendingFiles.value = [];
      return res;
    } catch (err) {
      handleApiError(err, t);
    } finally {
      pendingFiles.value = [];
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
    fetchRoomTypeWithPagination,
    findAllRoomType,
    setQuery,
    fetchRoomType,
    createRoomType,
    updateRoomType,
    deleteRoomType,
  };
}
