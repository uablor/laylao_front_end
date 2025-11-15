<template>
  <div>
    <a-form-item :name="props.label">
      <div class="flex items-center gap-2 w-full">
        <label
          class="text-sm flex justify-end font-medium text-gray-700"
          :class="`w-${size_w}`"
        >
          {{ $t(props.label) }} :
        </label>

        <div class="flex-1">
          <a-input
            v-if="props.type === 'text'"
            v-model:value="modelValue"
            :placeholder="$t(props.placeholder ?? '')"
            :autocomplete="props.autocomplete"
            class="w-full !px-2"
          >
            <template #prefix>
              <component v-if="props.prefix" :is="props.prefix" class="mr-1" />
            </template>
            <template #suffix>
              <component v-if="props.suffix" :is="props.suffix" />
            </template>
            <span
              class="absolute right-0 text-red-500 text-xs whitespace-nowrap"
            >
              <a-form-item-explain />
            </span>
          </a-input>

          <a-textarea
            v-else-if="props.type === 'textarea'"
            v-model:value="modelValue"
            :placeholder="$t(props.placeholder ?? '')"
            :autocomplete="props.autocomplete"
            :rows="props.rows"
            class="w-full !px-2"
          >
            <template #prefix>
              <component v-if="props.prefix" :is="props.prefix" class="mr-1" />
            </template>
            <template #suffix>
              <component v-if="props.suffix" :is="props.suffix" />
            </template>
                <span class="absolute right-0 text-red-500 text-xs whitespace-nowrap">
      <a-form-item-explain />
    </span>
          </a-textarea>

          <a-input-password
            v-else-if="props.type === 'password'"
            v-model:value="modelValue"
            :placeholder="$t(props.placeholder ?? '')"
            :autocomplete="props.autocomplete"
            class="w-full !px-2"
          >
            <template #prefix>
              <component v-if="props.prefix" :is="props.prefix" class="mr-1" />
            </template>
            <template #suffix>
              <component v-if="props.suffix" :is="props.suffix" />
            </template>
                <span class="absolute right-0 text-red-500 text-xs whitespace-nowrap">
      <a-form-item-explain />
    </span>
          </a-input-password>
        </div>
      </div>
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
    size_w: string;
    placeholder?: string | null;
    prefix?: Component | null;
    suffix?: Component | null;
    type?: "text" | "password" | "textarea";
    step?: number;
    rows?: number;
    autocomplete?:
      | "on"
      | "off"
      | "name"
      | "honorific-prefix"
      | "given-name"
      | "additional-name"
      | "family-name"
      | "honorific-suffix"
      | "nickname"
      | "email"
      | "username"
      | "new-password"
      | "current-password"
      | "one-time-code"
      | "organization-title"
      | "organization"
      | "street-address"
      | "address-line1"
      | "address-line2"
      | "address-line3"
      | "address-level1"
      | "address-level2"
      | "address-level3"
      | "address-level4"
      | "country"
      | "country-name"
      | "postal-code"
      | "tel"
      | "tel-country-code"
      | "tel-national"
      | "tel-area-code"
      | "tel-local"
      | "tel-extension"
      | "cc-name"
      | "cc-given-name"
      | "cc-additional-name"
      | "cc-family-name"
      | "cc-number"
      | "cc-exp"
      | "cc-exp-month"
      | "cc-exp-year"
      | "cc-csc"
      | "cc-type"
      | "transaction-currency"
      | "transaction-amount"
      | "url"
      | "photo"
      | "impp"
      | "bday"
      | "bday-day"
      | "bday-month"
      | "bday-year"
      | "sex"
      | "language";
  }>(),
  {
    placeholder: "",
    prefix: null,
    suffix: null,
    type: "text",
    autocomplete: "off",
    rows: 3,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "update:modelValue", value: number): void;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<style scoped>
.flex-1 {
  position: relative;
}

.a-form-item-explain {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: red;
  font-size: 12px;
  white-space: nowrap;
}</style>
