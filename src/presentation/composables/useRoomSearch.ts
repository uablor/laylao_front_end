import { RoomSearchService } from "@/infrastructure/services/room_search.service";
import { storeToRefs } from "pinia";
import { useSearchStore } from "../stores/searhc.store";
import { message } from "ant-design-vue";
import { RoomSearch } from "@/domain/entities/room_search.entity";
import { useI18n } from "vue-i18n";

export function useRoomSearch() {
  const { t } = useI18n();

  const { loading, search_list } = storeToRefs(useSearchStore());

  const search_room = async (data: RoomSearch) => {
    try {
      loading.value = true;
      const res = await RoomSearchService.findSearch(data);
      search_list.value = res.result;
    } catch (err) {
      message.error(t("failed"));
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    search_list,
    search_room,
  };
}
