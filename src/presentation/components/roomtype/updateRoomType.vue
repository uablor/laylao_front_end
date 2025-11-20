<template>
  <a-drawer
    :title="$t('edit')"
    :width="520"
    :open="open_edit"
    :maskClosable="false"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <template #title>
      <div class="text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <a-divider />
          <span
            class="text-sm font-semibold text-gray-400 uppercase tracking-wider"
          >
            {{ $t("edit") }}
          </span>
          <a-divider />
        </div>
      </div>
    </template>

    <a-form
      layout="vertical"
      ref="formRef"
      :model="formState"
      :rules="RoomTypeRule"
      @finish="onSubmit"
      :loading="loadingRoomType"
    >
      <a-row gutter="[16,16]">
        <a-col :span="24">
          <FormInputString
            label="name"
            type="text"
            v-model="formState.name"
            :placeholder="$t('name') + ' ' + $t('roomtype')"
          />
        </a-col>
        <a-col :xs="24">
          {{ $t("images") }}
          <a-upload
            name="images"
            list-type="picture-card"
            title="ກຳລັງໂຫຼດຮູບ"
            class="p-2"
            multiple
            :before-upload="beforeUpload"
            :file-list="fileList"
            :show-upload-list="true"
            @change="handleChange"
            @remove="onRemove"
            :custom-request="customRequest"
          >
            <div>
              <LoadingOutlined v-if="loading_image" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">ອັບໂຫຼດຮູບ</div>
            </div>
          </a-upload>
        </a-col>

        <a-col :span="24">
          <div class="flex justify-end gap-2 mt-2">
            <BaseButton @click="onClose">{{ $t("cancel") }}</BaseButton>
            <BaseButton
              type="primary"
              htmlType="submit"
              :loading="loadingRoomType"
            >
              {{ $t("save") }}
            </BaseButton>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import FormInputString from "@/components/Base/BaseComponents/FormInputString.vue";
import { ref, computed, watch } from "vue";
import { useRoomType } from "@/presentation/composables/useRoomType";
import type { RoomType_hotel_id } from "@/domain/entities/roomtype.entity";
import { RoomTypeRule } from "@/presentation/validator/RoomType";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { storeToRefs } from "pinia";
import { useImage } from "@/presentation/composables/useImage";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import { UpdateRoomTypeCredentialsDto } from "@/application/dto/roomtype.dto";
import { useImageStore } from "@/presentation/stores/image.store";
import { useAuthStore } from "@/presentation/stores/auth.store";

const { beforeUpload, customRequest, handleChange, onRemove } = useImage();

const { loading_image, fileList, images } = storeToRefs(useImageStore());
const {  authme } = storeToRefs(useAuthStore());
const route = useRoute();
const formRef = ref();
const { updateRoomType } = useRoomType();

const { formState, open_edit, loading, RoomTypeList } = storeToRefs(
  useroomTypeStore()
);
const loadingRoomType = loading;
const isDetailHotelRoute = computed(
  () => route.name === "admin.detailhotel" && route.params.id
);

const currentHotelId = computed(() =>
  isDetailHotelRoute.value
    ? Number(route.params.id)
    : authme.value?.hotels?.[0]?.id
);

const clear = () => {
  formState.value.id = 0;
  formState.value.name = "";
  formState.value.hotel_id = currentHotelId.value || 0;
  formState.value.images = [];
  formState.value.image_ids = [];
  fileList.value = [];
  images.value = [];
};

const loadImages = (value: RoomType_hotel_id) => {
  images.value = value.images || [];
  fileList.value =
    value.images?.map((img) => ({
      uid: String(img.id),
      name: img.url.split("/").pop() || `image-${img.id}`,
      status: "done",
      url:  img.url,
    })) || [];
};

watch(
  () => open_edit.value,
  (value) => {
    if (value) {
      formState.value.hotel_id = currentHotelId.value || 0;

      loadImages(formState.value);
    } else {
      clear();
      fileList.value = [];
    }
  },
  { immediate: true }
);

const onClose = () => {
  if (formState.value.images?.length != images.value.length) {
    RoomTypeList.value.data = RoomTypeList.value.data.map((r) => {
      if (r.id == formState.value.id) {
        return {
          ...r,
          images: images.value,
        };
      }
      return r;
    });
  }
  formRef.value?.resetFields();
  clear();
  open_edit.value = false;
};

const onSubmit = async () => {
  const existingImageIds = formState.value.images?.map((img) => img.id) || [];
  console.log("formState sadf", existingImageIds);
  const newImageIds = images.value
    .filter((img) => !existingImageIds.includes(img.id))
    .map((img) => img.id);
  const allImageIds = [...new Set([...existingImageIds, ...newImageIds])];

  if (currentHotelId.value) {
    formState.value.hotel_id = currentHotelId.value;
  }

  const payload: UpdateRoomTypeCredentialsDto = {
    name: formState.value.name,
    hotel_id: formState.value.hotel_id,
    id: formState.value.id,
    image_ids: allImageIds,
  };
  await updateRoomType(payload);

  // if (currentHotelId.value) {
  //   await findAllRoomType(currentHotelId.value);
  // }

  onClose();
};
</script>
