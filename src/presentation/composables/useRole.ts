import {
  RoleApiResponse,
  RoleApiResponseList,
  RoleListApiResponse,
} from "@/application/response/role.response";
import { RoleService } from "@/infrastructure/services/role.service";
import { PaginationParams } from "@/shared/types";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

export function useRole() {
  const { t } = useI18n();

  const loading = ref(false);
  const RoleList = reactive<RoleApiResponseList>({
    result: [],
    message: "",
    status_code: 0,
  });

  const RoleListWithPagination = reactive<RoleListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const selectedRole = ref<RoleApiResponse | null>(null);
  const query = ref<PaginationParams>({ page: 1, limit: 10 });

  const fetchRoleWithPagination = async () => {
    try {
      loading.value = true;
      const res = await RoleService.findAllWithPagination(query.value);
      if (res && res.data && Array.isArray(res.data)) {
        Object.assign(RoleListWithPagination, res);
      } else {
        message.error(t("failed"));
        RoleListWithPagination.data = [];
      }
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const fetchRoleList = async () => {
    try {
      loading.value = true;
      const res = await RoleService.findAll();
      if (res && res.result && Array.isArray(res.result)) {
        Object.assign(RoleList, res);
      } else {
        message.error(t("failed"));
        RoleList.result = [];
      }
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  const setQuery = (q: Partial<PaginationParams>) => {
    query.value = { ...query.value, ...q };
    fetchRoleList();
  };

  const fetchRole = async (id: number) => {
    try {
      loading.value = true;
      const res = await RoleService.findOne(id);
      selectedRole.value = res;
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    RoleList,
    selectedRole,
    query,
    fetchRoleList,
    fetchRoleWithPagination,
    setQuery,
    fetchRole,
  };
}
