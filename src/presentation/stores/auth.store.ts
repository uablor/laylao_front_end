import { User } from "@/domain/entities/user.entity";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const token = ref(localStorage.getItem("access_token") || "");
  const role = ref(localStorage.getItem("roles") || "");
  const isAuthenticated = computed(() => !!token.value);
  const authme = ref<User>();

  return {
    token,
    isAuthenticated,
    role,
    authme,
  };
});
