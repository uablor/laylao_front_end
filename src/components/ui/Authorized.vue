<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  localStorage.clear();
});
const to_login = () => {
  window.location.reload();
};
</script>

<template>
  <a-result
    status="403"
    title="401"
    sub-title="Sorry, you are not authorized to access this page."
  >
    <template #extra>
      <a-button type="primary" @click="to_login">
        {{ $t("login") }}
      </a-button>
    </template>
  </a-result>
</template>
