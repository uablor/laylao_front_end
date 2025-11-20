<template>
  <div class="h-full w-full p-4 px-10 flex">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" :tab="$t('information')">
        <div class="mt-5">
          <a-form
            ref="formRef"
            :model="formState"
            :rules="HotelRule"
            :hideRequiredMark="true"
            layout="vertical"
            class="bg-white p-6 space-y-6"
            @finish="onSubmit"
          >
            <a-row :gutter="[24, 16]">
              <a-col :span="24">
                {{ $t("logo") }}
                <a-upload
                  name="logo"
                  list-type="picture-card"
                  class="p-2"
                  :custom-request="uploadImage"
                  :before-upload="beforeUploadLogo"
                  :max-count="1"
                  :file-list="logoFile"
                  @preview="handlePreview"
                  :show-upload-list="true"
                  @remove="(file : UploadFile) => onRemove(file, 'image')"
                >
                  <div v-if="!logoFile.length">
                    <LoadingOutlined v-if="loading_one" />
                    <PlusOutlined v-else />
                    <div class="ant-upload-text">ອັບໂຫຼດໂລໂກ້</div>
                  </div>
                </a-upload>
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
                  @remove="(file : UploadFile) => onRemove(file, 'images')"
                  :custom-request="customRequest"
                >
                  <div>
                    <LoadingOutlined v-if="loading_image" />
                    <PlusOutlined v-else />
                    <div class="ant-upload-text">ອັບໂຫຼດຮູບ</div>
                  </div>
                </a-upload>
                <a-modal
                  :open="previewVisible"
                  :title="previewTitle"
                  :footer="null"
                  @cancel="handleCancel"
                >
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-col>
              <a-col :xs="24" :md="8">
                <form-input-string
                  label="name"
                  name="name"
                  v-model="formState.name"
                  :placeholder="$t('name') + ' ' + $t('hotel')"
                  type="text"
                  :prefix="HomeOutlined"
                />
              </a-col>

              <a-col :xs="24" :md="8">
                <form-input-string
                  label="email_hotel"
                  name="email_hotel"
                  v-model="formState.email_hotel"
                  :placeholder="$t('email_hotel') + ' ' + $t('hotel')"
                  type="text"
                  :prefix="MailOutlined"
                />
              </a-col>

              <a-col :xs="24" :md="8" v-if="!formState.id">
                <form-input-string
                  label="password"
                  name="password"
                  v-model="formState.password"
                  :placeholder="$t('password') + ' ' + $t('hotel')"
                  type="password"
                  :prefix="UserOutlined"
                />
              </a-col>

              <a-col :xs="24" :md="8">
                <base-select
                  v-model="formState.zone_id"
                  name="zone_id"
                  :placeholder="$t('zone') + ' ' + $t('hotel')"
                  :label="`${$t('zone')}`"
                  :options="
                    zoneAll.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  "
                />
              </a-col>

              <a-col :xs="24" :md="8">
                <base-input-number
                  v-model="formState.floor"
                  name="floor"
                  :label="$t('floor') + ' ' + $t('hotel')"
                  :min="0"
                  :step="1"
                  size="middle"
                  :prefix="AppstoreOutlined"
                />
              </a-col>

              <a-col :xs="24" :sm="8">
                <form-input-string
                  v-model="formState.tel"
                  label="tel"
                  name="tel"
                  :placeholder="$t('tel') + ' ' + $t('hotel')"
                  type="text"
                  :prefix="PhoneOutlined"
                />
              </a-col>
              <a-col :xs="24" :sm="8">
                <a-form-item
                  :label="$t('time_open_close')"
                  :rules="HotelRule.start_end"
                >
                  <div class="flex items-center w-full gap-2">
                    <a-time-picker
                      v-model:value="formState.start_time"
                      value-format="HH:mm"
                      format="HH:mm"
                      style="flex: 1"
                      :placeholder="$t('time_open')"
                    />
                    <a-span>~</a-span>
                    <a-time-picker
                      v-model:value="formState.end_time"
                      value-format="HH:mm"
                      format="HH:mm"
                      :placeholder="$t('time_close')"
                      style="flex: 1"
                    />
                  </div>
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="formState.id ? 24 : 16">
                <form-input-string
                  label="address"
                  v-model="formState.address"
                  :placeholder="$t('address') + ' ' + $t('hotel')"
                  :type="'text'"
                  :rows="3"
                  :prefix="HomeOutlined"
                />
              </a-col>
              <div class="flex flex-col w-full my-3" style="height: 650px">
                <PickMap
                  class="flex-1"
                  :modelValueLat="formState.latitude"
                  :modelValueLng="formState.longitude"
                  @update:modelValueLat="formState.latitude = $event"
                  @update:modelValueLng="formState.longitude = $event"
                  :googleMapsApiKey="baseEnv.VITE_GOOGLE_MAPS_API_KEY"
                />
              </div>
              <div class="flex justify-end gap-3 border-gray-100 my-5 w-full">
                <BaseButton
                  type="default"
                  size="middle"
                  customClass="px-8 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  @click="onClose"
                >
                  {{ $t("cancel") }}
                </BaseButton>

                <BaseButton
                  type="primary"
                  size="middle"
                  html-type="submit"
                  :loading="loading"
                  customClass="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {{ $t("save") }}
                </BaseButton>
              </div>
            </a-row>
          </a-form>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useHotel } from "@/presentation/composables/useHotel";
import { HotelRule } from "@/presentation/validator/HotelRule";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import BaseSelect from "@/components/Base/BaseComponents/BaseSelect.vue";
import { useZone } from "@/presentation/composables/useZone";
import {
  AppstoreOutlined,
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Hotel_Password } from "@/domain/entities/hotel.entity";
import FormInputString from "@/components/Base/BaseComponents/FormInputString.vue";
import BaseInputNumber from "@/components/Base/BaseComponents/BaseInputNumber.vue";
import { useI18n } from "vue-i18n";
import { useImage } from "@/presentation/composables/useImage";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import { storeToRefs } from "pinia";
import PickMap from "@/components/ui/PickMap.vue";
import { useRoute, useRouter } from "vue-router";
import { message, UploadFile } from "ant-design-vue";
import { baseEnv } from "@/base.env";
import { useImageStore } from "@/presentation/stores/image.store";
import {
  CreateHotelCredentialsDto,
  UpdateHotelCredentialsDto,
} from "@/application/dto/hotel.dto";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { useAuthStore } from "@/presentation/stores/auth.store";
const route = useRoute();
const {
  beforeUpload,
  customRequest,
  handleChange,
  onRemove,
  handlePreview,
  uploadImage,
  handleCancel,
  beforeUploadLogo,
} = useImage();
const {
  logoFile,
  loading_image,
  fileList,
  images,
  previewVisible,
  previewImage,
  previewTitle,
  loading_one,
} = storeToRefs(useImageStore());
const { rolesArray, authme } = storeToRefs(useAuthStore());
const router = useRouter();
const { t } = useI18n();
const { selectedHotel } = storeToRefs(useHotelStore());
const emit = defineEmits(["isOpen", "onSaved"]);
const { zoneAll, findAll } = useZone();
const error = ref<string>("");
const currentStep = ref(0);
const activeKey = ref("1");
const formRef = ref();
const { createHotel, updateHotel, loading, fetchHotel } = useHotel();
const onClose = () => {
  clear();
  router.go(-1);
};
const formState = reactive<Hotel_Password>({
  id: 0,
  name: "",
  logo: "" as any,
  logo_id: 0,
  address: "",
  end_time: "",
  start_time: "",
  tel: "",
  password: "",
  email_hotel: "",
  createdAt: "",
  updatedAt: "",
  floor: 0,
  zone_id: 0,
  image_ids: [],
  latitude: 0,
  longitude: 0,
});
const clear = () => {
  Object.assign(formState, {
    id: 0,
    name: "",
    logo: "",
    address: "",
    location: "",
    tel: "",
    password: "",
    email_hotel: "",
    images: [],
    image_ids: [],
    createdAt: "",
    updatedAt: "",
    floor: 0,
  });
  fileList.value = [];
  logoFile.value = [];
};

watch(
  () => selectedHotel.value,
  (newValue) => {
    if (newValue) {
      Object.assign(formState, newValue);
      formState.zone_id = newValue.zone?.id || 0;

      fileList.value =
        newValue.images?.map((img) => ({
          uid: String(img.id),
          name: img.url,
          status: "done",
          url: img.url,
        })) || [];

      logoFile.value = newValue.logo
        ? [
            {
              uid: String(newValue.logo.id),
              name: newValue.logo.url.split("/").pop() || "",
              status: "done",
              url: newValue.logo.url,
            },
          ]
        : [];
    } else {
      clear();
    }
    currentStep.value = 0;
  },
  { immediate: true }
);

const onSubmit = async () => {
  if (!(await formRef.value.validate())) {
    message.info(t("not_empty"));
    return;
  }
  if (!formState.latitude || !formState.longitude) {
    error.value = t("not_empty") + t("location");
  }
  const image_ids = images.value.map((item) => item.id);
  if (selectedHotel.value) {
    const { password, createdAt, updatedAt, images, room_types, ...rest } =
      formState;
    const payload: UpdateHotelCredentialsDto = {
      ...rest,
      logo_id: logoFile.value[0]?.uid || "",
      image_ids: image_ids,
    };

    await updateHotel(payload);
    clear();
    onClose();
  } else {
    const { createdAt, updatedAt, id, ...rest } = formState;
    const payload: CreateHotelCredentialsDto = {
      ...rest,
      logo_id: logoFile.value[0]?.uid || formState.logo.id,
      image_ids: image_ids,
    };
    await createHotel(payload);
    clear();
    onClose();
  }
};

onMounted(() => {
  if (
    (route.name === "admin.managehotel" && route.query.id) ||
    route.name === "admin-hotel.managehotel"
  ) {
    if (
      rolesArray.value.includes(BaseRole.USER_HOTEL) ||
      rolesArray.value.includes(BaseRole.ADMIN_HOTEL)
    ) {
      fetchHotel(Number(authme.value?.hotels?.[0]?.id));
    } else {
      fetchHotel(Number(route.query.id));
    }
  }

  findAll();
});
</script>

<style scoped></style>
