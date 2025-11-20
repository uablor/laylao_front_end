<template>
  <div>
    <div class="bg-white px-4 pt-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <HomeOutlined class="text-blue-600" />
            {{ $t("dashboard") }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">{{ currentDate }}</p>
        </div>
      </div>
    </div>

    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4">
        <div
          class="lg:col-span-1 flex items-center justify-between bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <div class="truncate">
            <span class="font-medium text-gray-700">{{ $t("zone") }}</span>
          </div>
          <a-spin size="small" v-if="loading" />
          <span v-else class="ml-1 text-gray-600 truncate font-semibold">{{
            data?.summary.totalZones ?? "-"
          }}</span>
        </div>

        <!-- Total Rooms -->
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("hotel") + $t("total") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.totalHotels ?? "-"
          }}</span>
        </div>

        <!-- Available Rooms -->
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("room") + $t("total") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.room.totalRooms ?? "-"
          }}</span>
        </div>

        <!-- Occupied Rooms -->
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("room") + $t("free") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.room.totalAvailableRooms ?? "-"
          }}</span>
        </div>
        <!-- Occupied Rooms -->
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("room") + $t("occupied") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.room.totalOccupiedRooms ?? "-"
          }}</span>
        </div>
        <!-- Occupied Rooms -->
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("room") + $t("reserved") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.room.totalReservedRooms ?? "-"
          }}</span>
        </div>
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("room_type") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.totalRoomTypes ?? "-"
          }}</span>
        </div>
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("list booking") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.booking ?? "-"
          }}</span>
        </div>
        <div
          class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
        >
          <span class="text-gray-700">{{ $t("detail booking") }}</span>
          <a-spin size="small" v-if="loading" />
          <span v-else class="font-semibold">{{
            data?.summary.bookingDetail ?? "-"
          }}</span>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Revenue Chart -->
        <div class="bg-white shadow-md p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4">
            {{ $t("revenue") }} - {{ $t("monthly") }}
          </h2>
          <apexchart
            width="100%"
            height="300"
            type="line"
            :options="revenueChartOptions"
            :series="revenueChartSeries"
          ></apexchart>
        </div>

        <!-- Brokerage Chart -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4">
            {{ $t("brokerage") }} - {{ $t("monthly") }}
          </h2>
          <apexchart
            width="100%"
            height="300"
            type="area"
            :options="brokerageChartOptions"
            :series="brokerageChartSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Monthly Statistics Table -->
      <div class="bg-white rounded-lg py-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          {{ $t("statistics") }}{{ $t("monthly") }}
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {{ $t("month") }}
                </th>
                <th
                  class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  {{ $t("revenue") }}
                </th>
                <th
                  class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  {{ $t("brokerage") }}
                </th>
                <th
                  class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  {{ $t("total") }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="4" class="text-center">
                  <a-spin size="small" />
                </td>
              </tr>
              <tr
                v-for="stat in data?.monthlyStats"
                :key="stat.month"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-3 text-sm font-medium text-gray-900">
                  {{ getMonthName(stat.month) }}
                </td>
                <td class="px-4 py-3 text-sm text-right text-gray-600">
                  {{ formatCurrency(stat.totalPrice) }}
                </td>
                <td class="px-4 py-3 text-sm text-right text-gray-600">
                  {{ formatCurrency(stat.totalBrokerage) }}
                </td>
                <td
                  class="px-4 py-3 text-sm text-right font-semibold text-gray-900"
                >
                  {{ formatCurrency(stat.totalAll) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, computed, watch } from "vue";
import { useDashboard } from "../../composables/useDashboard";
import { useI18n } from "vue-i18n";
import { formatCurrency } from "@/shared/utils/price.util";
const { getDashboard, data, loading } = useDashboard();

const currentDate = computed(() => {
  const now = new Date();
  const weekDayIndex = now.getDay();
  const monthIndex = now.getMonth();
  const day = now.getDate();
  const year = now.getFullYear();

  const weekday = t(`weekDays_short.${weekDayIndex}`);
  const month = t(`months_short.${monthIndex}`);

  return `${weekday}, ${day} ${month} ${year}`;
});

const revenueChartOptions = ref({
  chart: {
    id: "revenue-chart",
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
  },
  xaxis: {
    categories: [] as string[],
    type: "category",
    labels: {
      rotate: -45,
      rotateAlways: false,
    },
  },
  colors: ["#3b82f6"],
  stroke: { curve: "smooth", width: 3 },
  grid: { borderColor: "#e5e7eb" },
  dataLabels: { enabled: false },
  tooltip: {
    y: {
      formatter: (val: number) => formatCurrency(val),
    },
  },
});

const revenueChartSeries = ref<any>([
  { name: "Revenue", data: [] as number[] },
]);

const brokerageChartOptions = ref({
  chart: {
    id: "brokerage-chart",
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
  },
  xaxis: {
    categories: [] as string[],
    type: "category",
    labels: {
      rotate: -45,
      rotateAlways: false,
    },
  },
  colors: ["#10b981"],
  stroke: { curve: "smooth", width: 2 },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  grid: { borderColor: "#e5e7eb" },
  dataLabels: { enabled: false },
  tooltip: {
    y: {
      formatter: (val: number) => formatCurrency(val),
    },
  },
});

const brokerageChartSeries = ref<any>([
  { name: "Brokerage", data: [] as number[] },
]);

const { t } = useI18n();
const getMonthName = (month: number): string => {
  const monthIndex = month - 1;
  if (monthIndex >= 0 && monthIndex <= 12) {
    return t(`months_short.${monthIndex}`);
  }
  return `${t("month")} ${month}`;
};

watch(
  data,
  (newData) => {
    if (!newData || !newData.monthlyStats) return;

    const categories = newData.monthlyStats.map((m) => getMonthName(m.month));

    revenueChartOptions.value = {
      ...revenueChartOptions.value,
      xaxis: { ...revenueChartOptions.value.xaxis, categories },
    };
    revenueChartSeries.value[0].data = newData.monthlyStats.map(
      (m) => m.totalPrice
    );

    brokerageChartOptions.value = {
      ...brokerageChartOptions.value,
      xaxis: { ...brokerageChartOptions.value.xaxis, categories },
    };
    brokerageChartSeries.value[0].data = newData.monthlyStats.map(
      (m) => m.totalBrokerage
    );
  },
  { immediate: true }
);

onMounted(async () => {
  await getDashboard();
});
</script>

<style scoped>
.transition-shadow {
  transition: box-shadow 0.3s ease-in-out;
}
</style>
