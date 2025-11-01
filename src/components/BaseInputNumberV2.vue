<template>
  <a-form-item :name="name" :class="formItemClass">
    <div class="flex items-center gap-2 w-full">

      <label
        v-if="label"
        class="text-sm flex justify-end font-medium text-gray-700" :class="`w-${size_w}`"
      >
        {{ label }}
      </label>

      <div class="flex-1">
        <a-input-number
          v-model:value="modelValue"
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
          :class="inputClass + ' w-full !px-2'"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
        >
          <template #prefix>
            <component v-if="prefix" :is="prefix" class="mr-1" />
          </template>

          <template #suffix>
            <component v-if="suffix" :is="suffix" />
          </template>
        </a-input-number>
      </div>
    </div>
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
  size_w?:string
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

const emit = defineEmits<{
  (e: "update:modelValue", value: number | string | null): void;
  (e: "change", value: number | null): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const modelValue = computed({
  get: () =>
    props.modelValue === null ||
    props.modelValue === undefined ||
    props.modelValue === 0
      ? ""
      : props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const inputStyle = computed(() => ({
  width: props.fullWidth ? "100%" : "auto",
}));

const handleChange = (value: number | null) => {
  emit("update:modelValue", value);
  emit("change", value);
};

const handleBlur = (e: FocusEvent) => emit("blur", e);
const handleFocus = (e: FocusEvent) => emit("focus", e);
</script>
