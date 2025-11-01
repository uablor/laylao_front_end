<template>
  <a-form-item 
    :label="label" 
    :name="name" 
    :class="formItemClass"
  >
    <a-input-number
      :value="modelValue"
      :placeholder="placeholder || label"
      :min="min"
      :max="max"
      :step="step"
      :size="size"
      :disabled="disabled"
      :precision="precision"
      :formatter="formatter"
      :parser="parser"
      :style="inputStyle"
      :class="inputClass"
      @update:value="handleUpdate"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <template #prefix>
        <component v-if="prefix" :is="prefix" class="mr-1" />
      </template>

      <template #suffix>
        <component v-if="suffix" :is="suffix"></component>
      </template>
    </a-input-number>
  </a-form-item>
</template>

<script setup lang="ts">
import { type Component, computed } from "vue";

interface Props {
  modelValue: number | string | null;
  label?: string;
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  prefix?: Component | null;
  suffix?: Component | null;
  size?: "small" | "middle" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  formatter?: (value: number | string | undefined) => string;
  parser?: (value: string) => number | string;
  formItemClass?: string;
  inputClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  placeholder: "",
  min: 0,
  max: Infinity,
  step: 1,
  precision: undefined,
  size: "middle",
  disabled: false,
  fullWidth: true,
  formatter: undefined,
  parser: undefined,
  formItemClass: "mb-0",
  inputClass: "rounded-lg",
});

const modelValue = computed({
  get: () => {
    if (props.modelValue === null || props.modelValue === undefined || props.modelValue === 0) {
      return "";
    }
    return props.modelValue},
  set: (value) => emit("update:modelValue", value),
});

type Emits = {
  (e: "update:modelValue", value: number | string | null): void;
  (e: "change", value: number | null): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
};

const emit = defineEmits<Emits>();

const inputStyle = computed(() => ({
  width: props.fullWidth ? "100%" : "auto",
}));

const handleUpdate = (value: number | null) => {
  emit("update:modelValue", value);
};

const handleChange = (value: number | null) => {
  emit("update:modelValue", value);
  emit("change", value);
};

const handleBlur = (e: FocusEvent) => {
  emit("blur", e);
};

const handleFocus = (e: FocusEvent) => {
  emit("focus", e);
};
</script>

<style scoped></style>