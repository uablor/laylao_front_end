import {
  UserApiResponseList,
  UserListApiResponse,
} from "@/application/response/user.response";
import { User } from "@/domain/entities/user.entity";
import { PaginationParams } from "@/shared/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const loading = ref<boolean>(false);
  const UserList = ref<UserListApiResponse>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });

  const selectedUser = ref<User>();
  const query = ref<PaginationParams>({ page: 1, limit: 10 });
  const RoomTypeAll = ref<UserApiResponseList | null>(null);
  return {
    UserList,
    loading,
    query,
    selectedUser,
    RoomTypeAll,
  };
});
