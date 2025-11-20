<template>
  <a-layout style="min-height: 100vh">
    <a-layout>
      <HeaderLayout />
      <a-layout-content style="margin: 10px 10px">
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
import HeaderLayout from "./HeaderLayout.vue";
import FooterLayout from "./FooterLayout.vue";
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
