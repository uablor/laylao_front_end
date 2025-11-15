<template>
  <a-drawer
    :title="data ? $t('edit') : $t('add')"
    :width="520"
    :open="localOpen"
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
            {{ props.data ? $t("edit") : $t("add") }}
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
              RoomTypeAll.map((item) => ({
                label: item.name,
                value: item.id,
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
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useRoom } from "@/presentation/composables/useRoom";
import { Room, Room_ID } from "@/domain/entities/room.entity";
import { message, type UploadFile } from "ant-design-vue";
import { RoomRule } from "@/presentation/validator/RoomRole";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import BaseInputNumber from "@/components/Base/BaseComponents/BaseInputNumber.vue";
import BaseSelect from "@/components/Base/BaseComponents/BaseSelect.vue";
import { storeToRefs } from "pinia";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import { useRoomType } from "@/presentation/composables/useRoomType";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
const { t } = useI18n();
const props = defineProps<{ open: boolean; data: Room | null }>();
const emit = defineEmits(["isOpen", "onSaved"]);
const { RoomTypeAll } = storeToRefs(useroomTypeStore());
const formRef = ref();
const { createRoom, updateRoom, loading } = useRoom();
const { findAllRoomType } = useRoomType();

const loadingRoom = loading;
const route = useRoute();
const formState = reactive<Room_ID>({
  id: 0,
  room_number: "",
  name: "",
  price: 0,
  brokerage_fees: 0,
  floor: 0,
  description: "",
  room_amenities: "",
  room_type_id: "",
  hotel_id: 0,
});

const roomFileList = ref<UploadFile[]>([]);

const priceDisplay = computed(() => formState.price.toLocaleString());
const brokerageFeesDisplay = computed(() =>
  formState.brokerage_fees.toLocaleString()
);

function onPriceChange(val: string | number | null) {
  const num = Number(String(val).replace(/,/g, ""));
  formState.price = isNaN(num) ? 0 : num;
}

function onBrokerageChange(val: string | number | null) {
  const num = Number(String(val).replace(/,/g, ""));
  formState.brokerage_fees = isNaN(num) ? 0 : num;
}
const localOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit("isOpen", val),
});

watch(
  () => props.data,
  (value) => {
    if (value) {
      Object.assign(formState, value);
      formState.room_type_id = value.room_type.id;
    } else {
      Object.assign(formState, {
        id: 0,
        room_number: "",
        name: "",
        price: 0,
        brokerage_fees: 0,
        floor: 0,
        description: "",
        room_amenities: "",
        room_type_id: 0,
        hotel_id: 0,
      });
      roomFileList.value = [];
    }
  },
  { immediate: true }
);

const onClose = () => {
  formRef.value?.resetFields();
  roomFileList.value = [];
  emit("isOpen", false);
};

const onSubmit = async () => {
  try {
    if (!formRef.value) return;
    if (
      formState.room_type_id === "" ||
      formState.room_type_id === null ||
      formState.room_type_id === undefined ||
      formState.room_type_id === 0
    ) {
      message.error(t("not_empty") + t("room_type"));
      return;
    }
    if (props.data) {
      await updateRoom(formState);
      if (route.name === "admin.detailhotel" && route.params.id) {
        await findAllRoomType(Number(route.params.id));
      }
    } else {
      await createRoom(formState);
    }
    emit("onSaved");
    onClose();
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  if (route.name === "admin.detailhotel" && route.params.id) {
    findAllRoomType(Number(route.params.id));
  } else {
    findAllRoomType();
  }
});
</script>
