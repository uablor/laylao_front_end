<template>
  <a-form-item
    :label="props.label"
    :name="props.name"
  >
    <a-select
      v-model:value="selectValue"
      :options="props.options"
      :placeholder="props.placeholder"
      class="w-full"
      @change="onChange"
    >
      <template #prefix>
        <component v-if="prefix" :is="prefix" class="mr-1" />
      </template>

      <template #suffix>
        <component v-if="suffix" :is="suffix"></component>
      </template>
    </a-select>
  </a-form-item>
</template>

<script setup lang="ts">
import { type Rule } from "ant-design-vue/es/form";
import { type Component, computed } from "vue";

export interface Option {
  value: string | number;
  label: string;
}
const props = defineProps<{
  modelValue: string | number | null | undefined;
  name: string;
  options: Option[];
  prefix?: Component | null;
  suffix?: Component | null;
  label?: string;
  placeholder?: string;
  rule?: Rule;
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
