<template>
  <a-modal
    v-model:open="localOpen"
    :footer="null"
    @cancel="onClose"
    width="400px"
    centered
    body-style="{ padding: '24px' }"
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
      @finish="onSubmit"
      :loading="loadingZone"
      class="space-y-4"
    >
      <FormInputString
        label="name"
        v-model="formState.name"
        :placeholder="$t('name')"
        :prefix="EnvironmentFilled"
        
      />

      <div class="flex justify-end gap-3 mt-4">
        <BaseButton
          @click="onClose"
          class="bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          {{ $t("cancel") }}
        </BaseButton>
        <BaseButton type="primary" htmlType="submit" :loading="loadingZone">
          {{ $t("save") }}
        </BaseButton>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import FormInputString from "@/components/Base/BaseComponents/FormInputString.vue";
import { reactive, ref, computed, watch, onMounted } from "vue";
import { useZone } from "@/presentation/composables/useZone";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { Zone } from "@/domain/entities/zone.entity";
import { EnvironmentFilled } from "@ant-design/icons-vue";

const props = defineProps<{ open: boolean; data: Zone | null }>();
const emit = defineEmits(["isOpen", "onSaved"]);

const formRef = ref();
const { createZone, updateZone, loading } = useZone();
const loadingZone = loading;

const formState = reactive<Zone>({
  id: 0,
  name: "",
  createdAt: "",
  updatedAt: "",
});

const localOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit("isOpen", val),
});

watch(
  () =>props.open,
  (value) => {
    if (value) Object.assign(formState, props.data || {});
    else Object.assign(formState, { id: "", name: "", description: "" });
  },
  { immediate: true }
);

const onClose = () => {
  formRef.value?.resetFields();
  emit("isOpen", false);
};

const onSubmit = async () => {
  try {
    if (props.data) await updateZone(formState);
    else {
      const { id, createdAt, updatedAt, ...rest } = formState;
      await createZone(rest);
    }
    emit("onSaved");
    onClose();
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  // await Promise.all([fetchDistrictList(), fetchProvinceList()]);
});
</script>
