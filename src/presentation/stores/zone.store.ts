
import {
  ZoneApiResponse,
  ZoneListApiResponse,
} from "@/application/response/zone.response";
import { Zone } from "@/domain/entities/zone.entity";
import { PaginationParams } from "@/shared/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useZoneStore = defineStore("uoneStore", () => {
  const loading = ref<boolean>(false);
  const ZoneList = ref<ZoneListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const selectedZone = ref<ZoneApiResponse | null>(null);
  const query = ref<PaginationParams>({ page: 1, limit: 10 });
  const zoneAll = ref<Zone[]>([]);
  return {
    ZoneList,
    loading,
    query,
    selectedZone,
    zoneAll
  };
});
