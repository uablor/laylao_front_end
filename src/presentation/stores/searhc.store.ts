import { RoomSearch } from "@/domain/entities/room_search.entity";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useSearchStore = defineStore("searchStore", () => {
  const loading = ref<boolean>(false);

  const search_list  = ref<RoomSearch[]>([]);
  return {
    loading,
    search_list
  };
});
