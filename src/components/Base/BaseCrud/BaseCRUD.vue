<template>
  <a-card
    class="w-full overflow-hidden"
    :tab-list="Array.isArray(props.tabList) ? props.tabList : []"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
    :style="{
      border: 'none',
    }"
  >
    <template #customTab="{ key: tabKey }">
      <span
        :class="[
          'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
          activeKey === tabKey
            ? 'bg-blue-50 text-blue-600 font-semibold'
            : 'text-gray-600 hover:text-blue-500',
        ]"
      >
        <component
          v-if="tabKey === 'table'"
          :is="TableOutlined"
          class="text-base"
        />
        <component
          v-else-if="tabKey === 'card'"
          :is="AppstoreOutlined"
          class="text-base"
        />
        <span class="capitalize font-medium">{{ tabKey }}</span>
      </span>
    </template>

    <template #title>
      <div class="flex items-center gap-3">
        <component :is="props.icon" />

        {{ $t(props.title || "") }}
      </div>
    </template>

    <template #extra>
      <div class="flex items-center gap-3 flex-wrap">
        <slot name="extra"></slot>
        <div class="flex gap-2" v-if="props.sortable">
          <a-tooltip
            :title="orderBy === 'ASC' ? $t('sort_desc') : $t('sort_asc')"
          >
            <base-button
              type="text"
              customClass="p-1 flex items-center justify-center hover:text-blue-500 transition-colors duration-200"
              size="small"
              @click="toggleOrder"
            >
              <component
                :is="
                  orderBy === 'ASC'
                    ? VerticalAlignBottomOutlined
                    : VerticalAlignTopOutlined
                "
                class="text-2xl"
              />
            </base-button>
          </a-tooltip>
        </div>

        <a-select
          v-if="props.inputSearch || props.input"
          :value="searchField"
          v-model="searchField"
          placeholder="ເລືອກຄົ້ນຫາ"
          style="width: 120px"
          @change="onSearchFieldChange"
        >
          <a-select-option
            v-for="col in props.searchableColumns"
            :key="(col as any).dataIndex"
            :value="(col as any).dataIndex"
          >
            {{ $t((col as any).dataIndex) }}
          </a-select-option>
        </a-select>

        <a-input-search
          v-if="props.inputSearch"
          v-model:value="search"
          :placeholder="$t('search')"
          @search="onSearch"
          allow-clear
          class="search-input"
          style="width: 150px"
        />
        <a-input
          v-if="props.input"
          v-model:value="search"
          :placeholder="$t('search')"
          @change="onSearch"
          allow-clear
          class="search-input"
          style="width: 150px"
        />

        <base-button
          v-if="!props.hideButtonCreate"
          type="primary"
          @click="onCreate"
          class="search-btn flex items-center gap-2"
          size="middle"
        >
          {{ $t("add") + $t(props.title || "") }}
        </base-button>
        <slot name="extraright"></slot>
      </div>
    </template>

    <a-row :gutter="[20, 20]">
      <a-col
        v-if="activeKey == 'card'"
        :span="6"
        v-for="value in data.data"
        :key="value.id"
      >
        <slot name="card" :value="value"></slot>
      </a-col>

      <a-col :span="24" v-if="activeKey == 'table'">
        <div>
          <a-table
            :columns="props.columns"
            :data-source="props.data.data"
            :loading="loading"
            :scroll="props.scroll"
            :pagination="false"
            bordered="false"
            size="small"
            style="
              border: none;
              box-shadow: none !important;
              border-radius: 0;
              border-bottom: none;
            "
            class="data-table no-border-table no-outer-border-table no-outer-border no-bottom-border"
          >
            <template #bodyCell="{ column, record }">
              <slot name="bodyCell" :column="column" :record="record"></slot>

              <template v-if="column.key === 'actions'">
                <div
                  class="flex gap-2 items-center justify-center action-buttons"
                >
                  <slot name="actions" :record="record"></slot>

                  <a-tooltip
                    v-if="!props.hideActionsUpdate"
                    :title="$t('edit')"
                    color="#1890ff"
                  >
                    <a-button
                      type="link"
                      size="small"
                      @click="onEdit(record)"
                      class="edit-btn transition-all duration-200 hover:scale-110"
                    >
                      <EditOutlined class="text-base text-green-500" />
                    </a-button>
                  </a-tooltip>

                  <a-popconfirm
                    v-if="!props.hideActionsDelete"
                    :title="$t('Are_you_sure_delete_this')"
                    @confirm="emit('onDelete', record.id)"
                    :ok-text="$t('yes')"
                    :cancel-text="$t('cancel')"
                    placement="topRight"
                  >
                    <a-tooltip :title="$t('delete')" color="#ff4d4f">
                      <a-button
                        type="link"
                        size="small"
                        class="delete-btn transition-all duration-200 hover:scale-110"
                      >
                        <DeleteOutlined class="text-base text-red-500" />
                      </a-button>
                    </a-tooltip>
                  </a-popconfirm>
                </div>
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
        <div class="flex justify-end items-center pt-4 px-2">
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
import {
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import { ref, type Component } from "vue";
import { message, type TableColumnsType } from "ant-design-vue";
import { PaginatedResponse } from "@/shared/types";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    columns: TableColumnsType;
    data: PaginatedResponse<any>;
    loading: boolean;
    icon: Component;
    title?: string;
    view?: boolean;
    sortable?: boolean;
    hideActionsDelete?: boolean;
    hideActionsUpdate?: boolean;
    hideButtonCreate?: boolean;
    tabList?: boolean | { key: string; tab: string }[];
    scroll?: {
      x?: number | string;
      y?: number | string;
    };
    inputSearch?: boolean;
    input?: boolean;
    searchableColumns?: any[];
  }>(),
  {
    scroll: () => ({ x: 1500, y: 1900 }),
    inputSearch: true,
    sortable: true,
    input: false,
    view: false,
    tabList: false,
    hideActions: false,
  }
);
const orderBy = ref<"ASC" | "DESC">("DESC");
function toggleOrder() {
  orderBy.value = orderBy.value === "ASC" ? "DESC" : "ASC";
  onQuery();
}
const activeKey = ref("table");
const onTabChange = (key: string) => {
  activeKey.value = key;
};

const emit = defineEmits([
  "onDelete",
  "onEdit",
  "onCreate",
  "onQuery",
  "onSearch",
  "onView",
]);

const onCreate = () => {
  emit("onCreate", { open: true, data: null });
};

const onEdit = (record: any) => {
  emit("onEdit", record);
};

const search = ref<string>("");
const searchField = ref<string>(
  props.searchableColumns && props.searchableColumns.length > 0
    ? (props.searchableColumns[0] as any).dataIndex
    : ""
);

const onSearchFieldChange = (value: string) => {
  searchField.value = value;
};

const onSearch = async () => {
  if (!searchField.value) {
    message.info(t("please_select_search_field"));
    return;
  }
  emit("onSearch", {
    search: search.value,
    search_field: searchField.value,
    page: 1,
  });
};

const onQuery = async (page?: number, pageSize?: number) => {
  emit("onQuery", {
    page: Number(page) ?? props.data.pagination.page,
    limit: pageSize ?? props.data.pagination.limit,
    sort: orderBy.value,
  });
};
</script>

<style scoped>
::v-deep(.no-border-table .ant-table) {
  border: none !important;
  box-shadow: none !important;
}
.no-border-table .ant-table,
.no-border-table .ant-table-container,
.no-border-table .ant-table-content,
.no-border-table .ant-table-thead > tr > th,
.no-border-table .ant-table-tbody > tr > td {
  border: none !important;
}

.no-border-table .ant-table-tbody > tr:hover > td {
  background: #fafafa;
}
::v-deep(.no-outer-border-table .ant-table) {
  border: none !important; /* ลบเส้นขอบรอบนอก */
  box-shadow: none !important;
}

/* ลบเส้นขอบแนวตั้ง (vertical lines) */
::v-deep(.no-outer-border-table .ant-table-thead > tr > th),
::v-deep(.no-outer-border-table .ant-table-tbody > tr > td) {
  border-right: none !important;
}

/* ลบเส้นขอบด้านล่างของหัวตาราง (เส้นขีดลงระหว่าง thead กับ tbody) */
::v-deep(.no-outer-border-table .ant-table-thead > tr > th) {
  border-bottom: none !important;
}

/* ให้คงเส้นขอบแนวนอนระหว่างแถวไว้ */
::v-deep(.no-outer-border-table .ant-table-tbody > tr > td) {
  border-bottom: 1px solid #f0f0f0; /* หรือเปลี่ยนสีตามชอบ */
}
::v-deep(.no-outer-border .ant-table) {
  border: none !important; /* เอาเส้นขอบรอบนอกออก */
  box-shadow: none !important;
}

/* เอาเฉพาะขอบนอกของ container ออก (ไม่กระทบเส้นในตาราง) */
::v-deep(.no-outer-border .ant-table-container) {
  border: none !important;
}

::v-deep(.no-bottom-border .ant-table) {
  border: none !important;
  box-shadow: none !important;
}

/* เอาเส้นขอบด้านล่างของ container */
::v-deep(.no-bottom-border .ant-table-container) {
  border-bottom: none !important;
}

/* เอาเส้น bottom ของ thead */
::v-deep(.no-bottom-border .ant-table-thead > tr > th) {
  border-bottom: none !important;
}

/* เอาเส้น bottom ของ tbody ถ้าไม่ต้องการเส้นระหว่างแถวด้วย */
::v-deep(.no-bottom-border .ant-table-tbody > tr > td) {
  border-bottom: none !important;
}

/* ป้องกัน pseudo-element ของ Ant Design Vue ที่อาจทำให้เกิดเส้นด้านล่าง */
::v-deep(.no-bottom-border .ant-table-container::after) {
  border-bottom: none !important;
}
</style>
