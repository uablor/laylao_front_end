<template>
  <BaseCRUD
    :columns="ZoneCol.getColumns()"
    :data="ZoneList"
    :loading="loading"
    :icon="EnvironmentOutlined"
    :title="'zone'"
    :scroll="{ x: 'max-content' }"
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
import BaseCRUD from "@/components/Base/BaseCrud/BaseCRUD.vue";
import { EnvironmentOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useZone } from "../../composables/useZone";
import { Zone } from "@/domain/entities/zone.entity";
import ManageZone from "./manageZone.vue";
import { getZoneColumns } from "./zone.column";
import { storeToRefs } from "pinia";
import { useZoneStore } from "@/presentation/stores/zone.store";
const { loading, ZoneList, findAllWithPagination, setQuery, deleteZone } =
  useZone();
const { query } = storeToRefs(useZoneStore());

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

const { ZoneCol, searchableColumns } = getZoneColumns(
  (index: number) => (query.value.page - 1) * query.value.limit + index + 1
);
onMounted(findAllWithPagination);
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
