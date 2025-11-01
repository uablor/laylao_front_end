import { ref } from "vue";
import { message } from "ant-design-vue";
import type { UploadFile } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { CreateImagesCredentialsDto } from "@/application/dto/image.dto";
export function useImage() {
  const { t } = useI18n();
  const loading = ref(false);
  const fileList = ref<UploadFile[]>([]); 
  const previewVisible = ref(false);
  const previewImage = ref("");
  const previewTitle = ref("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    previewImage.value = file.url || file.preview!;
    previewTitle.value = file.name || file.url?.split("/").pop() || "";
    previewVisible.value = true;
  };

  const handleChange = (info: { file: UploadFile; fileList: UploadFile[] }) => {
    fileList.value = info.fileList;
    const status = info.file.status;
    if (status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  const handleCancel = () => {
    previewVisible.value = false;
    previewImage.value = "";
    previewTitle.value = "";
  };

  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  
  const create = async (_credentials: CreateImagesCredentialsDto) => {
    try {
      loading.value = true;

    } catch (err) {
      message.error(t("hotel_create_failed"));
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleted = async (_number: number) => {
    try {
      loading.value = true;
     
    } catch (err) {
      message.error(t("hotel_update_failed"));
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    fileList,
    previewVisible,
    previewImage,
    previewTitle,
    handlePreview,
    handleChange,
    handleCancel,
    create,
    deleted
  };
}
