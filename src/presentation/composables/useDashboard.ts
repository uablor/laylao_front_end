import { DashboardData } from "@/domain/entities/report.entity";
import { DashboardService } from "@/infrastructure/services/dashboard.service";
import { computed, ref } from "vue";

export function useDashboard() {
  const data = ref<DashboardData>();
  const loading = ref<boolean>(false);
  async function getDashboard() {
    loading.value = true;
    const res = await DashboardService.get_report();
    data.value = res.result;
    loading.value = false;
  }
  return {
    loading ,
    data : computed(() => data.value),
    getDashboard,
  };
}
