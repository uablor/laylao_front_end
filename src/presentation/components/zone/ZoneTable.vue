<template>
  <BaseCRUD
    :columns="ZoneCol.getColumns()"
    :data="ZoneList"
    :loading="loading"
    :icon="EnvironmentOutlined"
    :title="'zone'"
    :scroll="{ x: 800 }"
    :searchable-columns="searchableColumns"
    @on-delete="deleteZone"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setQuery"
  >
  </BaseCRUD>

  <ManageZone
    :open="open"
    :data="zoneRecord"
    @isOpen="open = $event"
    @onSaved="findAllWithPagination"
  ></ManageZone>
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import { EnvironmentOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useZone } from "../../composables/useZone";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { Zone } from "@/domain/entities/zone.entity";
import ManageZone from "./manageZone.vue";
import { ColumnType } from "ant-design-vue/es/table";
const { loading, ZoneList, findAllWithPagination, setQuery, deleteZone } =
  useZone();

const open = ref(false);
const zoneRecord = ref<Zone | null>(null);

const onEdit = (record: Zone) => {
  zoneRecord.value = record;
  open.value = true;
};

const onCreate = () => {
  zoneRecord.value = null;
  open.value = true;
};

const ZoneCol = new BaseColumns<Zone>([
  {
    dataIndex: "name",
    ellipsis: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
]);

const searchableColumns = ZoneCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined && ["name"].includes(col.dataIndex as string)
);
onMounted(findAllWithPagination);
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
