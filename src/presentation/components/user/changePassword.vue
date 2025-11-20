<template>
  <a-modal
    v-model:open="localOpen"
    :footer="null"
    @cancel="onClose"
    :width="'400px'"
    centered
  >
    <template #title>
      <div class="text-center">
        <div class="mb-2">
          <a-divider />
          <span
            class="text-sm w-60px font-semibold text-gray-400 uppercase tracking-wider"
          >
            {{ $t("changePassword") }}
          </span>
          <a-divider />
        </div>
      </div>
    </template>

    <a-form
      :hideRequiredMark="true"
      layout="vertical"
      :model="formState"
      :rules="Rule"
      :loading="loadingUser"
      @finish="onSubmit"
    >
      <a-row :gutter="[24, 16]">
        <a-col :span="24">
          <CustomInput
            v-model="formState.password"
            label="password"
            placeholder="*******"
            type="password"
            :prefix="LockOutlined"
            :disabled="loading"
          />
        </a-col>

        <a-col :span="24">
          <CustomInput
            v-model="formState.confirm_password"
            label="confirm_password"
            placeholder="*******"
            type="password"
            :prefix="LockOutlined"
            :disabled="loading"
          />
        </a-col>
        <a-col :span="24">
          <div class="flex justify-end gap-2 mt-2">
            <BaseButton @click="onClose">{{ $t("cancel") }}</BaseButton>
            <BaseButton
              type="primary"
              html-type="submit"
              :loading="loadingUser"
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
import { LockOutlined } from "@ant-design/icons-vue";
import { reactive, computed, onMounted } from "vue";
import { useUser } from "@/presentation/composables/useUser";
import { useRole } from "@/presentation/composables/useRole";
import CustomInput from "@/components/Base/BaseComponents/FormInputString.vue";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { fetchRoleList } = useRole();

const props = defineProps<{
  user_id: string|number | null;
  open_change_password: boolean;
}>();
const emit = defineEmits(["isOpen", "onSaved"]);

const { updateChangePassword, loading } = useUser();
const loadingUser = loading;
const formState = reactive<{ password: string; confirm_password: string }>({
  password: "",
  confirm_password: "",
});

const localOpen = computed({
  get: () => props.open_change_password,
  set: (val: boolean) => emit("isOpen", val),
});

const onClose = () => {
  formState.password = "";
  formState.confirm_password = "";
  emit("isOpen", false);
};

const onSubmit = async () => {
  try {
    if (!props.user_id) return;
    const { password } = formState;
    await updateChangePassword(Number(props.user_id), { password });
    emit("onSaved");
    onClose();
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await Promise.all([fetchRoleList()]);
});

const Rule = {
  password: [
    {
      required: true,
      message: t("not_empty") + t("password"),
      trigger: "blur",
    },
    { min: 6, message: t("password_min_length"), trigger: "blur" },
  ],
  confirm_password: [
    {
      required: true,
      message: t("not_empty") + t("confirm_password"),
      trigger: "blur",
    },
    {
      validator: (_rule: any, value: string, callback: any) => {
        if (value !== formState.password) {
          callback(new Error(t("password_not_match")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};
</script>
