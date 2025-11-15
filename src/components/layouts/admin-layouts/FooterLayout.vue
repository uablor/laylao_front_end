<template>
  <a-layout-footer class=" py-4 px-6" >
    <div class="flex flex-col md:flex-row justify-between items-center gap-3">
      <p class="text-gray-600 text-sm text-center md:text-left">
        © {{ new Date().getFullYear() }}
        <span class="font-semibold text-blue-600"> Laylao </span>
        . All rights reserved.
      </p>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
