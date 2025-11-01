<template>
  <a-drawer
    :title="props.data ? $t('edit') : $t('add')"
    :width="520"
    :open="props.open"
    :maskClosable="false"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      layout="vertical"
      ref="formRef"
      :model="formState"
      :rules="HotelRule"
      :hideRequiredMark="true"
      class="bg-white p-6 space-y-6"
      @finish="onSubmit"
    >
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :lg="12">
          <form-input-string
            label="name"
            name="name"
            v-model="formState.name"
            :placeholder="$t('name') + ' ' + $t('hotel')"
            type="text"
            :prefix="HomeOutlined"
          />
        </a-col>

        <a-col :xs="24" :lg="12">
          <form-input-string
            label="email_hotel"
            name="email_hotel"
            v-model="formState.email_hotel"
            :placeholder="$t('email_hotel') + ' ' + $t('hotel')"
            type="text"
            :prefix="MailOutlined"
          />
        </a-col>

        <a-col :xs="24" :lg="12">
          <base-select
            v-model="formState.zone_id"
            name="zone_id"
            :label="`${$t('zone')}`"
            :options="
              zoneAll.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            "
            :placeholder="$t('district') + ' ' + $t('hotel')"
          />
        </a-col>

        <a-col :xs="24" :lg="12" v-if="!formState.id">
          <form-input-string
            label="password"
            name="password"
            v-model="formState.password"
            :placeholder="$t('password') + ' ' + $t('hotel')"
            type="password"
            :prefix="UserOutlined"
          />
        </a-col>

        <a-col :xs="24" :lg="12">
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

        <a-col :xs="24" :sm="12">
          <form-input-string
            v-model="formState.tel"
            label="tel"
            name="tel"
            :placeholder="$t('tel') + ' ' + $t('hotel')"
            type="text"
            :prefix="PhoneOutlined"
          />
        </a-col>

        <a-col :xs="24">
          <form-input-string
            label="address"
            v-model="formState.address"
            :placeholder="$t('address') + ' ' + $t('hotel')"
            :type="'textarea'"
            :rows="3"
            :prefix="HomeOutlined"
          />
        </a-col>

        <a-col :xs="24">
          <form-input-string
            label="location"
            v-model="formState.location"
            :placeholder="$t('location') + ' ' + $t('hotel')"
            :type="'textarea'"
            :prefix="EnvironmentFilled"
            :rows="3"
          />
        </a-col>
        <a-col :xs="24">
          {{ $t("logo") }}
          <a-upload
            name="image"
            list-type="picture-card"
            class="p-2"
            :show-upload-list="false"
            :customRequest="uploadImage"
            :before-upload="beforeUpload"
          >
            <img
              v-if="formState.logo"
              class="w-full h-full object-cover"
              :src="'https://laylaos-production.up.railway.app' + formState.logo"
              alt="avatar"
            />
            <div v-else>
              <LoadingOutlined v-if="loading_image" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">ອັບໂຫຼດ ໂລໂກ້</div>
            </div>
          </a-upload>
        </a-col>
      </a-row>

      <!-- ปุ่ม -->
      <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
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
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useHotel } from "@/presentation/composables/useHotel";
import { HotelRule } from "@/presentation/validator/HotelRule";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { useZone } from "@/presentation/composables/useZone";
import {
  AppstoreOutlined,
  EnvironmentFilled,
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Hotel, Hotel_Password } from "@/domain/entities/hotel.entity";
import FormInputString from "@/components/FormInputString.vue";
import BaseInputNumber from "@/components/BaseInputNumber.vue";
import { message } from "ant-design-vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps<{ open: boolean; data: Hotel | null }>();
const emit = defineEmits(["isOpen", "onSaved"]);
const { zoneAll, findAll } = useZone();

const currentStep = ref(0);

const formRef = ref();
const { createHotel, updateHotel, loading } = useHotel();
const onClose = () => {
  clear();
  emit("isOpen", false);
};
const formState = reactive<Hotel_Password>({
  id: 0,
  name: "",
  logo: "",
  address: "",
  location: "",
  tel: "",
  password: "",
  email_hotel: "",
  createdAt: "",
  updatedAt: "",
  floor: 0,
  zone_id: 0,
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
    createdAt: "",
    updatedAt: "",
    floor: 0,
  });
};

watch(
  () => props.data,
  (value) => {
    if (value) {
      Object.assign(formState, value);
      formState.zone_id = value.zone.id;
    } else {
      clear();
    }
    currentStep.value = 0;
  },
  { immediate: true }
);

const onSubmit = async () => {
  if (props.data) {
    const { password, createdAt, zone_id, updatedAt, ...rest } = formState;
    await updateHotel(rest);
    clear();
    onClose();
  } else {
    const { createdAt, updatedAt, id, ...rest } = formState;
    await createHotel(rest);
    clear();
    onClose();
  }
};

onMounted(() => {
  findAll();
});

const loading_image = ref<boolean>(false);
const uploadImage = async (options: any) => {
  const { file, onSuccess } = options;
  loading_image.value = true;
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://laylaos-production.up.railway.app/api/hotels/upload-images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    formState.logo = response.data.url[0];
    message.success(t("success"));
    onSuccess(response.data);
  } catch (error) {
    message.error(`${t("cannot upload image")}`);
    message.info(`${t("please change image")}`);
  } finally {
    loading_image.value = false;
  }
};

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("You can only upload image file!");
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
