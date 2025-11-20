<template>
  <a-drawer
    :title="$t('add')"
    :width="520"
    :open="open_create"
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
            {{ $t("add") }}
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

          <!-- <a-button 
            v-if="pendingFiles.length > 0"
            type="primary" 
            :loading="loading_image"
            @click="uploadAllFiles"
            class="mt-2"
          >
            {{ $t("upload") }} ({{ pendingFiles.length }} {{ $t("files") }})
          </a-button> -->
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
import { RoomTypeRule } from "@/presentation/validator/RoomType";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { storeToRefs } from "pinia";
import { useImage } from "@/presentation/composables/useImage";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import { useHotel } from "@/presentation/composables/useHotel";
import { CreateRoomTypeCredentialsDto } from "@/application/dto/roomtype.dto";
import { useImageStore } from "@/presentation/stores/image.store";
import { useAuthStore } from "@/presentation/stores/auth.store";

const { beforeUpload, customRequest, handleChange, onRemove } = useImage();
const { loading_image, fileList, images } = storeToRefs(useImageStore());
const route = useRoute();
const formRef = ref();
const { createRoomType } = useRoomType();
const { findOneHotelDetails } = useHotel();
const {  authme } = storeToRefs(useAuthStore());
const { formState, open_create, loading } = storeToRefs(useroomTypeStore());
const loadingRoomType = loading;
const isDetailHotelRoute = computed(
  () => route.name === "admin.detailhotel" && route.params.id
);

const currentHotelId = computed(() =>
  isDetailHotelRoute.value ? Number(route.params.id) : authme.value?.hotels?.[0]?.id
);

const clear = () => {
  Object.assign(formState, {
    id: 0,
    name: "",
    hotel_id: currentHotelId.value || 0,
    images: [],
    image_ids: [],
  });
  fileList.value = [];
  images.value = [];
};

watch(
  () => open_create.value,
  (isOpen) => {
    if (isOpen) {
      if (currentHotelId.value) {
        formState.value.hotel_id = currentHotelId.value;
      }
    } else {
      clear();
    }
  }
);

const onClose = () => {
  formRef.value?.resetFields();
  clear();
  open_create.value = false;
};

const onSubmit = async () => {
  try {
    const newImageIds = images.value.map((item) => item.id);

    if (currentHotelId.value) {
      formState.value.hotel_id = currentHotelId.value;
    }

    const { id, createdAt, updatedAt, images: imgs, ...rest } = formState.value;
    const payload: CreateRoomTypeCredentialsDto = {
      ...rest,
      image_ids: newImageIds,
    };
    await createRoomType(payload);
    currentHotelId.value ? findOneHotelDetails(currentHotelId.value) : null;
    onClose();
  } catch (error) {
    console.error("Error creating room type:", error);
  }
};
</script>
