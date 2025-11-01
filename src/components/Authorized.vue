<script setup lang="ts">
import { onMounted } from "vue";
import BaseButton from "./BaseButton.vue";

onMounted(() => {
  localStorage.clear();
});

</script>

<template>
  <a-result
    status="403"
    title="401"
    sub-title="Sorry, you are not authorized to access this page."
  >
    <template #extra>
      <router-link :to="{ name: 'auth.Login' }">
        <BaseButton type="primary">{{ $t("login") }}</BaseButton>
      </router-link>
    </template>
  </a-result>
</template>
