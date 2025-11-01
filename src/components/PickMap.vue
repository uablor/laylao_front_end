<template>
  <div class="relative w-full h-full">
    <transition name="fade">
      <div
        v-if="loading"
        class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/95 to-purple-900/95 z-[1000] backdrop-blur-sm"
      >
        <div class="relative">
          <div class="absolute inset-0 animate-ping">
            <div class="w-16 h-16 rounded-full bg-blue-400/30"></div>
          </div>
          <a-spin size="large" class="relative z-10">
            <template #indicator>
              <div class="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </template>
          </a-spin>
        </div>
        <p class="mt-6 text-white text-lg font-medium animate-pulse">{{ $t("loading") }}</p>
      </div>
    </transition>

    <div class="relative h-full w-full rounded-xl overflow-hidden shadow-2xl">
      <div id="map" class="h-full w-full"></div>
      
      <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 z-[500] max-w-xs">
        <div class="flex items-start gap-2">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div class="text-sm">
            <p class="font-semibold text-gray-800">{{ $t("drag_map") }}</p>
            <p class="text-gray-600 text-xs mt-1"> {{ $t("drag_map_desc") }}</p>
          </div>
        </div>
      </div>

      <!-- Coordinates Display -->
      <div 
        v-if="props.modelValueLat && props.modelValueLng"
        class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 z-[500]"
      >
        <div class="text-xs text-gray-500 font-medium mb-1"> {{ $t("coordinates") }}</div>
        <div class="flex gap-3 text-sm">
          <div>
            <span class="font-semibold text-gray-700">Lat:</span>
            <span class="ml-1 text-blue-600 font-mono">{{ props.modelValueLat.toFixed(6) }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-700">Lng:</span>
            <span class="ml-1 text-blue-600 font-mono">{{ props.modelValueLng.toFixed(6) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import L from "leaflet";
import { Spin as ASpin } from "ant-design-vue";

const props = defineProps<{
  modelValueLat: number | null;
  modelValueLng: number | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValueLat", val: number): void;
  (e: "update:modelValueLng", val: number): void;
}>();

const loading = ref<boolean>(true);

// Custom marker icon
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="absolute -inset-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        <svg class="relative w-10 h-10 text-red-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

onMounted(async () => {
  try {
    loading.value = true;

    const map = L.map("map", { 
      zoomControl: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true
    });
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    let marker: L.Marker | null = null;

    const initLat = props.modelValueLat ?? 13.7563;
    const initLng = props.modelValueLng ?? 100.5018;
    map.setView([initLat, initLng], 13);
    
    marker = L.marker([initLat, initLng], {
      icon: createCustomIcon(),
      draggable: false,
    }).addTo(map);

    if (
      props.modelValueLat == 0 &&
      props.modelValueLng == 0 &&
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        map.setView([lat, lng], 13);
        marker!.setLatLng([lat, lng]);
        emit("update:modelValueLat", lat);
        emit("update:modelValueLng", lng);
      });
    }

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      marker!.setLatLng([lat, lng]);
      emit("update:modelValueLat", lat);
      emit("update:modelValueLng", lng);
      map.panTo([lat, lng], { animate: true, duration: 0.5 });
    });

    watch(
      () => [props.modelValueLat, props.modelValueLng],
      ([lat, lng]) => {
        if (lat != null && lng != null && marker) {
          marker.setLatLng([lat, lng]);
          map.setView([lat, lng], map.getZoom());
        }
      }
    );

    setTimeout(() => (loading.value = false), 800);
  } catch (error) {
    loading.value = false;
  }
});
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.custom-marker) {
  background: transparent;
  border: none;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

:deep(.leaflet-control-zoom a) {
  width: 36px;
  height: 36px;
  line-height: 36px;
  font-size: 20px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: #3b82f6;
  color: white;
}
</style>