import { Images } from "@/domain/entities/image.entity";
import { UploadFile } from "ant-design-vue";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useImageStore = defineStore("imageStore", () => {
  const images = ref<Images[]>([]);
  const fileList = ref<UploadFile[]>([]);
  const loading_image = ref<boolean>(false);
  const logoFile = ref<UploadFile[]>([]);
  const pendingFiles = ref<File[]>([]);
  const previewVisible = ref(false);
  const previewImage = ref<any>("");
  const previewTitle = ref("");
  const loading_one = ref<boolean>(false);
  return {
    images,
    fileList,
    loading_image,
    pendingFiles,
    logoFile,
    previewVisible,
    previewImage,
    previewTitle,
    loading_one
  };
});
