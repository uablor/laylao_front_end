<!-- <template>
  <div class="w-full">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  labels: string[];
  datas: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}>();
const data = computed (() => {
  return {
    labels: props.labels,
    datasets: props.datas
  };
});
const options = reactive<ChartOptions<"bar">>({
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Stacked Bar Chart ລາຍໄດ້" },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
});

</script> -->
