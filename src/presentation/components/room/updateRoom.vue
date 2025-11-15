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
      :hideRequiredMark="true"
      layout="vertical"
      ref="formRef"
      :model="formState"
      :rules="RoomRule"
      @finish="onSubmit"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <form-input-string
            label="name"
            v-model="formState.name"
            :placeholder="$t('name')"
            :prefix="UserOutlined"
          />
        </a-col>

        <a-col :span="12">
          <form-input-string
            v-model="formState.room_number"
            label="room_number"
            :placeholder="$t('room_number')"
            type="text"
            :prefix="NumberOutlined"
          />
        </a-col>
        <a-col :span="12">
          <base-input-number
            v-model="priceDisplay"
            @update:model-value="onPriceChange"
            name="price"
            :label="$t('price') + ' ' + $t('room')"
            :min="0"
            :step="1000"
            size="middle"
            :prefix="DollarOutlined"
          />
        </a-col>
        <a-col :span="12">
          <base-input-number
            v-model="brokerageFeesDisplay"
            @update:model-value="onBrokerageChange"
            name="brokerage_fees"
            :label="$t('brokerage_fees') + ' ' + $t('room')"
            :min="0"
            :step="1000"
            size="middle"
            :prefix="DollarOutlined"
          />
        </a-col>
        <a-col :span="12">
          <base-input-number
            v-model="formState.floor"
            name="floor"
            :label="$t('floor') + ' ' + $t('room')"
            :min="1"
            :step="1"
            size="middle"
            :prefix="AppstoreOutlined"
          />
        </a-col>
        <a-col :span="12">
          <base-select
            v-model="formState.room_type_id"
            name="room_type_id"
            :label="$t('room_type')"
            :prefix="AppstoreOutlined"
            :options="
              RoomTypeList.data.map((item) => ({
                value: item.id,
                label: item.name,
              }))
            "
            :placeholder="$t('select_room_type')"
          />
        </a-col>
        <a-col :span="24">
          <form-input-string
            v-model="formState.room_amenities"
            label="room_amenities"
            :placeholder="$t('room_amenities')"
            type="textarea"
            :prefix="InfoCircleOutlined"
          />
        </a-col>
        <a-col :span="24">
          <form-input-string
            v-model="formState.description"
            label="description"
            :placeholder="$t('description')"
            type="textarea"
            :prefix="InfoCircleOutlined"
          />
        </a-col>
        <a-col :span="24">
          <div class="flex justify-end gap-2 mt-2">
            <BaseButton @click="onClose">{{ $t("cancel") }}</BaseButton>
            <BaseButton type="primary" htmlType="submit" :loading="loadingRoom">
              {{ $t("save") }}
            </BaseButton>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  NumberOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import FormInputString from "@/components/Base/BaseComponents/FormInputString.vue";
import { ref, computed } from "vue";
import { useRoom } from "@/presentation/composables/useRoom";
import { message, type UploadFile } from "ant-design-vue";
import { RoomRule } from "@/presentation/validator/RoomRole";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import BaseInputNumber from "@/components/Base/BaseComponents/BaseInputNumber.vue";
import BaseSelect from "@/components/Base/BaseComponents/BaseSelect.vue";
import { storeToRefs } from "pinia";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import { useI18n } from "vue-i18n";
import { useroomStore } from "@/presentation/stores/room.store";
const { t } = useI18n();
const { RoomTypeList } = storeToRefs(useroomTypeStore());
const formRef = ref();
const { updateRoom, loading } = useRoom();
const { formState, open_edit } = storeToRefs(useroomStore());

const loadingRoom = loading;
const roomFileList = ref<UploadFile[]>([]);

const priceDisplay = computed(() => formState.value.price.toLocaleString());
const brokerageFeesDisplay = computed(() =>
  formState.value.brokerage_fees.toLocaleString()
);

function onPriceChange(val: string | number | null) {
  const num = Number(String(val).replace(/,/g, ""));
  formState.value.price = isNaN(num) ? 0 : num;
}

function onBrokerageChange(val: string | number | null) {
  const num = Number(String(val).replace(/,/g, ""));
  formState.value.brokerage_fees = isNaN(num) ? 0 : num;
}

const onClose = () => {
  formRef.value?.resetFields();
  roomFileList.value = [];
  open_edit.value = false;
};

const onSubmit = async () => {
  try {
    if (!formRef.value) return;
    if (
      formState.value.room_type_id === "" ||
      formState.value.room_type_id === null ||
      formState.value.room_type_id === undefined ||
      formState.value.room_type_id === 0
    ) {
      message.error(t("not_empty") + t("room_type"));
      return;
    }
    const {hotel_id, ...rest} = formState.value
    await updateRoom(rest);
  } catch (err) {
    console.error(err);
  }

  onClose();
};
</script>
