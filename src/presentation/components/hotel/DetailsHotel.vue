<template>
  <div>
    <div class="flex justify-between items-center px-4 pt-4">
      <div class="flex items-center gap-2">
        <h1 class="text-[15px] font-bold text-gray-800">
          <HomeOutlined /> {{ $t("dashboard") }}
          {{ hotelDetails?.name }}
        </h1>
        <div class="flex justify-end items-center gap-1">
          <a-tag color="red" class="text-sm text-red-500">
            {{ $t("time_open_close") }}:
            <FieldTimeOutlined />
            {{ selectedHotel?.start_time || $t("unknown") }} -
            {{ selectedHotel?.end_time || $t("unknown") }}
          </a-tag>
        </div>
      </div>
      <div class="flex gap-2">
        <a-button
          v-if="
            rolesArray.includes(BaseRole.ADMIN_HOTEL) ||
            rolesArray.includes(BaseRole.USER_HOTEL)
          "
          type="primary"
          size="middle"
          @click="
            () =>
              router.push({
                name: 'admin-hotel.hotel-profile',
                params: { id: String(authme?.hotels?.[0]?.id) },
              })
          "
          class="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {{ $t("perview") }}
        </a-button>
        <a-badge :count="booking.rooms.length">
          <BaseButton type="primary" ghost @click="onBooking" size="middle">
            <PlusCircleFilled class="text-lg" />{{ $t("booking") }}
          </BaseButton>
        </a-badge>
        <BaseButton
          v-if="activeKey === '1'"
          type="primary"
          @click="onRoom"
          size="middle"
        >
          {{ $t("add") + $t("room") }}
        </BaseButton>
        <BaseButton
          v-if="activeKey === '2'"
          type="primary"
          @click="onRoomType"
          size="middle"
        >
          {{ $t("add") + $t("room_type") }}
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 p-4">
      <div
        class="lg:col-span-2 flex items-center justify-between bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <div class="truncate">
          <span class="font-medium text-gray-700">{{ $t("address") }}:</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="ml-1 text-gray-600 truncate">{{
            hotelDetails?.address
          }}</span>
        </div>
        <a
          :href="`https://www.google.com/maps/search/?api=1&query=${hotelDetails?.latitude},${hotelDetails?.longitude}`"
          target="_blank"
          class="text-blue-500 transition-transform duration-200 hover:scale-110"
        >
          <EnvironmentOutlined class="text-lg" />
        </a>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("floor") + $t("total") }}</span>
        <a-spin size="small" v-if="loading" />
        <span v-else class="font-semibold">{{ selectedHotel?.floor }}</span>
      </div>
      <div
        class="lg:col-span-2 flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-800 font-medium flex items-center gap-2">
          {{ $t("contact") }}
        </span>

        <a-spin size="small" v-if="loading" />

        <div v-else class="text-gray-600 text-sm flex gap-1 items-center">
          <span>
            <PhoneOutlined class="text-base" />
            {{ selectedHotel?.tel || "N/A" }}
          </span>
          ~
          <span>
            <MailOutlined class="text-base" />
            {{ selectedHotel?.email_hotel || "N/A" }}
          </span>
        </div>
      </div>
      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("room") + $t("total") }}</span>
        <a-spin size="small" v-if="loading" />
        <span v-else class="font-semibold">{{ hotelDetails?.room_total }}</span>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("room") + $t("free") }}</span>
        <a-spin size="small" v-if="loading" />
        <span v-else class="font-semibold">{{ hotelDetails?.room_free }}</span>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">ຫ້ອງຕິດຈອງ</span>
        <a-spin size="small" v-if="loading" />
        <span v-else class="font-semibold">{{
          hotelDetails?.room_no_free
        }}</span>
      </div>
      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("room_type") + $t("total") }}</span>
        <a-spin size="small" v-if="loading" />
        <span v-else class="font-semibold">{{
          hotelDetails?.room_type_total
        }}</span>
      </div>
      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">ຈຳນວນກຳຈອງທັງຫມົດ</span>
        <a-spin size="small" v-if="loading" />
        <span v-else class="font-semibold">{{
          hotelDetails?.booking_total
        }}</span>
      </div>
    </div>
    <div class="px-4">
      <a-tabs
        v-model:activeKey="activeKey"
        style="width: 100%; height: 100%"
        @tabClick="onTabClick"
      >
        <a-tab-pane key="1" :tab="$t('room')" force-render>
          <RoomTable :hide-select-room-type="false" />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('room_type')" force-render>
          <RoomTypeTable />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
  <Booking :open="open" @is-open="open = $event" />
  <CreateRoom />
  <CreateRoomType />
</template>

<script setup lang="ts">
import {
  EnvironmentOutlined,
  HomeOutlined,
  PlusCircleFilled,
} from "@ant-design/icons-vue";
import RoomTable from "../room/RoomTable.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useroomStore } from "@/presentation/stores/room.store";
import { useHotel } from "@/presentation/composables/useHotel";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { useBookingStore } from "@/presentation/stores/booking.store";
import Booking from "../booking/Booking.vue";
import RoomTypeTable from "../roomtype/RoomTypeTable.vue";
import CreateRoomType from "../roomtype/createRoomType.vue";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import CreateRoom from "../room/createRoom.vue";
import { useAuthStore } from "../../stores/auth.store";
import { BaseRole } from "@/shared/enum/base.role.enum";
const { booking } = storeToRefs(useBookingStore());
const { rolesArray, authme } = storeToRefs(useAuthStore());
const route = useRoute();
const router = useRouter();
const open = ref<boolean>(false);
const {
  query,
  formState: formStateRoom,
  open_create: open_create_room,
} = storeToRefs(useroomStore());
const { hotelDetails, loading, selectedHotel } = storeToRefs(useHotelStore());
const { findOneHotelDetails, fetchHotel } = useHotel();
const activeKey = ref("1");
const { formState, open_create } = storeToRefs(useroomTypeStore());

const onTabClick = (key: string) => {
  activeKey.value = key;
  console.log(key);
};

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
const onRoom = () => {
  formStateRoom.value.id = 0;
  formStateRoom.value.name = "";
  formStateRoom.value.room_number = "";
  formStateRoom.value.price = 0;
  formStateRoom.value.brokerage_fees = 0;
  formStateRoom.value.floor = 0;
  formStateRoom.value.description = "";
  formStateRoom.value.room_amenities = "";
  formStateRoom.value.room_type_id = 0;
  formStateRoom.value.hotel_id = 0;
  open_create_room.value = true;
};
const onRoomType = () => {
  formState.value.id = 0;
  formState.value.name = "";
  formState.value.hotel_id = 0;
  formState.value.images = [];
  formState.value.image_ids = [];
  open_create.value = true;
};

onMounted(async () => {
  if (
    route.name === "admin.detailhotel" ||
    (route.name === "admin-hotel.detailhotel" && route.params.id)
  ) {
    query.value.hotel_id = Number(route.params.id);
    await findOneHotelDetails(Number(route.params.id));
    await fetchHotel(Number(route.params.id));
  }
});
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
