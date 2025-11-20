// src/presentation/composables/useDistrict.ts
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { PaginationParams } from "@/shared/types";
import { DistrictService } from "@/infrastructure/services/district.service";
import {
  DistrictListApiResponse,
  DistrictApiResponse,
} from "@/application/response/district.response";
import { message } from "ant-design-vue";
import {
  CreateDistrictCredentialsDto,
  UpdateDistrictCredentialsDto,
} from "@/application/dto/district.dto";

export function useDistrict() {
  const { t } = useI18n();

  const loading = ref(false);
  const DistrictList = reactive<DistrictListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const selectedDistrict = ref<DistrictApiResponse | null>(null);
  const query = ref<PaginationParams>({ page: 1, limit: 10 });

  const fetchDistrictList = async (provinceId?: string) => {
    try {
      loading.value = true;
      const res = await DistrictService.findall(query.value, provinceId);
      if (res && res.data && Array.isArray(res.data)) {
        Object.assign(DistrictList, res);
      } else {
        console.warn("Invalid response structure:", res);
        DistrictList.data = [];
      }
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const setQuery = (q: Partial<PaginationParams>) => {
    query.value = { ...query.value, ...q };
    fetchDistrictList();
  };

  const fetchDistrict = async (id: number) => {
    try {
      loading.value = true;
      selectedDistrict.value = await DistrictService.findOne(id);
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const createDistrict = async (data: CreateDistrictCredentialsDto) => {
    try {
      loading.value = true;
      const res = await DistrictService.create(data);
      message.success(t("district_created_success"));
      fetchDistrictList();
      return res;
    } catch (err) {
      message.error(t("failed"));
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateDistrict = async (data: UpdateDistrictCredentialsDto) => {
    try {
      loading.value = true;
      const res = await DistrictService.update(data);
      message.success(t("district_updated_success"));
      fetchDistrictList();
      return res;
    } catch (err) {
      message.error(t("district_update_failed"));
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteDistrict = async (id: number) => {
    try {
      loading.value = true;
      await DistrictService.delete(id);
      message.success(t("district_deleted_success"));
      DistrictList.data = DistrictList.data.filter((d) => d.id !== id);
      DistrictList.pagination.total = Math.max(0, DistrictList.pagination.total - 1);
    } catch (err) {
      message.error(t("district_delete_failed"));
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    DistrictList,
    selectedDistrict,
    query,
    fetchDistrictList,
    setQuery,
    fetchDistrict,
    createDistrict,
    updateDistrict,
    deleteDistrict,
  };
}
