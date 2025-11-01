<template>
  <a-form-item :name="props.name">
    <div class="flex items-center gap-2 w-full">
      <!-- Label -->
      <label
        v-if="props.label"
        class="text-sm flex justify-end font-medium text-gray-700" :class="`w-${size_w}`"
      >
        {{ $t(props.label) }}
      </label>

      <!-- Select wrapper -->
      <div class="flex-1">
        <a-select
          v-model:value="selectValue"
          :options="props.options"
          :placeholder="$t(props.placeholder ?? '')"
          class="w-full"
          @change="onChange"
        >
          <template #prefix>
            <component v-if="prefix" :is="prefix" class="mr-1" />
          </template>

          <template #suffix>
            <component v-if="suffix" :is="suffix" />
          </template>
        </a-select>
      </div>
    </div>
  </a-form-item>
</template>

<script setup lang="ts">
import { type Component, computed } from "vue";

export interface Option {
  value: string | number;
  label: string;
}
const props = defineProps<{
  modelValue: string | number | null;
  name: string;
  options: Option[];
  prefix?: Component | null;
  suffix?: Component | null;
  label?: string;
  placeholder?: string;
  size_w: string
}>();
const selectValue = computed({
  get() {
    if (props.modelValue === null || props.modelValue === undefined || props.modelValue === 0) {
      return "";
    }
    return props.modelValue;
  },
  set(value: string | number) {
    console.log(value);
    emit("update:modelValue", value);
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
const onChange = (value: string | number) => {
  emit("update:modelValue", value);
};
</script>

<style scoped>
/* optional: custom style */
</style>
