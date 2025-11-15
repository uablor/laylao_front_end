<template>
  <div>
    <div class="flex flex-col lg:flex-row gap-4 w-full">
      <!-- แถวล่าง -->
      <div
        v-if="images && images.length > 0"
        class="sm:grid sm:grid-cols-3 md:grid-cols-4 gap-2"
      >
        <!-- รูปแรก -->
        <img
          :src="getImageUrl(images[0] ?? '')"
          :alt="`${imageAlt || 'Image'} 1`"
          class="h-[200px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
          @click="onImageClick(0)"
        />

        <!-- รูปที่ 2 ถึง 4 -->
        <div
          v-for="(img, index) in images.slice(1, 4)"
          :key="index"
          class="relative"
        >
          <div  
            v-if="!loadedImages[index]"
            class="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <a-spin size="small" />
          </div>
          <img
            :src="getImageUrl(img)"
            :alt="`${imageAlt || 'Image'} ${index + 2}`"
            class="h-[200px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
            @click="onImageClick(index + 1)"
            @load="onImageLoad(index)"
            @error="onImageError(index)"
            :class="{
              'opacity-0': !loadedImages[index],
              'opacity-100': loadedImages[index],
            }"
          />

          <!-- ปุ่ม +ดูทั้งหมด -->
          <div
            v-if="index === 2 && images.length > 4"
            class="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer hover:bg-black/70 transition"
            @click="openGallery(index + 1)"
          >
            <span class="text-white text-base md:text-lg font-semibold">
              +{{ images.length - 4 }} {{ moreImagesText }}
            </span>
          </div>
        </div>
      </div>

      <!-- Mobile: ปุ่มดูรูปทั้งหมด -->
      <button
        v-if="images && images.length > 1"
        class="sm:hidden w-full py-3 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
        @click="openGallery(0)"
      >
        {{ viewAllImagesText }} ({{ images.length }})
      </button>
    </div>

    <!-- Modal แสดงภาพ -->
    <transition name="fade">
      <div
        v-if="showGalleryModal"
        class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4"
        @click.self="closeGallery"
      >
        <button
          @click="closeGallery"
          style="
            display: absolute;
            top: 10px;
            right: 10px;
            z-index: 100;
            color: white;
            font-size: 24px;
            font-weight: bold;
          "
          class="absolute right-6 text-white rounded-full text-3xl font-bold hover:text-red-400 transition z-10"
        >
          <CloseOutlined />
        </button>

        <!-- Navigation Buttons -->
        <button
          v-if="images && images.length > 1"
          @click="previousImage"
          class="absolute left-4 cursor-pointer top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-blue-400 transition bg-white/50 rounded-full w-12 h-12 flex items-center justify-center"
        >
          <ArrowLeftOutlined />
        </button>

        <button
          v-if="images && images.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-blue-400 transition bg-white/50 rounded-full w-12 h-12 flex items-center justify-center"
        >
          <ArrowRightOutlined />
        </button>

        <!-- Main Image -->
        <div class="max-w-5xl w-full h-[70vh] flex items-center justify-center">
          <img
            :src="selectedImageUrl"
            alt="Full image"
            class="w-auto max-h-full object-contain"
          />
        </div>

        <!-- Image Counter -->
        <div
          class="absolute top-5 left-1/2 -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full"
        >
          {{ currentImageIndex + 1 }} / {{ images?.length ?? 0 }}
        </div>

        <!-- Thumbnail Strip -->
        <div
          v-if="images && images.length > 1"
          class="flex gap-3 mt-6 overflow-x-auto p-2 bg-black/40 max-w-5xl w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          <img
            v-for="(img, index) in images"
            :key="index"
            :src="getImageUrl(img)"
            @click="currentImageIndex = index"
            :class="[
              'h-20 min-w-[80px] object-cover cursor-pointer transition rounded',
              currentImageIndex === index
                ? 'ring-4 ring-blue-400 opacity-100'
                : 'opacity-70 hover:opacity-100',
            ]"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { ref, computed, watch, onMounted } from "vue";

// Types
export interface ImageItem {
  url?: string;
  src?: string;
  image_path?: string;
  [key: string]: any;
}

export interface Props {
  // Images
  images?: ImageItem[] | string[];
  imageUrlPrefix?: string;
  imageUrlKey?: string;
  imageAlt?: string;
  noImageText?: string;
  moreImagesText?: string;
  viewAllImagesText?: string;

  // Contact
  showContact?: boolean;
  contactLabel?: string;
  contactTitle?: string;
  contactDescription?: string;
  avatarUrl?: string;
  avatarSize?: number;

  // Gallery Modal
  enableGalleryModal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  imageUrlPrefix: "",
  imageUrlKey: "url",
  imageAlt: "Image",
  noImageText: "ບໍ່ມີຮູບພາບ",
  moreImagesText: "ຮູບ",
  viewAllImagesText: "ເບິ່ງຮູບທັງໝົດ",
  showContact: true,
  contactLabel: "ຊ່ວງທາງ ຕິດຕໍ່",
  contactTitle: "",
  contactDescription: "",
  avatarUrl: "",
  avatarSize: 64,
  showMap: true,
  mapComponent: null,
  mapProps: () => ({}),
  enableGalleryModal: true,
});

export interface Emits {
  (e: "image-click", index: number): void;
  (e: "gallery-open", index: number): void;
  (e: "gallery-close"): void;
}

const emit = defineEmits<Emits>();

// Gallery Modal State
const showGalleryModal = ref(false);
const currentImageIndex = ref(0);

// Computed
const selectedImageUrl = computed(() => {
  if (!props.images || props.images.length === 0) return "";
  return getImageUrl(props.images[currentImageIndex.value] || "");
});

// Get full image URL
const getImageUrl = (image: ImageItem | string): string => {
  if (typeof image === "string") {
    return props.imageUrlPrefix + image;
  }
  if (typeof image === "object" && image !== null) {
    const url =
      image[props.imageUrlKey] ||
      image.url ||
      image.src ||
      image.image_path ||
      "";
    return props.imageUrlPrefix + url;
  }
  return "";
};

// Handle image click
const onImageClick = (index: number): void => {
  if (props.enableGalleryModal) {
    openGallery(index);
  } else {
    emit("image-click", index);
  }
};

// Open gallery modal
const openGallery = (index: number = 0): void => {
  if (props.enableGalleryModal) {
    currentImageIndex.value = index;
    showGalleryModal.value = true;
  }
  emit("gallery-open", index);
};

// Close gallery modal
const closeGallery = (): void => {
  showGalleryModal.value = false;
  emit("gallery-close");
};

// Image load state
const loadedImages = ref<Record<number, boolean>>({});

const onImageLoad = (index: number) => {
  loadedImages.value[index] = true;
};

const onImageError = (index: number) => {
  console.warn(`Image ${index} failed to load`);
  loadedImages.value[index] = true;
};

// Navigate to previous image
const previousImage = (): void => {
  if (!props.images || props.images.length === 0) return;
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? props.images.length - 1
      : currentImageIndex.value - 1;
};

// Navigate to next image
const nextImage = (): void => {
  if (!props.images || props.images.length === 0) return;
  currentImageIndex.value =
    currentImageIndex.value === props.images.length - 1
      ? 0
      : currentImageIndex.value + 1;
};

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent): void => {
  if (!showGalleryModal.value) return;

  if (e.key === "Escape") {
    closeGallery();
  } else if (e.key === "ArrowLeft") {
    previousImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  }
};

// Watch for gallery modal to add/remove keyboard listener
watch(showGalleryModal, (newVal) => {
  if (newVal) {
    window.addEventListener("keydown", handleKeydown);
  } else {
    window.removeEventListener("keydown", handleKeydown);
  }
});

// ใน BaseGallery component
watch(
  () => props.images,
  (newImages) => {
    // รีเซ็ตหรืออัพเดท gallery ที่นี่
    console.log("Images updated:", newImages);
  },
  { deep: true }
);

onMounted(() => {
});
</script>

<style scoped>
.hotel-gallery-contact {
  width: 100%;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for webkit browsers */
.scrollbar-thin::-webkit-scrollbar {
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
