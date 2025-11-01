<template>
  <a-modal
    v-model:open="localOpen"
    :footer="null"
    @cancel="onClose"
    width="400px"
    centered
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
  </a-modal>
</template>

<script setup lang="ts">
import FormInputString from "@/components/FormInputString.vue";
import { reactive, ref, computed, watch } from "vue";
import { useRoomType } from "@/presentation/composables/useRoomType";
import type { RoomType } from "@/domain/entities/roomtype.entity";
import { RoomTypeRule } from "@/presentation/validator/RoomType";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps<{ open: boolean; data: RoomType | null }>();
const emit = defineEmits(["isOpen", "onSaved"]);

const formRef = ref();
const { createRoomType, updateRoomType, loading } = useRoomType();
const loadingRoomType = loading;

// Reactive form state
const formState = reactive<RoomType>({
  id: 0,
  name: "",
  description: "",
});

// Modal open state
const localOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit("isOpen", val),
});

// Watch data for edit
watch(
  () => props.data,
  (value) => {
    if (value) {
      Object.assign(formState, value);
    } else {
      Object.assign(formState, { id: 0, name: "", description: "" });
    }
  },
  { immediate: true }
);

// Close modal
const onClose = () => {
  formRef.value?.resetFields();
  emit("isOpen", false);
};

// Submit form
const onSubmit = async () => {
  try {
    if (props.data) {
      await updateRoomType(formState);
    } else {
      await createRoomType(formState);
    }
    emit("onSaved");
    onClose();
  } catch (err) {
    console.error(err);
  }
};
</script>
