<template>
  <BaseCRUD
    :columns="RoomTypeCol.getColumns()"
    :data="RoomTypeList"
    :loading="loading"
    :icon="ProfileOutlined"
    :scroll="{ x: 'max-content' }"
    :searchableColumns="searchableColumns"
    :hide-button-create="true"
    title="roomtype"
    @on-delete="deleteRoomType"
    @on-edit="onEdit"
    @on-create="onCreate"
    @on-query="setQuery"
    @on-search="setQuery"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'hotel'">
        {{ record?.hotel?.name }}
      </template>
    </template>
  </BaseCRUD>

  <!-- <ManageRoomType :open="open_edit" :data="roomTypeRecord" @isOpen="open_edit = $event" /> -->
  <UpdateRoomType />
  <CreateRoomType />
</template>
<script setup lang="ts">
import BaseCRUD from "@/components/Base/BaseCrud/BaseCRUD.vue";
import { ProfileOutlined } from "@ant-design/icons-vue";
import { onMounted } from "vue";
import { useRoomType } from "@/presentation/composables/useRoomType";
import { RoomType } from "@/domain/entities/roomtype.entity";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import CreateRoomType from "./createRoomType.vue";
import UpdateRoomType from "./updateRoomType.vue";
import { useAuthStore } from "@/presentation/stores/auth.store.ts";
import { BaseRole } from "@/shared/enum/base.role.enum.ts";
import { getRoomTypeColumns } from "./roomtype.column";
const route = useRoute();
const { fetchRoomTypeWithPagination, setQuery, deleteRoomType } = useRoomType();
const { rolesArray, authme } = storeToRefs(useAuthStore());
const { query, formState, open_edit, open_create, loading, RoomTypeList } =
  storeToRefs(useroomTypeStore());

const { RoomTypeCol, searchableColumns } = getRoomTypeColumns(
  (index: number) => (query.value.page - 1) * query.value.limit + index + 1
);

const onEdit = (record: RoomType) => {
  formState.value.id = record.id;
  formState.value.name = record.name;
  formState.value.images = record.images;
  open_edit.value = true;
};

const onCreate = () => {
  formState.value.id = 0;
  formState.value.name = "";
  formState.value.hotel_id = 0;
  formState.value.images = [];
  formState.value.image_ids = [];
  open_create.value = true;
};

onMounted(() => {
  if (route.name === "admin.detailhotel" && route.params.id) {
    query.value.hotel_id = Number(route.params.id);
  } else {
    query.value.hotel_id = undefined;
  }
  if (
    rolesArray.value.includes(BaseRole.USER_HOTEL) ||
    rolesArray.value.includes(BaseRole.ADMIN_HOTEL)
  ) {
    query.value.hotel_id = authme.value?.hotels?.[0]?.id;
  }
  fetchRoomTypeWithPagination();
});
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
