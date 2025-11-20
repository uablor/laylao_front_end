<template>
  <a-drawer
    :width="550"
    :open="props.open"
    :maskClosable="false"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <template #title>
      <div class="flex justify-between items-center">
        <span>{{ $t("booking") }}</span>
        <div class="flex justify-end items-center gap-1">
          <a-tag color="red" class="text-sm text-red-500">
            {{ $t("time_open_close") }}:
            <FieldTimeOutlined />
            {{ roomAll[0]?.hotel.start_time || $t("unknown") }} -
            {{ roomAll[0]?.hotel.end_time || $t("unknown") }}
          </a-tag>
        </div>
      </div>
    </template>

    <a-form layout="vertical" ref="formRef" :model="booking">
      <a-row :gutter="[24, 16]">
        <a-col :xs="12" :lg="12">
          <a-form-item
            :label="$t('customer_name')"
            name="customer_name"
            :rules="[
              {
                required: true,
                message: $t('not_empty') + $t('customer_name'),
                trigger: 'blur',
              },
            ]"
          >
            <a-input
              v-model:value="booking.customer_name"
              :placeholder="$t('customer_name')"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="12" :lg="12">
          <a-form-item
            :label="$t('customer_tel')"
            name="customer_tel"
            :rules="[
              {
                required: true,
                message: $t('not_empty') + $t('customer_tel'),
                trigger: 'blur',
              },
              {
                pattern: /^[0-9]{8,15}$/,
                message: $t('invalid_tel'),
                trigger: 'blur',
              },
            ]"
          >
            <a-input
              v-model:value="booking.customer_tel"
              :placeholder="$t('customer_tel')"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <div
        v-if="booking.rooms.length === 0"
        class="text-center py-8 text-gray-400 border border-dashed border-gray-300 rounded-lg my-4"
      >
        {{ $t("please add rooms") }}
      </div>

      <div
        v-for="(room, index) in booking.rooms"
        :key="index"
        class="border border-gray-200 rounded-lg p-4 mb-4 relative"
      >
        <button
          type="button"
          @click="removeRoom(index)"
          class="absolute top-2 right-2 hover:text-red-500 transition-colors"
        >
          <CloseOutlined />
        </button>

        <div class="font-medium text-gray-600 mb-3 my-2">
          <div>
            {{ getRoomData(room.room_id)?.name || $t("unknown_room") }}
            <a-span>
              {{ $t("room_number") }}
              {{ getRoomData(room.room_id)?.room_number || "-" }}
            </a-span>
          </div>

          <a-tag color="green" class="text-sm text-gray-500">
            {{ $t("brokerage") }}:
            {{
              getRoomData(room.room_id)?.brokerage_fees?.toLocaleString() || "0"
            }}
            ₭
          </a-tag>
          <a-tag color="blue" class="text-sm text-gray-500">
            {{ $t("price") }}:
            {{ getRoomData(room.room_id)?.price?.toLocaleString() || "0" }} ₭ /
            ຄືນ
          </a-tag>

          <a-tag color="orange" class="text-sm text-gray-500">
            {{ $t("price") + $t("total") }}:

            {{ roomsWithTotal[index]?.total?.toLocaleString() || "0" }} ₭
            {{ calculateDays(room.checkin_date, room.checkout_date) }} / ຄືນ
          </a-tag>
        </div>

        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item
              :name="['rooms', index, 'qty']"
              :label="$t('quantity')"
              :rules="[
                {
                  required: true,
                  message: $t('not_empty') + $t('quantity'),
                  trigger: 'blur',
                },
                {
                  type: 'number',
                  min: 1,
                  message: $t('min_quantity_1'),
                  trigger: 'blur',
                },
              ]"
            >
              <a-input-number
                v-model:value="room.qty"
                style="width: 100%"
                :min="1"
                :placeholder="$t('quantity')"
              />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item

              :name="['rooms', index, 'checkin_date']"
              :label="$t('checkin_date')"
              :rules="[
                {
                  required: true,
                  message: $t('please_select_checkin_date'),
                  trigger: 'change',
                },
              ]"
            >
              <a-date-picker
                v-model:value="room.checkin_date"
                style="width: 100%"
                format="DD/MM/YYYY"
                :placeholder="$t('select_date')"
                :disabled-date="(current:any) => disabledCheckinDate(current, index)"
                :disabled="props.renew" 
              />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item
              :name="['rooms', index, 'checkout_date']"
              :label="$t('checkout_date')"
              :rules="[
                { required: true, message: $t('please_select_checkout_date'), trigger: 'change' },
                { 
                  validator: (_rule:any, value:any) => validateCheckoutDate(value, index),
                  trigger: 'change'
                }
              ]"
            >
              <a-date-picker
                v-model:value="room.checkout_date"
                style="width: 100%"
                format="DD/MM/YYYY"
                :placeholder="$t('select_date')"
                :disabled-date="(current :any) => disabledCheckoutDate(current, index)"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>

      <div class="flex justify-end items-center gap-1">
        <a-tag color="green" class="text-sm text-gray-500">
          {{ $t("brokerage") + $t("total") }}:
          {{ totalBrokerage.toLocaleString() || "0" }} ₭
        </a-tag>

        <span class="text-gray-400 font-bold">+</span>

        <a-tag color="blue" class="text-sm text-gray-500">
          {{ $t("price") + $t("total") }}:
          {{ totalBookingPrice.toLocaleString() || "0" }} ₭
        </a-tag>

        <span class="text-gray-400 font-bold">=</span>

        <a-tag color="orange" class="text-sm text-gray-500">
          {{ $t("price") + $t("total") }}:
          {{ (totalBookingPrice + totalBrokerage).toLocaleString() || "0" }} ₭
        </a-tag>
      </div>
    </a-form>

    <div class="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
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
        :disabled="booking.rooms.length === 0"
        @click="onSubmit"
        customClass="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        {{ $t("save") }}
      </BaseButton>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { useBooking } from "@/presentation/composables/useBooking";
import { CloseOutlined, FieldTimeOutlined } from "@ant-design/icons-vue";
import dayjs, { Dayjs } from "dayjs";
import { useroomStore } from "@/presentation/stores/room.store";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { calculateDays } from "@/shared/utils/dayjs.util";

const formRef = ref();

const props = withDefaults(defineProps<{ open: boolean; renew?: boolean }>(), {
  open: false,
  renew: false,
});
const emit = defineEmits(["isOpen", "save"]);
const { loading, CreateBooking, booking } = useBooking();
const { roomAll } = storeToRefs(useroomStore());
const { t } = useI18n();
const getRoomData = (roomId: any) => {
  return roomAll.value.find((item) => item.id === roomId);
};

const validateCheckoutDate = (value: any, index: number) => {
  if (!value) {
    return Promise.reject(t("please_select_checkout_date"));
  }

  const checkinDate = booking.value.rooms[index]?.checkin_date;
  if (checkinDate) {
    const checkout = dayjs(value);
    const checkin = dayjs(checkinDate);

    if (checkout.isBefore(checkin) || checkout.isSame(checkin, "day")) {
      return Promise.reject(t("checkout_must_be_after_checkin"));
    }
  }

  return Promise.resolve();
};

const onSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate();

  const payload = {
    ...booking.value,
    rooms: booking.value.rooms.map((room: any) => ({
      ...room,
      checkin_date: room.checkin_date
        ? dayjs(room.checkin_date).format("YYYY-MM-DD")
        : null,
      checkout_date: room.checkout_date
        ? dayjs(room.checkout_date).format("YYYY-MM-DD")
        : null,
    })),
  };

  await CreateBooking(payload);
  emit("save", false);
  onClose();
};

const removeRoom = (index: number) => {
  booking.value.rooms.splice(index, 1);

  if (formRef.value) {
    formRef.value.clearValidate([`rooms.${index}`]);
  }
};

const disabledCheckinDate = (current: Dayjs, _index: number) => {
  return current && current < dayjs().startOf("day");
};

const disabledCheckoutDate = (current: Dayjs, index: number) => {
  const checkinDate = booking.value.rooms[index]?.checkin_date;
  if (!checkinDate) {
    return current && current < dayjs().startOf("day");
  }
  return current && current <= dayjs(checkinDate);
};

const onClose = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  booking.value.rooms = [];
  booking.value.customer_name = "";
  booking.value.customer_tel = "";
  emit("isOpen", false);
};

const roomsWithTotal = computed(() => {
  return booking.value.rooms.map((room) => {
    const roomInfo = getRoomData(room.room_id);
    if (roomInfo) {
      const days = calculateDays(room.checkin_date, room.checkout_date);
      return { ...room, total: days * roomInfo.price };
    }
    return { ...room, total: 0 };
  });
});

const totalBookingPrice = computed(() => {
  return roomsWithTotal.value.reduce((sum, room) => sum + (room.total || 0), 0);
});
const totalBrokerage = computed(() => {
  return booking.value.rooms.reduce((sum, room) => {
    const roomInfo = getRoomData(room.room_id);
    return sum + (roomInfo?.brokerage_fees || 0);
  }, 0);
});
</script>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}

:deep(.ant-form-item-explain-error) {
  font-size: 12px;
}
</style>
