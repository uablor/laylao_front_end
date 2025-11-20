// src/presentation/composables/useProvince.ts
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { PaginationParams } from "@/shared/types";
import {
  ProvinceApiResponse,
  ProvinceListApiResponse,
} from "@/application/response/province.response";
import { message } from "ant-design-vue";
import {
  CreateProvinceCredentialsDto,
  UpdateProvinceCredentialsDto,
} from "@/application/dto/province.dto";
import { ProvinceService } from "@/infrastructure/services/province.service";

export function useProvince() {
  const { t } = useI18n();
  const loading = ref(false);
  const ProvinceList = reactive<ProvinceListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  const selectedProvince = ref<ProvinceApiResponse | null>(null);
  const query = ref<PaginationParams>({ page: 1, limit: 10 });

  const fetchProvinceList = async () => {
    try {
      loading.value = true;
      const res = await ProvinceService.findall(query.value);
      Object.assign(ProvinceList, res);
    } catch (err) {
      message.error(t("fetch_province_list_failed"));
    } finally {
      loading.value = false;
    }
  };
  const setQuery = (q: Partial<PaginationParams>) => {
    query.value = { ...query.value, ...q };
    fetchProvinceList();
  };
  const fetchProvince = async (id: number) => {
    try {
      loading.value = true;
      selectedProvince.value = await ProvinceService.findOne(id);
    } catch (err) {
      message.error(t("fetch_province_failed"));
    } finally {
      loading.value = false;
    }
  };
  const createProvince = async (data: CreateProvinceCredentialsDto) => {
    try {
      loading.value = true;
      const res = await ProvinceService.create(data);
      message.success(t("province_created_success"));
      fetchProvinceList();
      return res;
    } catch (err) {
      message.error(t("province_create_failed"));
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const updateProvince = async (data: UpdateProvinceCredentialsDto) => {
    try {
      loading.value = true;
      const res = await ProvinceService.update(data);
      message.success(t("province_updated_success"));
      fetchProvinceList();
      return res;
    } catch (err) {
      message.error(t("province_update_failed"));
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const deleteProvince = async (id: number) => {
    try {
      loading.value = true;
      await ProvinceService.delete(id);
      message.success(t("province_deleted_success"));
      ProvinceList.data = ProvinceList.data.filter((d) => d.id !== id);
      ProvinceList.pagination.total = Math.max(
        0,
        ProvinceList.pagination.total - 1
      );
    } catch (err) {
      message.error(t("province_delete_failed"));
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    ProvinceList,
    selectedProvince,
    query,
    fetchProvinceList,
    setQuery,
    fetchProvince,
    createProvince,
    updateProvince,
    deleteProvince,
  };
}
