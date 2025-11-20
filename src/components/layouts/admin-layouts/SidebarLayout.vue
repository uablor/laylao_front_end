<template>
  <a-layout-sider fixed
    :collapsed="collapsed"
    @update:collapsed="$emit('update:collapsed', $event)"
    :style="{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
    }"
  >
    <div
      :class="[
        'flex flex-col items-center transition-all duration-300 ease-in-out',
        collapsed ? 'py-3 mb-2' : 'py-6 mb-8',
      ]"
    >
      <div
        :class="[
          'rounded-xl transition-all duration-300 flex items-center justify-center',
          collapsed
            ? 'w-12 h-12 bg-white/10'
            : 'w-16 h-16 bg-white/10 backdrop-blur-sm',
        ]"
      >
        <img
          src="../../../assets/images/LayLao_Logo.svg"
          alt="laylao Logo"
          class="transition-all duration-300"
        />
      </div>

    </div>

    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      :style="{
        background: 'transparent',
        border: 'none',
      }"
      class="sidebar-menu"
    >
      <template v-for="item in menuItems" :key="item.label">
        <a-sub-menu
          v-if="item.children"
          :key="item.label"
          class="sidebar-submenu"
        >
          <template #title>
            <span class="flex items-center gap-3 text-white">
              <component :is="item.icon" />
              <span>{{ $t(item.label.toLowerCase()) }}</span>
            </span>
          </template>
          <a-menu-item
            v-for="child in item.children"
            :key="child.label"
            @click="router.push({ name: 'report.year' })"
          >
            {{ $t(child.label.toLowerCase()) }}
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item
          v-else
          :key="`menuitem-${item.label}`"
          style="color: #000"
          class="sidebar-menu-item selected:bg-orange-200"
        >
          <router-link :to="item.to" class="flex items-center gap-3">
            <component :is="item.icon" class="text-lg flex-shrink-0" />
            <span>
              {{ $t(item.label.toLowerCase()) }}
            </span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { onMounted, ref} from "vue";

import { useRoute } from "vue-router";
const selectedKeys = ref<string[]>([]);
const emit = defineEmits(["update:collapsed"]);

defineProps<{
  collapsed: boolean;
  menuItems: any;
  router: any;
}>();
const route = useRoute();

const routeToMenuKey: Record<string, string> = {
  "admin.hotel": "menuitem-hotel",
  "admin.booking": "menuitem-list booking",
  "admin.detailbooking": "menuitem-detail booking",
  "admin.user": "menuitem-user",
  "admin.dashboard": "menuitem-dashboard",
  "admin.zone": "menuitem-zone",
  "admin.room": "menuitem-searchroom",
  "admin.roomtype": "menuitem-roomtype",
};

// watch(
//   () => route.name,
//   (routeName) => {
//     if (routeName) {
//       const menuKey = routeToMenuKey[routeName as string];
//       selectedKeys.value = menuKey ? [menuKey] : [];
//     }
//   },
//   { immediate: true }
// );
onMounted(() => {
  const menuKey = routeToMenuKey[route.name as string];
  selectedKeys.value = menuKey ? [menuKey] : [];
})
</script>

<style scoped>
::v-deep(.sidebar-menu .ant-menu-item-selected) {
  background-color: #fdf5e6 !important;
  color: hsl(32, 100%, 47%) !important;
}
::v-deep(.sidebar-menu .ant-menu-item:hover) {
  background-color: #fdf5e6 !important;
  color: #ff9b59 !important;
}
</style>
