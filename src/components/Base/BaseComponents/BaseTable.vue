<template>
  <a-card
    class="w-full overflow-hidden"
    :tab-list="Array.isArray(props.tabList) ? props.tabList : []"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
    :style="{
      border: 'none',
    }"
  > <template #customTab="{ key: tabKey }">
      <slot name="customTab" :tabKey="tabKey"></slot>
    </template>
    <template #title >
        <slot name="header"></slot>
    </template>
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <a-row :gutter="[24, 24]">
      <a-col :span="24">
        <div class="table-wrapper overflow-hidden">
          <a-table
            :columns="props.columns"
            :data-source="props.data.data"
            :loading="loading"
            :scroll="props.scroll"
            :pagination="false"
            size="small"
            :style="{
              background: '#fff',
              borderRadius: '0px',
            }"
            class="data-table"
          >
            <template #bodyCell="{ column, record }">
              <slot name="bodyCell" :column="column" :record="record"></slot>
              <template v-if="column.key === 'actions'">
                <slot name="actions" :record="record"></slot>
              </template>
            </template>
            <template #headerCell="{ column }">
              <span class="font-semibold text-gray-700">
                {{ column.title }}
              </span>
            </template>
          </a-table>
        </div>
      </a-col>

      <a-col :span="24">
        <div
          class="flex justify-end items-center pt-4 px-2 border-t border-gray-200"
        >
          <a-pagination
            v-model:current="props.data.pagination.page"
            v-model:pageSize="props.data.pagination.limit"
            :total="props.data.pagination.total"
            show-size-changer
            show-quick-jumper
            :show-total="(total: number) => `ທັງຫມົດ ${total} ລາຍການ`"
            :page-size-options="['6', '10', '20', '30', '50']"
            @change="onQuery"
            class="pagination-custom"
          >
          </a-pagination>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { ref, type Component } from "vue";
import { type TableColumnsType } from "ant-design-vue";
import { PaginatedResponse } from "@/shared/types";
const props = withDefaults(
  defineProps<{
    columns: TableColumnsType;
    data: PaginatedResponse<any>;
    loading: boolean;
    icon: Component;
    title: string;
    view?: boolean;

    tabList?: boolean | { key: string; tab: string }[];
    scroll?: {
      x?: number | string;
      y?: number | string;
    };
    inputSearch?: boolean;
    searchableColumns?: any[];
  }>(),
  {
    scroll: () => ({ x: 1500, y: 1900 }),
    inputSearch: true,
    view: false,
    tabList: false,
  }
);
const orderBy = ref<"ASC" | "DESC">("DESC");

const activeKey = ref("table");
const onTabChange = (key: string) => {
  activeKey.value = key;
};

const emit = defineEmits(["onQuery", "onView"]);

const onQuery = async (page?: number, pageSize?: number) => {
  emit("onQuery", {
    page: Number(page) ?? props.data.pagination.page,
    limit: pageSize ?? props.data.pagination.limit,
    sort: orderBy.value,
  });
};
</script>

<style scoped></style>
