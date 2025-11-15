<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <router-link :to="{ name: 'auth.Login' }">
        <BaseButton type="primary">{{ isAuthenticated ? $t("goback") : $t("login") }}</BaseButton>
      </router-link>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/presentation/stores/auth.store";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
const { isAuthenticated } = useAuthStore();
</script>
