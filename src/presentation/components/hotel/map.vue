<template>
  <div class="relative w-full h-full">
    <transition name="fade">
      <div
        v-if="loading"
        class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white/5 to-white/5 z-[1000] backdrop-blur-sm"
      >
        <div class="relative">
          <a-spin size="large" class="relative z-10">
            <template #indicator>
              <div
                class="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"
              ></div>
            </template>
          </a-spin>
        </div>
        <p class="mt-6 text-white text-lg font-medium animate-pulse">
          {{ $t("loading") }}
        </p>
      </div>
    </transition>
    <GoogleMap
      :api-key="apiKey"
      :center="center"
      :zoom="zoom"
      :styles="mapStyles"
      style="width: 100%; height: 100%"
      @loaded="onMapLoaded"
      gestureHandling="cooperative"
    >
      <Marker
        v-for="(marker, index) in markers"
        :key="index"
        :options="getMarkerOptions(marker)"
        @click="() => openInfoWindow(marker, index)"
      />

      <InfoWindow
        v-if="selectedMarker"
        :options="{
          position: {
            lat: Number(selectedMarker.latitude),
            lng: Number(selectedMarker.longitude),
          },
          pixelOffset: { width: 0, height: -40 } as unknown as google.maps.Size
        }"
        @closeclick="selectedMarker = null"
      >
        <div class="info-window-content">
          <div
            v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <a-spin size="small" />
          </div>
          <img
            v-if="selectedMarker.images && selectedMarker.images.length > 0"
            :src="selectedMarker.images[0]?.url"
            :alt="selectedMarker.name"
            class="info-image"
            @load="onImageLoad"
            @error="onImageError"
          />
          <h3 class="info-title">
            {{ selectedMarker.name }}
            {{ selectedMarker.floor }} {{ $t("floor") }}
          </h3>

          <div v-if="selectedMarker.address" class="info-item">
            <span>{{ selectedMarker.address }}</span>
          </div>

          <div v-if="selectedMarker.tel" class="info-item">
            ເບີໂທ <PhoneOutlined class="icon" />
            {{ selectedMarker.tel }}
          </div>

          <div v-if="selectedMarker.email_hotel" class="info-item">
            ອີເມວ <MailOutlined class="icon" />
            {{ selectedMarker.email_hotel }}
          </div>

          <div class="info-actions">
            <router-link
              :to="{
                name: 'app-v2.hotel-profile',
                params: { id: selectedMarker?.id },
              }"
              target="_blank"
            >
              <a-button type="primary" size="small">
                {{ $t("detail") }}
              </a-button>
            </router-link>
          </div>
        </div>
      </InfoWindow>
    </GoogleMap>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons-vue";
import { Hotel } from "@/domain/entities/hotel.entity";
import { storeToRefs } from "pinia";
import { useHotelStore } from "@/presentation/stores/hotel.store";

const { loading } = storeToRefs(useHotelStore());

const props = defineProps<{
  modelValueLat: number;
  modelValueLng: number;
  markers?: Hotel[];
  zoom?: number;
  apiKey?: string;
}>();

const center = ref({ lat: props.modelValueLat, lng: props.modelValueLng });
const zoom = computed(() => props.zoom || 13);
const selectedMarker = ref<Hotel | null>(null);
const mapInstance = ref<any>(null);
const isLoading = ref<boolean>(true);
const isError = ref<boolean>(false);
const apiKey = computed(
  () => props.apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
);
const gmaps = ref<any>(null);

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "on" }],
  },
];

const getMarkerOptions = (marker: Hotel) => {
  if (!gmaps.value) {
    return {
      position: {
        lat: Number(marker.latitude),
        lng: Number(marker.longitude),
      },
    };
  }

  return {
    position: {
      lat: Number(marker.latitude),
      lng: Number(marker.longitude),
    },
    icon: {
      url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      scaledSize: new gmaps.value.Size(32, 32),
      labelOrigin: new gmaps.value.Point(16, -10),
    },
    label: {
      text: marker.name,
      color: "#000",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
    },
  };
};

const onMapLoaded = (map: any) => {
  mapInstance.value = map;
  gmaps.value = window.google.maps;
  if (props.markers && props.markers.length > 0) {
    adjustBounds();
  }
};

const onImageLoad = () => {
  isLoading.value = false;
  isError.value = false;
};

const onImageError = () => {
  isLoading.value = false;
  isError.value = true;
};

const openInfoWindow = (marker: Hotel, _index: number) => {
  selectedMarker.value = marker;
};

const adjustBounds = () => {
  if (!mapInstance.value || !props.markers || props.markers.length === 0)
    return;

  const bounds = new google.maps.LatLngBounds();
  props.markers.forEach((marker) => {
    const lat = Number(marker.latitude);
    const lng = Number(marker.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      bounds.extend({ lat, lng });
    }
  });

  mapInstance.value.fitBounds(bounds);

  if (props.markers.length === 1) {
    setTimeout(() => {
      mapInstance.value.setZoom(props.zoom || 15);
    }, 100);
  }
};

watch(
  () => props.markers,
  () => {
    if (mapInstance.value && props.markers && props.markers.length > 0) {
      adjustBounds();
    }
  },
  { deep: true }
);

watch(
  () => [props.modelValueLat, props.modelValueLng],
  ([lat, lng]) => {
    if (!lat || !lng) return;
    center.value = { lat, lng };
  }
);

defineExpose({
  openInfoWindow,
});

onMounted(() => {
  gmaps.value = window.google.maps;
});
</script>

<style scoped>
:deep(.info-window-content) {
  padding: 12px;
  min-width: 250px;
  font-family: Arial, sans-serif;
}

:deep(.info-image) {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}

:deep(.info-title) {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: bold;
  color: #1a1a1a;
}

:deep(.info-item) {
  margin-bottom: 8px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
}

:deep(.icon) {
  font-size: 16px;
  color: #3b82f6;
}

:deep(.phone-link) {
  color: #3b82f6;
  text-decoration: none;
}

:deep(.phone-link:hover) {
  text-decoration: underline;
}

:deep(.info-actions) {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

:deep(.detail-btn) {
  display: inline-block;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  transition: background 0.2s;
}

:deep(.detail-btn:hover) {
  background: #2563eb;
}

.info-window-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 280px;
  font-family: "Inter", sans-serif;
}

.info-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.info-details {
  padding: 12px;
}

.info-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #222;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
}

.icon {
  color: #3b82f6; /* blue-500 */
}

.phone-link {
  color: #2563eb;
  text-decoration: none;
}

.phone-link:hover {
  text-decoration: underline;
}

.info-actions {
  margin-top: 8px;
  text-align: center;
}

.detail-btn {
  background-color: #3b82f6;
  color: #fff;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.detail-btn:hover {
  background-color: #2563eb;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
