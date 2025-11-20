<template>
  <div class="flex justify-center pt-4 bg-white shadow-sm w-full">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar
        v-if="authme?.hotels[0]?.logo"
        :src="authme?.hotels[0]?.logo"
        :alt="authme?.first_name"
        class="w-12 h-12 object-cover rounded-full"
      >
      </Avatar>
      <div
        v-else
        class="w-12 h-12 rounded-full shadow flex items-center justify-center"
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
import { Avatar } from "ant-design-vue";
const { authme } = storeToRefs(useAuthStore());
</script>

<style scoped></style>
