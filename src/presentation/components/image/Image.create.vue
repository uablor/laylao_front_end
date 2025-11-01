<template>
  <a-upload
    v-model:file-list="internalFileList"
    list-type="picture-card"
    :max-count="maxCount"
    :before-upload="beforeUploadWrapper"
    @change="handleChangeWrapper"
    @preview="handlePreview"
    :loading="loading"
  >
    <div
      v-if="internalFileList.length < maxCount"
      class="flex flex-col items-center justify-center"
    >
      <upload-outlined style="font-size: 28px; color: #1890ff" />
      <div class="mt-2 text-gray-600">{{ uploadText }}</div>
    </div>
  </a-upload>

  <a-modal
    v-model:open="previewVisible"
    :footer="null"
    @cancel="handleCancel"
    :width="'400px'"
    centered
  >
    <img :src="previewImage" alt="preview" class="w-full" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type { UploadFile } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useImage } from "@/presentation/composables/useImage";
const {
    loading,
    // fileList,
    previewVisible,
    previewImage,
    // previewTitle,
    handlePreview,
    // handleChange,
    handleCancel
} = useImage();
const { t } = useI18n();

const props = defineProps<{
  modelValue?: UploadFile[];
  maxCount?: number;
  uploadText?: string;
  initialUrl?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: UploadFile[]): void;
  (e: "uploaded", file: UploadFile): void;
}>();

const internalFileList = ref<UploadFile[]>(props.modelValue || []);

watch(
  () => props.modelValue,
  (val) => (internalFileList.value = val || [])
);

if (props.initialUrl) {
  internalFileList.value = [
    {
      uid: "-1",
      name: "file.png",
      status: "done",
      url: props.initialUrl,
    },
  ];
}

const maxCount = computed(() => props.maxCount || 1);
const uploadText = computed(() => props.uploadText || t("upload"));

const beforeUploadWrapper = (file: UploadFile) => {
  emit("uploaded", file);
  return false;
};

const handleChangeWrapper = (info: {
  file: UploadFile;
  fileList: UploadFile[];
}) => {
  internalFileList.value = info.fileList;
  // create(internalFileList.value.);
};
</script>

<style scoped>
.ant-upload-list-picture-card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
}
</style>
