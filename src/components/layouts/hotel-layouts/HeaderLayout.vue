<template>
  <a-layout-header
    class="sticky top-0 z-40 flex items-center justify-between"
    style="
      background: #fff;
      height: 50px;
      padding-left: 10px;
      padding-right: 24px;
      border-bottom: 1px solid #eee;
    "
  >
    <div>
      <MenuUnfoldOutlined
        v-if="isSidebarOpen"
        class="text-[20px] cursor-pointer"
        @click="$emit('toggleSidebar')"
      />
      <div v-else>
        <router-link
          :to="{ name: 'admin.dashboard' }"
          v-if="
            rolesArray.includes(BaseRole.SUPER_ADMIN) ||
            rolesArray.includes(BaseRole.ADMIN)
          "
        >
          <img
            src="../../../assets/images/LayLao_Logo.svg"
            alt="laylao Logo"
            class="transition-all duration-300 w-10"
        /></router-link>
        <router-link
          :to="{
            name: 'admin-hotel.detailhotel',
            params: { id: authme?.hotels?.[0]?.id },
          }"
          v-else-if="
            rolesArray.includes(BaseRole.ADMIN_HOTEL) ||
            rolesArray.includes(BaseRole.USER_HOTEL)
          "
        >
          <img
            src="../../../assets/images/LayLao_Logo.svg"
            alt="laylao Logo"
            class="transition-all duration-300 w-10"
        /></router-link>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <a-radio-group
        v-model:value="locale"
        button-style="solid"
        @change="changeLocale"
        size="small"
        class="locale-switch"
      >
        <a-radio-button value="la">
          <div class="radio-item px-2 py-1">
            <img src="@/assets/images/la.png" alt="Lao Logo" class="w-4" />
            <span class="text-xs hidden md:block">{{ $t("la") }}</span>
          </div>
        </a-radio-button>

        <a-radio-button value="en">
          <div class="radio-item px-2 py-1">
            <img src="@/assets/images/en.jpg" alt="English Logo" class="w-4" />
            <span class="text-xs hidden md:block">{{ $t("en") }}</span>
          </div>
        </a-radio-button>
      </a-radio-group>

      <div class="w-px h-6 bg-gray-300"></div>

      <a-dropdown trigger="click" placement="bottomRight">
        <BaseButton
          type="text"
          size="middle"
          customClass="p-1 flex items-center justify-center hover:text-blue-500 transition-colors duration-200"
        >
          <MoreOutlined class="text-base" />
        </BaseButton>

        <template #overlay>
          <div class="bg-white shadow-md w-70 py-2">
            <div class="flex hover:bg-gray-100 cursor-pointer">
              <Proflie />
            </div>
            <div
              class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              @click="goToProfile"
            >
              <UserOutlined class="text-base" />
              <span class="font-medium">{{ $t("ແກ້ໄຂໂປຣໄຟ") }}</span>
            </div>
            <div
              class="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
              @click="confirmLogout"
            >
              <LogoutOutlined class="text-base" />
              <span class="font-medium">{{ $t("logout") }}</span>
            </div>
          </div>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
  <ManageProflie v-model:visible="visible" @update:visible="visible = $event" />
</template>

<script lang="ts" setup>
import { useAuth } from "@/presentation/composables/useAuth";
import Proflie from "@/presentation/components/auth/Proflie.vue";
import {
  LogoutOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseButton from "../../Base/BaseComponents/BaseButton.vue";

import { handleApiError } from "@/shared/utils/error";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/presentation/stores/auth.store";
import { BaseRole } from "@/shared/enum/base.role.enum";
import ManageProflie from "@/presentation/components/auth/manageProflie.vue";
const { rolesArray, authme } = storeToRefs(useAuthStore());
const { t } = useI18n();
const locale = ref(localStorage.getItem("app-locale") || "la");
const { logout } = useAuth();
const visible = ref(false);
defineProps<{
  collapsed: boolean;
  isSidebarOpen: boolean;
}>();
const changeLocale = () => {
  const key = "updatable";

  message.loading({ content: t("loading"), key });

  localStorage.setItem("app-locale", locale.value);

  setTimeout(() => {
    message.success({ content: t("success"), key });
    location.reload();
  }, 500);
};
const goToProfile = () => {
  console.log("go to profile");
  visible.value = true;
};
const confirmLogout = () => {
  Modal.confirm({
    title: "ອອກຈາກລະບົບ",
    content: "ທ່ານແນ່ໃຈວ່າຕ້ອງການອອກຈາກລະບົບບໍ?",
    okText: "ຕົກລົງ",
    cancelText: "ຍົກເລີກ",
    centered: true,
    okType: "danger",
    async onOk() {
      try {
        await logout();
      } catch (err) {
        handleApiError(err);
      }
    },
  });
};
// const { getAuthme } = useAuth();
// onMounted(() => {
//   getAuthme();
// });
</script>

<style scoped>
.locale-switch .ant-radio-button-wrapper {
  background: transparent !important;
  border-color: #d9d9d9;
  color: #333;
  transition: all 0.2s;
}

.locale-switch .ant-radio-button-wrapper:hover {
  border-color: #4096ff;
  color: #4096ff;
}

.locale-switch .ant-radio-button-wrapper-checked {
  background: transparent !important;
  color: #4096ff;
  border-color: #4096ff !important;
  box-shadow: none !important;
}

.radio-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 6px;
  padding: 2px;
}

.custom-header {
  position: sticky;
  margin: auto 0;
  padding: auto 0;
  top: 0;
  left: 0;
  right: 0;
  border: #333 solid 1px !important;
}
</style>
