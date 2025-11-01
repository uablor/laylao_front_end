<template>
  <div>
    <div class="flex justify-between items-center mb-6 p-4">
      <h1 class="text-[15px] font-bold text-gray-800">
        <HomeOutlined /> {{ $t("dashboard") }}
        {{ hotelDetails?.name }}
      </h1>
      <a-badge :count="booking.rooms.length">
        <BaseButton type="primary" ghost @click="onBooking" size="middle">
          <PlusCircleFilled class="text-lg" />{{ $t("booking") }}
        </BaseButton>
      </a-badge>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-4 p-4">
      <div
        class="lg:col-span-2 flex items-center justify-between bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <div class="truncate">
          <span class="font-medium text-gray-700">{{ $t("address") }}:</span>
          <span class="ml-1 text-gray-600 truncate">{{
            hotelDetails?.address
          }}</span>
        </div>
        <a
          :href="hotelDetails?.location"
          target="_blank"
          class="text-blue-500 transition-transform duration-200 hover:scale-110"
        >
          <EnvironmentOutlined class="text-lg" />
        </a>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("room") + $t("total") }}</span>
        <span class="font-semibold">{{ hotelDetails?.room_total }}</span>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("room") + $t("free") }}</span>
        <span class="font-semibold">{{ hotelDetails?.room_free }}</span>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{
          $t("room") + $t("no") + $t("free")
        }}</span>
        <span class="font-semibold">{{ hotelDetails?.room_no_free }}</span>
      </div>
    </div>

    <div class="mb-4">
      <RoomTable />
    </div>
  </div>
  <Booking :open="open" @is-open="open = $event"/>
</template>

<script setup lang="ts">
import { EnvironmentOutlined, HomeOutlined, PlusCircleFilled } from "@ant-design/icons-vue";
import RoomTable from "../room/RoomTable.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useroomStore } from "@/presentation/stores/room.store";
import { useHotel } from "@/presentation/composables/useHotel";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import BaseButton from "@/components/BaseButton.vue";
import { useBookingStore } from "@/presentation/stores/booking.store";
import Booking from "../booking/Booking.vue";
const { booking } = storeToRefs( useBookingStore())
const route = useRoute();
const open = ref<boolean>(false);
const { query } = storeToRefs(useroomStore());
const { hotelDetails } = storeToRefs(useHotelStore());
const { findOneHotelDetails } = useHotel();
watch(
  () => route.params.id,
  (value) => {
    if (value) {
      query.value.hotel_id = Number(value);
    } else {
      query.value.hotel_id = undefined;
    }
  },
  { immediate: true }
);
const onBooking = () => {
  open.value = true;
};
onMounted(async () => {
  if (route.name === "admin.detailhotel" && route.params.id) {
    await findOneHotelDetails(Number(route.params.id));
  }
});
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
