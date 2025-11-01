<template>
  <BaseCRUD
    :columns="RoomTypeCol.getColumns()"
    :data="RoomTypeList.value"
    :loading="loading"
    :icon="ProfileOutlined"
    :scroll="{ x: 800 }"
    :searchableColumns="searchableColumns"
    title="roomtype"
    @on-delete="deleteRoomType"
    @on-edit="onEdit"
    @on-create="onCreate"
    @on-query="setQuery"
    @on-search="setQuery"
  >
  </BaseCRUD>

  <ManageRoomType
    :open="open"
    :data="roomTypeRecord"
    @isOpen="open = $event"
  />
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import { ProfileOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useRoomType } from "@/presentation/composables/useRoomType";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { RoomType } from "@/domain/entities/roomtype.entity";
import ManageRoomType from "./manageRoomType.vue";
import { ColumnType } from "ant-design-vue/es/table";

const { loading, RoomTypeList, fetchRoomTypeWithPagination, setQuery, deleteRoomType } = useRoomType();

const open = ref(false);
const roomTypeRecord = ref<RoomType | null>(null);

const onEdit = (record: RoomType) => {
  roomTypeRecord.value = record;
  open.value = true;
};

const onCreate = () => {
  roomTypeRecord.value = null;
  open.value = true;
};

const RoomTypeCol = new BaseColumns<RoomType>([
  {
    dataIndex: "name",
    ellipsis: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
]);
const searchableColumns = RoomTypeCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined && ["name"].includes(col.dataIndex as string)
)
onMounted(() => fetchRoomTypeWithPagination());
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
