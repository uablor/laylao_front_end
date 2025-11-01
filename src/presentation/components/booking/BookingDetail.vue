<template>
  <div>
    <div class="flex justify-between items-center mb-6 p-4">
      <h1 class="text-[15px] font-bold text-gray-800">
        <HomeOutlined /> {{ $t("booking_date") }}
        {{ booking_one?.booking_date }}
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-4 p-4">
      <div
        class="lg:col-span-1 flex items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <div class="truncate">
          <span class="font-medium text-gray-700"
            >{{ $t("customer_name") }}: {{ booking_one?.customer_name }}
          </span>
          <span class="ml-1 text-gray-600 truncate">{{}}</span>
        </div>
      </div>

      <div
        class=" items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("customer_tel") }}: </span>
        <span class="font-semibold">{{ booking_one?.customer_tel }}</span>
      </div>
      <div
        class=" items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("payment_status") }} : </span>
        <span class="font-semibold">{{ booking_one?.payment_status ? "ຈ່າຍແລ້ວ" : "ການກຳລັງດຳເນີນງານ" }}</span>
      </div>

      <div
        class=" items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("created_by") }} : </span>
        <span class="font-semibold">{{
          booking_one?.created_by?.first_name +
          " " +
          booking_one?.created_by?.last_name
        }}</span>
      </div>
    </div>

    <div class="mb-4">
      <BookingDetailTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";

import { onMounted } from "vue";
import BookingDetailTable from "./BookingDetailTable.vue";
import { useBooking } from "@/presentation/composables/useBooking";
import { useRoute } from "vue-router";
import { useBookingStore } from "@/presentation/stores/booking.store";
import { storeToRefs } from "pinia";

const route = useRoute();
const { findone } = useBooking();
const { booking_one } = storeToRefs(useBookingStore());
onMounted(async () => {
  await findone(Number(route.params.id));
});
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
