<template>
  <div id="app">
    <a-config-provider>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </a-config-provider>
  </div>
  <!-- <PickMap :model-value-lat="0" :model-value-lng="0" /> -->
<!-- <Est /> -->
</template>

<script setup lang="ts">
// import Est from './est.vue';



</script>

<style>
#app {
  height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}
</style>
