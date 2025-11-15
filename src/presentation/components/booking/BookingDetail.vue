<template>
  <div>
    <div class="px-4 pt-6">
      <h1 class="text-[15px] font-bold text-gray-800">
        <HomeOutlined /> {{ $t("booking_date") }}
        {{ booking_one?.booking_date }}
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 p-4 mb-2">
      <div
        class="lg:col-span-1 flex items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <div class="truncate">
          <span class="font-medium text-gray-700"
            >{{ $t("name") + " " + $t("and") + " " + $t("last_name") }}:
            {{ booking_one?.customer_name }}
          </span>
          <span class="ml-1 text-gray-600 truncate">{{}}</span>
        </div>
      </div>

      <div class="items-center bg-gray-50 px-3 py-2 text-sm shadow-sm">
        <span class="text-gray-700">{{ $t("tel") }}: </span>
        <span class="font-semibold">{{ booking_one?.customer_tel }}</span>
      </div>
      <div class="items-center bg-gray-50 px-3 py-2 text-sm shadow-sm">
        <span class="text-gray-700">{{ $t("payment_status") }} : </span>
        <a-tag :color=" booking_one?.payment_status ? 'green' : 'red'">{{
          booking_one?.payment_status ? "ຈ່າຍແລ້ວ" : "ການກຳລັງດຳເນີນງານ"
        }}</a-tag>
      </div>

      <div class="items-center bg-gray-50 px-3 py-2 text-sm shadow-sm">
        <span class="text-gray-700">{{ $t("created_by") }} : </span>
        <span class="font-semibold">{{
          booking_one?.created_by?.first_name +
          " " +
          booking_one?.created_by?.last_name
        }}</span>
      </div>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4 py-1 bg-green-100"
    >
      <div
        class="flex justify-between items-center px-3 py-2 text-sm shadow-sm bg-white"
      >
        <span>{{ $t("brokerage") + $t("total") }}</span>
        <a-tag color="green">
          {{
            booking_details_pagination.data
              .reduce((sum, item) => sum + Number(item.brokerage_fees || 0), 0)
              .toLocaleString()
          }}
          kip
        </a-tag>
      </div>
      <div
        class="flex justify-between items-center px-3 py-2 text-sm shadow-sm bg-white"
      >
        <span>{{ $t("revenue") + $t("total") }}</span>
        <a-tag color="blue">
          {{
            booking_details_pagination.data
              .reduce((sum, item) => sum + Number(item.price || 0), 0)
              .toLocaleString()
          }}
          kip

        </a-tag>
      </div>
      <div
        class="flex justify-between items-center px-3 py-2 text-sm shadow-sm bg-white"
      >
        <span>{{ $t("all") + $t("total") }}</span>
        <a-tag color="orange">
          {{
            booking_details_pagination.data.reduce(
              (sum, item) => sum + Number(item.total || 0),
            0)
              .toLocaleString()
          }}
          kip
        </a-tag>
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
const { booking_details_pagination } = storeToRefs(useBookingStore());
onMounted(async () => {
  await findone(Number(route.params.id));
});
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
