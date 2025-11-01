import { useI18n } from "vue-i18n";
import { PaginationParams } from "@/shared/types";
import { ZoneService } from "@/infrastructure/services/zone.service";
import { message } from "ant-design-vue";
import {
  CreateZoneCredentialsDto,
  UpdateZoneCredentialsDto,
} from "@/application/dto/zone.dto";
import { storeToRefs } from "pinia";
import { useZoneStore } from "../stores/zone.store";
import { handleApiError } from "@/shared/utils/error";
import { computed } from "vue";

export function useZone() {
  const { t } = useI18n();
  const { ZoneList, loading, query, selectedZone, zoneAll } = storeToRefs(
    useZoneStore()
  );

  const findAllWithPagination = async () => {
    try {
      loading.value = true;
      const res = await ZoneService.findAllWithPagination(query.value);
      if (res && res.data && Array.isArray(res.data)) {
        ZoneList.value = res;
      } else {
        ZoneList.value.data = [];
      }
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };
  const findAll = async () => {
    try {
      loading.value = true;
      const res = await ZoneService.findall();
      if (res && res.result && Array.isArray(res.result)) {
        zoneAll.value = res.result;
      } else {
        zoneAll.value = [];
      }
    } catch (err) {
      message.error(t("_failed"));
      handleApiError(err, t);
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
    findAllWithPagination();
  };

  const fetchZone = async (id: number) => {
    try {
      loading.value = true;
      selectedZone.value = await ZoneService.findOne(id);
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const createZone = async (data: CreateZoneCredentialsDto) => {
    try {
      loading.value = true;
      const res = await ZoneService.create(data);
      message.success(t("success"));
      findAllWithPagination();
      return res;
    } catch (err) {
      handleApiError(err, t);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateZone = async (data: UpdateZoneCredentialsDto) => {
    try {
      loading.value = true;
      const res = await ZoneService.update(data);
      message.success(t("success"));
      findAllWithPagination();
      return res;
    } catch (err) {
      handleApiError(err, t);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteZone = async (id: number) => {
    try {
      loading.value = true;
      await ZoneService.delete(id);
      message.success(t("success"));
      findAllWithPagination();
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading: computed(() => loading.value),
    ZoneList: computed(() => ZoneList.value),
    selectedZone: computed(() => selectedZone.value),
    query: computed(() => query.value),
    zoneAll: computed(() => zoneAll.value),
    findAllWithPagination,
    setQuery,
    fetchZone,
    createZone,
    updateZone,
    deleteZone,
    findAll,
  };
}
