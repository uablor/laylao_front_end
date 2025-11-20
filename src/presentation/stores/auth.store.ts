import { AuthPayload } from "@/domain/entities/user.entity";
import { decodeJwt } from "@/shared/utils/decodeJwt";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const token = ref(localStorage.getItem("access_token") || "");
  const role = ref(localStorage.getItem("roles") || "");
  
  const isAuthenticated = computed(() => !!token.value);
  const authme = computed<AuthPayload | null>(() => {
    return decodeJwt(token.value) as AuthPayload | null;
  });
  const rolesArray = computed(() => {
    try {
      return JSON.parse(role.value || "[]");
    } catch (err) {
      return [];
    }
  });

  
  return {
    token,
    isAuthenticated,
    role,
    authme,
    rolesArray
  };
});
