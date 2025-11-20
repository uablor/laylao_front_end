import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { authService } from "@/infrastructure/services/auth.service";
import { LoginCredentialsDto } from "@/application/dto/login.dto";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { User } from "@/domain/entities/user.entity";
import { handleApiError } from "@/shared/utils/error";
import { useAuthStore } from "../stores/auth.store";
import { storeToRefs } from "pinia";

export function useAuth() {
  const { token, role } = storeToRefs(useAuthStore());
  const router = useRouter();
  const { t } = useI18n();
  const loading = ref(false);
  const error = ref("");
  const user = ref<User>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    roles: [],
    is_active: true,
    hotels: [],
    createdAt: "",
    updatedAt: "",
  });

  const isAuthenticated = computed(() => authService.isAuthenticated());

  const getoken = computed(() => authService.getToken());

  const login = async (credentials: LoginCredentialsDto) => {
    loading.value = true;
    try {
      const response = await authService.login(credentials);
      const { status_code, result } = response;
      user.value = result.user;
      token.value = result.access_token;
      role.value = JSON.stringify(result.user.roles.map((r) => r.name));
      if (status_code === 200 || status_code === 201) {
        const roleNames = result.user.roles.map((r) => r.name);
        if (
          roleNames.includes(BaseRole.SUPER_ADMIN) ||
          roleNames.includes(BaseRole.ADMIN)
        ) {
          router.push({ name: "admin.dashboard" });
        } else if (
          roleNames.includes(BaseRole.USER_HOTEL) ||
          roleNames.includes(BaseRole.ADMIN_HOTEL)
        ) {
          await router.push({
            name: "admin-hotel.dashboard"
          });
        }
        message.success(t(response.message));
      }
    } catch (error) {
      handleApiError(error, t);
    } finally {
      loading.value = false;
    }
  };

  const getAuthme = async () => {
    try {
      // const res = await authService.authme();
      // authme.value = res.result;
    } catch (error) {
      handleApiError(error, t);
    }
  };

  const logout = async () => {
    loading.value = true;

    try {
      await authService.logout();
      user.value = {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        roles: [],
        is_active: true,
        hotels: [],
        createdAt: "",
        updatedAt: "",
      };
      localStorage.clear();
      token.value = "";
      router.push({ name: "auth.Login" });
    } catch (err: any) {
      message.error(t("error.logout"));
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        user.value = await authService.getCurrentUser();
        return true;
      }
      return false;
    } catch (err) {
      user.value = {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        roles: [],
        is_active: true,
        hotels: [],
        createdAt: "",
        updatedAt: "",
      };
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      await authService.refreshToken();
      return true;
    } catch (err) {
      await logout();
      return false;
    }
  };

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    user: computed(() => user.value),
    getoken,
    isAuthenticated,

    // Actions
    login,
    logout,
    checkAuth,
    refreshToken,
    getAuthme,
  };
}
