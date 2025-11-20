<template>
  <a-button
    v-bind="{ ...attrs }"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :html-type="htmlType"
    :type="type"
    :class="['base-btn', customClass]"
    @click="$emit('click', $event)"
    @dblclick="$emit('dblclick', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <slot name="icon" />
    <slot />
  </a-button>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();

defineProps<{
  type?: "primary" | "default" | "dashed" | "link" | "text";
  size?: "small" | "middle" | "large";
  loading?: boolean;
  disabled?: boolean;
  customClass?: string;
  htmlType?: "button" | "submit" | "reset";
}>();

defineEmits<{
  (e: "click", event: MouseEvent): void;
  (e: "dblclick", event: MouseEvent): void;
  (e: "mouseenter", event: MouseEvent): void;
  (e: "mouseleave", event: MouseEvent): void;
}>();
</script>
<style scoped></style>
