<template>
  <div>
    <div class="flex justify-between items-center p-4">
      <h1 class="text-[15px] font-bold text-gray-800">
        <HomeOutlined /> {{ $t("dashboard") }}
        Dashboard
      </h1>

      <BaseButton type="primary" ghost size="middle">
        <PlusCircleFilled class="text-lg" />{{ $t("booking") }}
      </BaseButton>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 p-4">
      <div
        class="lg:col-span-2 flex items-center justify-between bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <div class="truncate">
          <span class="font-medium text-gray-700">{{ $t("address") }}:</span>
          <span class="ml-1 text-gray-600 truncate">55</span>
        </div>

        <EnvironmentOutlined class="text-lg" />
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("room") + $t("total") }}</span>
        <span class="font-semibold">555</span>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{ $t("room") + $t("free") }}</span>
        <span class="font-semibold">252</span>
      </div>

      <div
        class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
      >
        <span class="text-gray-700">{{
          $t("room") + $t("no") + $t("free")
        }}</span>
        <span class="font-semibold">525</span>
      </div>
    </div>

    <div class="">
      <a-card title="Revenue Overview" class="shadow-md">
        <apexchart
          width="100%"
          height="300"
          type="line"
          :options="chartOptions"
          :series="chartSeries"
        ></apexchart>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import {
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

const chartOptions = ref({
  chart: { id: "revenue-chart", toolbar: { show: false } },
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  colors: ["#3b82f6"],
  stroke: { curve: "smooth", width: 3 },
  grid: { borderColor: "#e5e7eb" },
});

const chartSeries = ref([
  { name: "Revenue", data: [5000, 7000, 8000, 6500, 9000, 11000] },
]);
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
