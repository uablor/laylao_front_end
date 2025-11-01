<template>
  <BaseCRUD
    :columns="HotelCol.getColumns()"
    :data="HotelList"
    :loading="loading"
    :icon="HomeOutlined"
    title="hotel"
    :scroll="{ x: 1900 }"
    :searchable-columns="searchableColumns"
    @on-delete="deleteHotel"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setQuery"
  >
    <template #extra>
      <a-select
        v-model:value="query.zone_id"
        :placeholder="`${t('zone')}`"
        style="width: 120px"
        @change="setQuery"
        :options="zoneAll.map((zone: any) => ({ value: zone.id, label: zone.name }))"
      >
      </a-select>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'logo'">
        <Avatar
          :src="record.logo ? 'https://laylaos-production.up.railway.app' + record.logo : ''"
          :alt="record.name"
          class="w-12 h-12 object-cover rounded-full"
        />
      </template>
      <template v-if="column.key === 'address'">
        <a
          :href="`${record.location}`"
          target="_blank"
          class="inline-flex items-center justify-center text-blue-600 transition-transform duration-200 hover:scale-110 hover:text-red-500 mx-2"
        >
          <EnvironmentOutlined class="text-2xl" />
        </a>

        <span class="capitalize"
          >{{ record.address }}
          {{ record.district ? ", " + record.district : "" }}</span
        >
      </template>
      <template v-if="column.key === 'zone'">
        {{ record.zone.name ? record.zone.name : "" }}
      </template>

      <template v-if="column.key === 'floor'">
        {{ record.floor + " " + $t("floor") }}
      </template>

      <template v-if="column.key === 'tel'">
        <PhoneOutlined></PhoneOutlined>
        {{ record.tel }}
      </template>
    </template>

    <template #actions="{ record }">
      <a-tooltip :title="$t('view')">
        <a-button
          type="link"
          size="small"
          @click="onView(record)"
          class="transition-all duration-200"
        >
          <EyeOutlined class="text-lg" />
        </a-button>
      </a-tooltip>
    </template>
  </BaseCRUD>
  <manageHotel :open="open" :data="hoteRecord" @isOpen="open = $event" />
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import {
  EnvironmentOutlined,
  EyeOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
import manageHotel from "./manageHotel.vue";
import { onMounted, ref } from "vue";
import { useHotel } from "../../composables/useHotel";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { Hotel } from "@/domain/entities/hotel.entity";
import { useRouter } from "vue-router";
import { Avatar } from "ant-design-vue";
import { ColumnType } from "ant-design-vue/es/table";
import { useZone } from "@/presentation/composables/useZone";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const { findAll, zoneAll } = useZone();
const {
  loading,
  HotelList,
  findallWithPagination,
  setQuery,
  deleteHotel,
  query,
} = useHotel();
const open = ref(false);
const hoteRecord = ref<Hotel | null>(null);
const onEdit = (record: Hotel) => {
  hoteRecord.value = record;
  open.value = true;
};

const onCreate = () => {
  hoteRecord.value = null;
  open.value = true;
};

const onView = (record: Hotel) => {
  if (record) {
    router.push({
      name: "admin.detailhotel",
      params: { id: String(record.id) },
    });
  } else {
    router.push({ name: "admin.hotel" });
  }
};

const HotelCol = new BaseColumns<Hotel>([
  {
    dataIndex: "logo",
    ellipsis: true,
    width: 60,
    fixed: "left",
  },
  {
    dataIndex: "name",
    ellipsis: true,
    fixed: "left",
    width: 160,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    dataIndex: "email_hotel",
    width: 200,
  },
  {
    dataIndex: "tel",
    width: 150,
  },
  {
    dataIndex: "address",
    width: 400,
  },
  {
    dataIndex: "floor",
    width: 80,
  },
  {
    dataIndex: "zone",
    width: 100,
  },
]);

const searchableColumns = HotelCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined &&
    ["floor", "name", "email_hotel", "tel"].includes(col.dataIndex as string)
);

onMounted(() => {
  findAll(), findallWithPagination();
});
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
