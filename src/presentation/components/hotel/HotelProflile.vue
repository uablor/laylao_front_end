<template>
  <div class="container mx-auto">
    <div
      v-if="!selectedHotel"
      class="flex justify-center items-center h-screen"
    >
      <a-spin size="middle" />
    </div>

    <div v-else class="p-3 lg:p-6">
      <!-- Hotel -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-2 text-gray-800">
          <HomeOutlined class="text-blue-600" />
          {{ selectedHotel?.name }}
        </h1>
        <div class="flex items-center gap-3 text-gray-600">
          <a
            :href="`https://www.google.com/maps/search/?api=1&query=${selectedHotel?.latitude},${selectedHotel?.longitude}`"
            target="_blank"
            class="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 transition-transform duration-200 hover:scale-110"
          >
            <EnvironmentOutlined class="text-xl" />
          </a>
          <span>{{ selectedHotel?.address }}</span>
        </div>
      </div>

      <div class="flex sm:flex-row lg:flex-row w-full gap-4 h-auto">
        <div class="w-full lg:w-3/2">
          <GalleryContact
            :images="selectedHotel?.images"
            @gallery-open="handleGalleryOpen"
            @gallery-close="handleGalleryClose"
          />
        </div>

        <div class="w-1/2 flex flex-col gap-4 justify-between">
          <div>
            <a-card class="w-full">
              <span
                class="text-sm font-semibold text-gray-400 tracking-wider mb-2 block"
              >
                {{ $t("contact") }}

                <div
                  class="flex flex-col justify-start gap-2 text-gray-600 mt-2"
                >
                  <div class="flex items-center gap-2">
                    <PhoneOutlined class="text-lg" />
                    <a-spin size="small" v-if="loading" />
                    <span v-else>{{ selectedHotel?.tel }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <MailOutlined class="text-lg" />
                    <a-spin size="small" v-if="loading" />
                    <span v-else>{{ selectedHotel?.email_hotel }}</span>
                  </div>
                  <div class="">
                    <EnvironmentOutlined class="text-lg pr-2" />
                    <a-spin size="small" v-if="loading" />
                    <span v-else>{{ selectedHotel?.address }}</span>
                  </div>

                  <div class="flex justify-start items-center gap-1 my-2">
                    <a-tag color="red" class="text-sm text-gray-500">
                      {{ $t("time_open_close") }}:
                      <FieldTimeOutlined />
                      {{ selectedHotel.start_time || $t("unknown") }} -
                      {{ selectedHotel.end_time || $t("unknown") }}
                    </a-tag>
                  </div>
                </div>
              </span>
            </a-card>
          </div>
          <div class="w-full h-[50%] flex">
            <PickMap
              :readonly="true"
              :modelValueLat="selectedHotel?.latitude ?? 0"
              :modelValueLng="selectedHotel?.longitude ?? 0"
            />
          </div>
        </div>
      </div>

      <!-- detail -->

      <div class="mt-6">
        <div class="flex justify-between items-center pt-4">
          <h1 class="text-[15px] font-bold text-gray-800">
            <a-span>
              {{ $t("detail") + $t("of") }}
              {{ selectedHotel?.name }}
            </a-span>
          </h1>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 pt-4">
          <div
            class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
          >
            <span class="text-gray-700">{{ $t("floor") + $t("total") }}</span>
            <a-spin size="small" v-if="loading" />
            <span v-else class="font-semibold">{{ selectedHotel?.floor }}</span>
          </div>
          <div
            class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
          >
            <span class="text-gray-700">ປະເພດຫ້ອງ</span>
            <a-spin size="small" v-if="loading" />

            <span v-else class="font-semibold">{{
              hotelDetails?.room_type_total
            }}</span>
          </div>
          <div
            class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
          >
            <span class="text-gray-700">{{ $t("room") + $t("total") }}</span>
            <a-spin size="small" v-if="loading" />
            <span v-else class="font-semibold">{{
              hotelDetails?.room_total
            }}</span>
          </div>

          <div
            class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
          >
            <span class="text-gray-700">{{ $t("room") + $t("free") }}</span>
            <a-spin size="small" v-if="loading" />
            <span v-else class="font-semibold">{{
              hotelDetails?.room_free
            }}</span>
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
            <span class="text-gray-700">ຈຳນວນການຈອງ</span>
            <a-spin size="small" v-if="loading" />
            <span v-else class="font-semibold">{{
              hotelDetails?.booking_total
            }}</span>
          </div>
        </div>
      </div>

      <div class="mt-10 text-sm">
        {{ $t("room_type") }}
      </div>

      <div>
        <div
          v-if="
            selectedHotel &&
            (selectedHotel?.room_types?.length ?? 0) > 0 &&
            selectedRoomType
          "
        >
          <div
            v-if="selectedHotel?.room_types?.length === 0"
            class="flex justify-center items-center px-6 w-full h-[300px]"
          >
            <a-empty />
          </div>

          <a-tabs v-else v-model:active-key="activeTab">
            <a-tab-pane
              v-for="roomType in selectedHotel.room_types"
              :key="String(roomType.id)"
              :tab="roomType.name"
            >
              <div
                v-if="!selectedRoomType || loading"
                class="flex justify-center items-center h-[300px]"
              >
                <a-spin size="middle" />
              </div>
              <div v-else>
                <div class="flex justify-between items-center">
                  <h1 class="text-[15px] font-bold text-gray-800">
                    {{ $t("image") + $t("room_type") }}
                    {{ selectedRoomType.name }}
                  </h1>
                </div>
                <div class="mt-4">
                  <div
                    v-if="loading_room_type"
                    class="flex justify-center items-center px-6 w-full h-[200px]"
                  >
                    <a-spin size="middle" />
                  </div>
                  <div
                    v-else-if="selectedRoomType.images?.length === 0"
                    class="flex justify-center items-center px-6"
                  >
                    <a-empty />
                  </div>
                  <div v-else>
                    <BaseGallery
                      :images="selectedRoomType.images"
                      @gallery-open="handleGalleryOpen"
                      @gallery-close="handleGalleryClose"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-10">
                <div class="flex justify-between items-center px-6">
                  <div class="mt-4 w-full">
                    {{ $t("list") + $t("room") }}
                  </div>
                  <div class="flex w-full justify-end gap-2">
                    <a-badge :count="booking.rooms.length">
                      <BaseButton
                        type="primary"
                        ghost
                        @click="onBooking"
                        size="middle"
                      >
                        <PlusCircleFilled class="text-lg" />{{ $t("booking") }}
                      </BaseButton>
                    </a-badge>
                  </div>
                </div>

                <div>
                  <RoomTable :hide-select-room-type="true" />
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>

        <div
          v-else
          class="flex justify-center items-center px-6 w-full h-[300px]"
        >
          <a-spin size="middle" />
        </div>
      </div>
    </div>
    <Booking :open="open" @is-open="open = $event" @save="onSave" />
  </div>
</template>

<script setup lang="ts">
import {
  EnvironmentOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleFilled,
} from "@ant-design/icons-vue";
import { ref, onMounted, watch, nextTick } from "vue";
import { useHotel } from "@/presentation/composables/useHotel";
import PickMap from "@/components/ui/PickMap.vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import { useBookingStore } from "@/presentation/stores/booking.store";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { useRoomType } from "@/presentation/composables/useRoomType";
import RoomTable from "../room/RoomTable.vue";
import { useroomStore } from "@/presentation/stores/room.store";
import BaseGallery from "@/components/ui/BaseGellary.vue";
import GalleryContact from "@/components/ui/BaseImage.vue";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import Booking from "../booking/Booking.vue";
import { useRoom } from "@/presentation/composables/useRoom";
const route = useRoute();
const open = ref<boolean>(false);
const { hotelDetails, loading, selectedHotel } = storeToRefs(useHotelStore());
const { fetchHotel, findOneHotelDetails } = useHotel();
const loading_room_type = ref<boolean>(false);
const { booking } = storeToRefs(useBookingStore());

const { fetchRoomType } = useRoomType();
const { selectedRoomType } = storeToRefs(useroomTypeStore());

const { query } = storeToRefs(useroomStore());
const { fetchRoomList } = useRoom();

const activeTab = ref<any>("");

const onBooking = () => {
  open.value = true;
};
const hotel_id = ref<number>(0);

onMounted(async () => {
  await fetchHotel(Number(route.params.id));
  await findOneHotelDetails(Number(route.params.id));
  hotel_id.value = Number(route.params.id);
  await nextTick();

  if (
    selectedHotel.value?.room_types &&
    selectedHotel.value.room_types.length > 0
  ) {
    const firstRoomTypeId = selectedHotel.value.room_types?.[0]?.id;
    activeTab.value = String(firstRoomTypeId);

    await fetchRoomType(Number(firstRoomTypeId));
  }
});

watch(activeTab, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    loading_room_type.value = true;
    query.value.room_type_id = Number(newVal);
    await fetchRoomList();
    await fetchRoomType(Number(newVal));
    loading_room_type.value = false;
  }
});

const handleGalleryOpen = (index: number) => {
  console.log("Gallery opened at index:", index);
};

const handleGalleryClose = () => {
  console.log("Gallery closed");
};

const onSave = () => {
  findOneHotelDetails(hotel_id.value);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
