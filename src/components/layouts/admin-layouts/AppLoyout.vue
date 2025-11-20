<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" fixed />
    <sidebar-layout
      :collapsed="collapsed"
      :menuItems="menuItems"
      :router="router"
      @update:collapsed="collapsed = $event"
    />
    <a-layout>
      <HeaderLayout
        :collapsed="collapsed"
        :isSidebarOpen="true"
        @toggleSidebar="collapsed = !collapsed"
      />
      <a-layout-content style="margin: 10px 10px">
        <!-- <a-breadcrumb style="margin: 10px 0">
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
            style="color: #333"
          >
            <router-link
              v-if="index < breadcrumbList.length - 1"
              :to="item.path"
            >
              {{ $t((item.title || "").toLowerCase()) }}
            </router-link>

            <span v-else>{{ $t((item.title || "").toLowerCase()) }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb> -->
        <div
          :style="{
            background: '#fff',
          }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <FooterLayout />
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { menuItems } from "./menuItem";
import SidebarLayout from "./SidebarLayout.vue";
import HeaderLayout from "./HeaderLayout.vue";
import FooterLayout from "./FooterLayout.vue";
import router from "@/router/index";

const collapsed = ref<boolean>(false);

onMounted(async () => {});
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
