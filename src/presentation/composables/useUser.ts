import { useI18n } from "vue-i18n";
import { PaginationParams } from "@/shared/types";
import { UserService } from "@/infrastructure/services/user.service";
import { message } from "ant-design-vue";
import {
  CreateUserCredentialsDto,
  ResetPasswordCredentialsDto,
  UpdateUserCredentialsDto,
} from "@/application/dto/user.dto";
import { handleApiError } from "@/shared/utils/error";
import { useUserStore } from "../stores/user.store";
import { storeToRefs } from "pinia";

export function useUser() {
  const { t } = useI18n();
  const { UserList, loading, query, selectedUser } = storeToRefs(
    useUserStore()
  );

  const findAllWithPagination = async () => {
    try {
      loading.value = true;
      const res = await UserService.findAllWithPagination(query.value);
      if (res && res.data && Array.isArray(res.data)) {
        UserList.value = res;
      } else {
        message.error(t("failed"));
        UserList.value.data = [];
      }
    } catch (err) {
      message.error(t("failed"));
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

  const fetchUser = async (id: number) => {
    try {
      loading.value = true;
      const res = await UserService.findOne(id);
      selectedUser.value = res.result;
    } catch (err) {
      message.error(t("failed"));
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (data: CreateUserCredentialsDto) => {
    try {
      loading.value = true;
      const res = await UserService.create(data);
      if (res.status_code === 200 || res.status_code === 201) {
        message.success(t("user") + t("create") + t("success"));
        findAllWithPagination();
      }
      return res;
    } catch (error) {
      handleApiError(error, t);
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: number,data: UpdateUserCredentialsDto) => {
    try {
      loading.value = true;
      const res = await UserService.update(id,data);
      message.success(t("update") + t("success"));
      await findAllWithPagination();
      return res;
    } catch (error) {
      handleApiError(error, t);
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      loading.value = true;
      await UserService.delete(id);
      message.success(t("user") + t("update") + t("success"));
      UserList.value.data = UserList.value.data.filter((u) => u.id !== id);
      findAllWithPagination();
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading.value = false;
    }
  };

  const updateChangePassword = async (
    id: number,
    data: ResetPasswordCredentialsDto
  ) => {
    try {
      loading.value = true;
      await UserService.changePassword(id, data);
      message.success(t("update") + t("success"));
    } catch (error) {
      handleApiError(error, t);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    UserList,
    selectedUser,
    query,
    findAllWithPagination,
    setQuery,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    updateChangePassword,
  };
}
