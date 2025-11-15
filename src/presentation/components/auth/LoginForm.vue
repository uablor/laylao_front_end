<template>
  <div
    class="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <div
      class="bg-white shadow-xl rounded-2xl px-10 py-10 w-full max-w-md transform transition-all"
    >
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-2">
        {{ $t("login") }}
      </h2>
      <p class="text-center text-gray-500 mb-8 text-sm">
        {{ $t("welcome_back") }}
      </p>

      <a-form
        :hideRequiredMark="true"
        :model="loginForm"
        :rules="AuthRule"
        layout="vertical"
        @finish="handleLogin"
        class="space-y-5"
      >
        <CustomInput
          v-model="loginForm.email"
          label="email"
          placeholder="gmail@gmail.com"
          autocomplete="email"
          :prefix="UserOutlined"
          type="text"
          :disabled="loading"
        />

        <CustomInput
          v-model="loginForm.password"
          label="password"
          placeholder="*******"
          autocomplete="current-password"
          :prefix="LockOutlined"
          type="password"
          :disabled="loading"
        />

        <a-form-item>
          <BaseButton
            type="primary"
            html-type="submit"
            custom-class="w-full  text-white font-semibold h-12 rounded-xl shadow-lg transition-all duration-300"
            :loading="loading"
            :disabled="loading"
          >
            {{ loading ? $t("loading") + "..." : $t("login") }}
          </BaseButton>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import CustomInput from "@/components/Base/BaseComponents/FormInputString.vue";
import { LoginCredentialsDto } from "@/application/dto/login.dto";
import { useAuth } from "@/presentation/composables/useAuth";
import { AuthRule } from "@/presentation/validator/AuthRule";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";

const { login, loading } = useAuth();

const loginForm = reactive<LoginCredentialsDto>({
  email: "",
  password: "",
});

const handleLogin = async () => {
  await login(loginForm);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
