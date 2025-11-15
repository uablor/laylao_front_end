<template>
  <div>
    <a-form-item :label="$t(props.label)" :name="props.label">
      <a-input
        v-if="props.type === 'text'"
        v-model:value="modelValue"
        :placeholder="$t(props.placeholder ?? '')"
        :autocomplete="props.autocomplete"
      >
        <template #prefix>
          <component v-if="props.prefix" :is="props.prefix" class="mr-1" />
        </template>

        <template #suffix>
          <component v-if="props.suffix" :is="props.suffix"></component>
        </template>
      </a-input>
      <a-textarea
        v-if="props.type === 'textarea'"
        v-model:value="modelValue"
        :placeholder="$t(props.placeholder ?? '')"
        :autocomplete="props.autocomplete"
        :rows="props.rows"
      >
        <template #prefix>
          <component v-if="props.prefix" :is="props.prefix" class="mr-1" />
        </template>

        <template #suffix>
          <component v-if="props.suffix" :is="props.suffix"></component>
        </template>
      </a-textarea>

      <!-- password input -->
      <a-input-password
        v-else-if="props.type === 'password'"
        v-model:value="modelValue"
        :placeholder="$t(props.placeholder ?? '')"
        :autocomplete="props.autocomplete"
        
      >
        <template #prefix>
          <component
            v-if="props.prefix"
            :is="props.prefix"
            class="mr-1"
          ></component>
        </template>
        <template #suffix>
          <component v-if="props.suffix" :is="props.suffix"></component>
        </template>
      </a-input-password>
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
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
    rows:3
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
