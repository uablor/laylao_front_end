<template>
  <div class="flex justify-between items-start gap-4 p-4">
    <div
      class="w-[25%] h-[85vh] overflow-y-auto grid grid-cols-1 gap-4 scrollbar-hide"
    >
      <div
        class="w-full h-10 flex justify-start items-center gap-3 px-4 sticky top-0 z-10 bg-white"
      >
        <a-span>ເຂດ</a-span>
        <a-select
          v-model:value="query.zone_id"
          :placeholder="`${t('zone')}`"
          style="width: 200px"
          @change="setQuery"
          :options="[
          { value: '', label: `${t('total')}` },
          ...zoneAll.map((zone: any) => ({ value: zone.id, label: zone.name }))]"
        >
        </a-select>
      </div>
      <div v-if="loading" class="flex justify-center items-center h-[50vh]">
        <a-spin />
      </div>
      <a-empty
        v-else-if="filteredHotels.length === 0"
        description="ບໍ່ມີໂຮງແຮມ"
      />
      <a-card
        v-else
        v-for="(hotel, index) in filteredHotels"
        :key="hotel.id || index"
        :class="{ 'selected-card': selectedHotelId === hotel.id }"
        class="!rounded-none !border-none"
        style="border-radius: none !important"
        :cover="
          hotel.images && hotel.images.length > 0
            ? h('img', {
                src:  hotel.images[0]?.url,
                alt: hotel.name,
                class: 'h-38 w-full border-none rai object-cover !rounded-none',
              })
            : h(
                'div',
                {
                  class:
                    'h-38 w-full bg-gray-200 flex items-center justify-center !rounded-none',
                },
                'No Image'
              )
        "
        @click="() => selectHotel(hotel)"
      >
        <div class="mt-2 text-sm">
          <div class="my-2">
            <router-link
              :to="{
                name: 'app-v2.hotel-profile',
                params: { id: String(hotel.id) },
              }"
              target="_blank"
              class="text-[18px] !text-black hover:!underline !inline-block transition"
            >
              {{ hotel.name || $t("noName") }} {{ hotel.floor || "N/A" }}
              {{ $t("floor") }}
            </router-link>
          </div>
          <p class="flex items-center gap-2 text-sm">
            <PhoneOutlined /> {{ hotel.tel || "N/A" }}
          </p>
          <p class="flex items-center gap-2 text-sm">
            <MailOutlined /> {{ hotel.email_hotel || "N/A" }}
          </p>
        </div>
      </a-card>
    </div>
    <div class="w-[75%] h-[85vh]">
      <Map
        :modelValueLat="mapCenter.lat"
        :modelValueLng="mapCenter.lng"
        :markers="filteredHotels"
        :zoom="14"
        :api-key="googleMapsApiKey"
        ref="mapRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "./map.vue";
import { h, onMounted, ref, computed, watch } from "vue";
import { useHotel } from "@/presentation/composables/useHotel";
import { storeToRefs } from "pinia";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { useZoneStore } from "@/presentation/stores/zone.store";
import { useZone } from "@/presentation/composables/useZone";
import { Hotel } from "../../../domain/entities/hotel.entity";

const { t } = useI18n();
const { findallWithPagination, setQuery } = useHotel();
const { HotelList, query, loading } = storeToRefs(useHotelStore());
const { zoneAll } = storeToRefs(useZoneStore());
const { findAll } = useZone();
const mapRef = ref<InstanceType<typeof Map>>();
const searchQuery = ref("");
const selectedHotelId = ref<number | null>(null);
const mapCenter = ref({ lat: 17.985, lng: 102.618 });

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const filteredHotels = computed(() => {
  if (!HotelList.value.data) return [];

  if (!searchQuery.value) {
    return HotelList.value.data;
  }

  return HotelList.value.data.filter((hotel: any) => {
    const searchLower = searchQuery.value.toLowerCase();
    return (
      hotel.name?.toLowerCase().includes(searchLower) ||
      hotel.address?.toLowerCase().includes(searchLower) ||
      hotel.tel?.includes(searchQuery.value)
    );
  });
});

const selectHotel = (hotel: Hotel) => {
  selectedHotelId.value = hotel.id;
  const lat = Number(hotel.latitude);
  const lng = Number(hotel.longitude);
  if (!isNaN(lat) && !isNaN(lng)) {
    mapCenter.value = { lat, lng };
  }
  mapRef.value?.openInfoWindow(hotel, 0);
};

onMounted(async () => {
  query.value.type = "all";
  await findallWithPagination();
  await findAll();

  if (HotelList.value.data && HotelList.value.data.length > 0) {
    const firstHotel = HotelList.value.data[0];
    const lat = Number(firstHotel?.latitude);
    const lng = Number(firstHotel?.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      mapCenter.value = { lat, lng };
    }
  }
});

watch(
  () => HotelList.value.data,
  (value) => {
    if (value && value.length > 0) {
      const firstHotel = value[0];
      const lat = Number(firstHotel?.latitude);
      const lng = Number(firstHotel?.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        mapCenter.value = { lat, lng };
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
img {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

:deep(.ant-card) {
  cursor: pointer;
  transition: all 0.3s;
}

:deep(.ant-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
