<template>
  <div class="flex justify-center p-4">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div
        class="w-10 h-10 rounded-[100%] flex items-center justify-center shadow-sm"
      >
        <span class="font-bold text-lg">
          {{
            authme?.first_name
              ? authme.first_name.charAt(0).toUpperCase()
              : authme?.last_name.charAt(0).toUpperCase()
              ? authme?.email.charAt(0).toUpperCase()
              : ""
          }}
        </span>
      </div>

      <div class="flex-1">
        <h2 class="text-sm font-bold text-gray-800">
          {{ authme?.first_name + " " + authme?.last_name }}
        </h2>
        <p>{{ authme?.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/presentation/stores/auth.store";
import { storeToRefs } from "pinia";

const { authme } = storeToRefs(useAuthStore());
</script>

<style scoped></style>
