<template>
  <div class="relative my-5" v-if="!props.readonly">
    <div class="text-center w-full my-4">
  <div class="flex items-center justify-center gap-3 w-full">
    <hr class="flex-grow border-gray-300" />
    <span class="text-sm font-semibold  uppercase tracking-wider whitespace-nowrap">
      <EnvironmentFilled />
      {{ $t("location") }}
    </span>
    <hr class="flex-grow border-gray-300" />
  </div>
</div>

    <a-row :gutter="[24, 16]">
      <a-col :xs="24" :sm="8">
        <a-span class="block mb-1">ຄົ້ນຫາສະຖານທີ່</a-span>
        <a-input
          v-model:value="query"
          @input="onInput"
          placeholder="ໃສ່ຊື່ສະຖານທີ່, ຖະໜົນ, ຫຼືທີ່ຢູ່"
          allowClear
          @pressEnter="selectPlace(searchSuggestions[0])"
        >
          <template #suffix>
            <a-button
              type="text"
              size="small"
              @click="selectPlace(searchSuggestions[0])"
            >
              <SearchOutlined />
            </a-button>
          </template>
        </a-input>

        <!-- Dropdown Suggestions -->
        <a-dropdown
          v-if="showSuggestions && searchSuggestions.length"
          class="absolute w-full mt-1 z-50"
          trigger="click"
          open
        >
          <a-menu class="max-h-60 overflow-y-auto">
            <a-menu-item
              v-for="suggestion in searchSuggestions"
              :key="suggestion.placeId"
              @click="selectPlace(suggestion)"
              class="flex flex-col text-sm p-2 bg-white hover:bg-[#f5f5f5] cursor-pointer"
            >
              <span class="font-semibold">{{ suggestion.mainText }}</span>
              <span class="text-gray-500 text-xs">{{
                suggestion.secondaryText
              }}</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>

  <div v-if="selectedLocation" class="w-full h-full">
    <div class="relative h-full w-full overflow-hidden">
      <GoogleMap
        :api-key="props.googleMapsApiKey"
        :center="center"
        :zoom="13"
        style="width: 100%; height: 100%"
        @click="handleMapClick"
        @loaded="onMapLoaded"
      >
        <Marker
          v-if="markerPosition"
          :options="{
            position: markerPosition,
            animation: google?.maps?.Animation?.DROP,
          }"
        />
      </GoogleMap>

      <div
        class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 z-2 max-w-xs"
      >
        <div v-if="!props.readonly" class="flex items-start gap-2">
          <svg
            class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="text-sm">
            <p class="font-semibold text-gray-800">
              {{ $t("drag_map") }}
            </p>
            <p class="text-gray-600 text-xs mt-1">
              {{ $t("drag_map_desc") }}
            </p>
          </div>
        </div>
        <div v-if="props.readonly" class="flex items-start gap-2">
          <div class="text-sm">
            <a
              :href="`https://www.google.com/maps/search/?api=1&query=${props.modelValueLat},${props.modelValueLng}`"
              target="_blank"
              class="text-blue-600 hover:text-blue-800 text-xs"
            >
              {{ $t("open") }} + {{ $t("map") }}
            </a>
          </div>
        </div>
      </div>

      <div
        v-if="!props.readonly"
        class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 z-[500]"
      >
        <div class="text-xs text-gray-500 font-medium mb-1">
          {{ $t("coordinates") }}
        </div>
        <div class="flex gap-3 text-sm">
          <div>
            <span class="font-semibold text-gray-700">Lat:</span>
            <span class="ml-1 text-blue-600 font-mono">{{
              props.modelValueLat.toFixed(6)
            }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-700">Lng:</span>
            <span class="ml-1 text-blue-600 font-mono">{{
              props.modelValueLng.toFixed(6)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined, EnvironmentFilled } from "@ant-design/icons-vue";
import { ref, computed, onMounted, watch } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
interface SearchSuggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
  description: string;
}

const props = withDefaults(
  defineProps<{
    modelValueLat: number;
    modelValueLng: number;
    googleMapsApiKey?: string;
    readonly?: boolean;
  }>(),
  {
    readonly: false,
    modelValueLat: 17.9757,
    modelValueLng: 102.6331,
  }
);

// Emits
const emit = defineEmits<{
  (e: "update:modelValueLat", val: number): void;
  (e: "update:modelValueLng", val: number): void;
}>();

// Refs
const query = ref("");
const searchSuggestions = ref<SearchSuggestion[]>([]);
const showSuggestions = ref(false);
const selectedLocation = ref({
  lat: props.modelValueLat || 17.9757,
  lng: props.modelValueLng || 102.6331,
});
const google = ref<any>(null);

// Computed
const center = computed(() => ({
  lat: selectedLocation.value.lat,
  lng: selectedLocation.value.lng,
}));

const markerPosition = computed(() => ({
  lat: selectedLocation.value.lat,
  lng: selectedLocation.value.lng,
}));

// Watch for prop changes
watch(
  [() => props.modelValueLat, () => props.modelValueLng],
  ([newLat, newLng]) => {
    if (newLat && newLng) {
      selectedLocation.value = { lat: newLat, lng: newLng };
    }
  }
);

// Load Google Maps Script
const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      google.value = window.google;
      resolve(window.google);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${props.googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      google.value = window.google;
      resolve(window.google);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Lifecycle
onMounted(async () => {
  await loadGoogleMapsScript();
});

// Map event handlers
const onMapLoaded = (mapInstance: any) => {
  console.log("Map loaded:", mapInstance);
};

const handleMapClick = (event: any) => {
  if (props.readonly) return;

  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  selectedLocation.value = { lat, lng };
  emit("update:modelValueLat", lat);
  emit("update:modelValueLng", lng);
};

// Autocomplete
const onInput = () => {
  if (query.value.length > 2) {
    fetchAutocompleteSuggestions(query.value);
  } else {
    searchSuggestions.value = [];
    showSuggestions.value = false;
  }
};

const fetchAutocompleteSuggestions = async (input: string) => {
  if (!window.google?.maps?.places?.AutocompleteService) return;

  const service = new window.google.maps.places.AutocompleteService();

  const request = {
    input,
    componentRestrictions: { country: "la" }, // Laos
    types: ["establishment", "geocode"],
  };

  service.getPlacePredictions(request, (predictions: any, status: any) => {
    if (
      status === window.google.maps.places.PlacesServiceStatus.OK &&
      predictions
    ) {
      searchSuggestions.value = predictions.map((prediction: any) => ({
        placeId: prediction.place_id,
        description: prediction.description,
        mainText:
          prediction.structured_formatting?.main_text || prediction.description,
        secondaryText: prediction.structured_formatting?.secondary_text || "",
      }));
      showSuggestions.value = true;
    } else {
      searchSuggestions.value = [];
      showSuggestions.value = false;
    }
  });
};

const selectPlace = (suggestion: any) => {
  showSuggestions.value = false;
  query.value = suggestion.description || suggestion.mainText;

  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode(
    { placeId: suggestion.placeId },
    (results: any, status: string) => {
      if (status === "OK" && results[0]) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        selectedLocation.value = { lat, lng };
        emit("update:modelValueLat", lat);
        emit("update:modelValueLng", lng);
      }
    }
  );
};
</script>

<style scoped>
.autocomplete-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: auto;
}
.search-input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}
.suggestions-list li {
  padding: 8px;
  cursor: pointer;
}
.suggestions-list li:hover {
  background: #f0f0f0;
}
</style>
