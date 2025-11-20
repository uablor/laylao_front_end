import { message, UploadFile, UploadProps } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { ImageService } from "@/infrastructure/services/image.service";
import { handleApiError } from "@/shared/utils/error";
import { storeToRefs } from "pinia";
import { useImageStore } from "../stores/image.store";
import imageCompression from "browser-image-compression";

export function useImage() {
  const { t } = useI18n();
  const {
    images,
    fileList,
    loading_image,
    pendingFiles,
    logoFile,
    previewVisible,
    previewImage,
    previewTitle,
    loading_one,
  } = storeToRefs(useImageStore());

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error(t("only_image_allowed"));
      return false;
    }

    pendingFiles.value.push(file);
    return false;
  };
  const beforeUploadLogo = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error(t("only_image_allowed"));
      return false;
    }
    return true;
  };
  const uploadImage = async (options: any) => {
    const { file, onSuccess, onError } = options;
    loading_one.value = true;
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 2, 
      maxWidthOrHeight: 1920, 
      useWebWorker: true,
    });

    const formData = new FormData();
    formData.append("files", compressedFile);

    try {
      const res = await ImageService.createOne(formData);
      console.log(res);
      if (res.result && Array.isArray(res.result)) {
        const img = res.result[0];
        console.log(img);
        if (img) {
          logoFile.value = [
            {
              uid: String(img.id),
              name: img.url.split("/").pop() || "",
              status: "done",
              url:  img.url,
            },
          ];
        }
        onSuccess(res.result);
        message.success(t("success"));
      }
    } catch (error) {
      onError(error);
      message.error(t("cannot upload image"));
    } finally {
      loading_one.value = false;
    }
  };

  const uploadAllFiles = async () => {
    if (pendingFiles.value.length === 0) {
      message.error(t("no_files_to_upload"));
      return;
    }

    loading_image.value = true;

    try {
      const formData = new FormData();
      pendingFiles.value.forEach(async (file) => {
        formData.append(
          "files",
          await imageCompression(file, {
            maxSizeMB: 50, 
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          })
        );
      });

      const res = await ImageService.create(formData);

      if (res?.result && Array.isArray(res.result)) {
        res.result.forEach((img: any, index: number) => {
          images.value.push(img);

          const targetFile = fileList.value.find(
            (f) => f.name === pendingFiles.value[index]?.name
          );
          if (targetFile) {
            targetFile.uid = String(img.id);
            targetFile.status = "done";
            targetFile.url =  img.url;
          }
        });

        message.success(t("success"));
        pendingFiles.value = [];
      }
    } catch (err) {
      handleApiError(err, t);
    } finally {
      loading_image.value = false;
    }
  };
  const handleChange = ({ fileList: newFileList }: any) => {
    fileList.value = newFileList.filter(
      (f: UploadFile) => f.status !== "removed"
    );
  };
  const handleChangeLogo = ({ fileList: newFileList }: any) => {
    logoFile.value = newFileList.filter(
      (f: UploadFile) => f.status !== "removed"
    );
  };

  const customRequest = ({ onSuccess }: any) => onSuccess("ok");

  const onRemove = async (file: UploadFile, type: "image" | "images") => {
    try {
      if (type === "image") {
        loading_one.value = true;
      } else {
        loading_image.value = true;
      }
      pendingFiles.value = pendingFiles.value.filter(
        (f) => f.name !== file.name
      );
      const imageId = Number(file.uid);
      console.log(imageId);
      if (imageId) {
        await ImageService.delete(imageId);
        if (type === "image") {
          logoFile.value = logoFile.value.filter((f) => f.uid !== file.uid);
        } else {
          images.value = images.value.filter((img) => img.id !== imageId);
        }
      }
      if (type === "image") {
        logoFile.value = logoFile.value.filter((f) => f.uid !== file.uid);
      } else {
        fileList.value = fileList.value.filter((f) => f.uid !== file.uid);
      }
      message.success(t("delete") + t("success"));
    } catch (err) {
      console.error(err);
      message.error(t("delete") + t("failed"));
    } finally {
      loading_image.value = false;
      loading_one.value = false;
    }
  };

  const handlePreview = async (
    file: NonNullable<UploadProps["fileList"]>[number]
  ) => {
    if (!file.url && !file.preview) {
      if (!file.originFileObj) return; // ✔ กัน undefined
      file.preview = (await getBase64(file.originFileObj)) as string;
    }

    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
  };
  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = "";
  };

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  return {
    beforeUpload,
    uploadImage,
    uploadAllFiles,
    handleChange,
    onRemove,
    customRequest,
    handleChangeLogo,
    handlePreview,
    handleCancel,
    beforeUploadLogo,
  };
}
