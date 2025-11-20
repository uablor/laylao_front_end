<template>
  <a-modal
    v-model:open="localOpen"
    :title="$t('ແກ້ໄຂໂປຣໄຟ')"
    :confirmLoading="loading"
    centered
    :footer="null"
    width="450px"
    ><div class="flex justify-center pt-4 w-full">
      <div
        v-if="authme?.hotels[0]?.logo"
        class="w-20 h-20 rounded-full shadow flex items-center justify-center"
      >
        <img
          :src=" authme?.hotels[0]?.logo"
          :alt="authme?.first_name"
          class="w-20 h-20 object-cover rounded-full"
        />
      </div>
      <div
        v-else
        class="w-20 h-20 rounded-full shadow flex items-center justify-center"
      >
        <span class="font-bold text-lg">
          {{
            authme?.first_name
              ? authme.first_name.charAt(0).toUpperCase()
              : authme?.last_name.charAt(0).toUpperCase()
              ? authme?.email.charAt(0).toUpperCase()
              : ""
          }}
        </span>
      </div>
    </div>

    <div
      class="flex justify-center items-center my-4 transition-all duration-300 ease-in-out hover:text-blue-500 hover:underline"
    >
      <a-button type="link" size="middle" @click="onChangePassword">
        <div class="flex items-center gap-2 justify-center w-full">
          <LockOutlined />
          <span>{{ $t("changePassword") }}</span>
        </div>
      </a-button>
    </div>

    <a-form
      :model="formState"
      :rules="UserRule"
      ref="formRef"
      layout="vertical"
      class="mt-4"
      @finish="onSubmit"
      :hideRequiredMark="true"
      :loading="loading"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="24">
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
            :prefix="ContactsOutlined"
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
              :loading="loading"
              :disabled="loading"
            >
              {{ $t("save") }}
            </BaseButton>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
  <ChangePassword
    :user_id="authme?.id || ''"
    :open_change_password="open_change_password"
    @isOpen="
      (isOpen) => {
        open = isOpen;
        open_change_password = isOpen;
      }
    "
  />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/presentation/stores/auth.store";
import {
  ContactsOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { ref, reactive, watch, computed, onMounted } from "vue";
import type { FormInstance } from "ant-design-vue/es/form";
import CustomInput from "@/components/Base/BaseComponents/FormInputString.vue";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { UserRule } from "@/presentation/validator/UserRule";
import ChangePassword from "../user/changePassword.vue";
import { useUser } from "@/presentation/composables/useUser";
import { User_Password } from "@/domain/entities/user.entity";
import { UpdateUserCredentialsDto } from "@/application/dto/user.dto";
import { useUserStore } from "@/presentation/stores/user.store";
const { updateUser, fetchUser } = useUser();
const { loading, selectedUser } = storeToRefs(useUserStore());
const { authme } = storeToRefs(useAuthStore());

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();
const open_change_password = ref(false);
const open = ref(false);
const formRef = ref<FormInstance>();
const onChangePassword = () => {
  open.value = true;
  open_change_password.value = true;
};
const formState = reactive<User_Password>({
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  password: "",
});

const localOpen = computed({
  get: () => props.visible,
  set: (val: boolean) => emit("update:visible", val),
});

watch(
  () => localOpen.value,
  async (val) => {
    if (val) {
      formState.first_name = selectedUser.value?.first_name || "";
      formState.last_name = selectedUser.value?.last_name || "";
      formState.email = authme.value?.email || "";
    }
  },
  { immediate: true, deep: true }
);

const onClose = () => {
  formRef.value?.resetFields();
  emit("update:visible", false);
};

const onSubmit = async () => {
  try {
    const { password, id, ...updatedFormState } = formState;
    const payload: UpdateUserCredentialsDto = { ...updatedFormState };
    await updateUser(Number(authme.value?.id), payload);
    fetchUser(Number(authme.value?.id));
    onClose();
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchUser(Number(authme.value?.id));
});
</script>

<style scoped>
:deep(.ant-modal-body) {
  max-height: 70vh;
  overflow-y: auto;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

input[type="file"] {
  display: none;
}
</style>
