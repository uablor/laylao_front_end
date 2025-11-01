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
      :hideRequiredMark="true"
      layout="vertical"
      :model="formState"
      :rules="UserRule"
      :loading="loadingUser"
      @finish="onSubmit"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <CustomInput
            v-model="formState.email"
            label="email"
            placeholder="gmail@gmail.com"
            autocomplete="email"
            :prefix="MailOutlined"
            type="text"
            :disabled="loading"
          />
        </a-col>
        <a-col :span="12">
          <CustomInput
            v-model="formState.password"
            label="password"
            placeholder="*******"
            autocomplete="current-password"
            :prefix="LockOutlined"
            type="password"
            :disabled="loading"
          />
        </a-col>
        <a-col :span="12">
          <CustomInput
            label="first_name"
            v-model="formState.first_name"
            :placeholder="$t('first_name')"
            :prefix="UserOutlined"
            type="text"
            :disabled="loading"
          >
          </CustomInput>
        </a-col>
        <a-col :span="12">
          <CustomInput
            label="last_name"
            v-model="formState.last_name"
            placeholder="last_name"
            :prefix="UserOutlined"
            type="text"
            :disabled="loading"
          >
          </CustomInput>
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
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { reactive, computed, watch, onMounted } from "vue";
import { useUser } from "@/presentation/composables/useUser";
import { User, User_Password } from "@/domain/entities/user.entity";
import BaseButton from "@/components/BaseButton.vue";
import { UserRule } from "../../validator/UserRule";
import { useRole } from "@/presentation/composables/useRole";
import CustomInput from "@/components/FormInputString.vue";

const { fetchRoleList } = useRole();

const props = defineProps<{ open: boolean; data: User | null }>();
const emit = defineEmits(["isOpen", "onSaved"]);

const { createUser, updateUser, loading } = useUser();
const loadingUser = loading;
const formState = reactive<User_Password>({
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  roles: [],
  is_active: true,
  createdAt: "",
  updatedAt: "",
});

const localOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit("isOpen", val),
});

watch(
  () => props.data,
  (value) => {
    if (value) {
      Object.assign(formState, value);
    } else {
      Object.assign(formState, {
        id: 0,
        email: "",
        first_name: "",
        last_name: "",
        password: "",
      });
    }
  },
  { immediate: true }
);

const onClose = () => {
  if (!props.data)
    Object.assign(formState, {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    });
  emit("isOpen", false);
};
const onSubmit = async () => {
  try {
    if (props.data) {
      const { password, ...updatedFormState } = formState;
      await updateUser(updatedFormState);
    } else {
      const { id, ...createFromState } = formState;
      await createUser(createFromState);
    }
    emit("onSaved");
    onClose();
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await Promise.all([fetchRoleList()]);
});
</script>
