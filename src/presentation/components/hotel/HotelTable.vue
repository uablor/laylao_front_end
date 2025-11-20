<template>
  <BaseCRUD
    :columns="HotelCol.getColumns()"
    :data="HotelList"
    :loading="loading"
    :icon="HomeOutlined"
    title="hotel"
    :scroll="{ x: 'max-content' }"
    :searchable-columns="searchableColumns"
    @on-delete="deleteHotel"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setQuery"
  >
    <template #extra>
      <a-button
        type="primary"
        size="middle"
        @click="openMap"
        class="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        {{ $t("open") + $t("map") }}
      </a-button>
      <a-select
        v-model:value="query.zone_id"
        :placeholder="`${t('zone')}`"
        style="width: 120px"
        @change="setQuery"
        :options="[
          { value: '', label: `${t('total')}` },
          ...zoneAll.map((zone: any) => ({ value: zone.id, label: zone.name }))]"
      >
      </a-select>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'logo'">
        <Avatar
          :src="record?.logo?.url"
          :alt="record.name"
          class="w-12 h-12 object-cover rounded-full"
        >
          {{ record.name[0] }}
        </Avatar>
      </template>
      <template v-if="column.key === 'address'">
        <a
          :href="`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`"
          target="_blank"
          class="inline-flex items-center justify-center text-blue-600 transition-transform duration-200 hover:scale-110 hover:text-red-500 mx-2"
        >
          <EnvironmentOutlined class="text-2xl" />
        </a>

        <span class="capitalize">{{ record.address }} </span>
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
      <template v-if="column.key === 'start_time'">
        <FieldTimeOutlined />
        {{ record.start_time }}
      </template>
      <template v-if="column.key === 'end_time'">
        <FieldTimeOutlined />
        {{ record.end_time }}
      </template>
    </template>

    <template #actions="{ record }">
      <a-tooltip :title="$t('booking')">
        <a-button
          type="link"
          size="small"
          @click="
            () =>
              router.push({
                name: 'app-v2.hotel-profile',
                params: { id: String(record.id) },
              })
          "
          class="transition-all duration-200"
        >
          <ShoppingCartOutlined class="text-lg" />
        </a-button>
      </a-tooltip>
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
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/Base/BaseCrud/BaseCRUD.vue";
import {
  EnvironmentOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
import { onMounted } from "vue";
import { useHotel } from "../../composables/useHotel";
import { Hotel } from "@/domain/entities/hotel.entity";
import { useRouter } from "vue-router";
import { useZone } from "@/presentation/composables/useZone";
import { useI18n } from "vue-i18n";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import { storeToRefs } from "pinia";
import { Avatar } from "ant-design-vue";
import { getHotelColumns } from "./hotel.column";

const { t } = useI18n();
const router = useRouter();

const { findAll, zoneAll } = useZone();
const { selectedHotel } = storeToRefs(useHotelStore());
const {
  loading,
  HotelList,
  findallWithPagination,
  setQuery,
  deleteHotel,
  query,
} = useHotel();
const { HotelCol, searchableColumns } = getHotelColumns(
  (index: number) => (query.value.page - 1) * query.value.limit + index + 1
);
const onEdit = (record: Hotel) => {
  selectedHotel.value = record;
  router.push({ name: "admin.managehotel", query: { id: String(record.id) } });
};

const onCreate = () => {
  selectedHotel.value = null;
  router.push({ name: "admin.managehotel" });
};

const openMap = () => {
  router.push({ name: "app-v2.map-hotel" });
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

// const onBooking = (record: Hotel) => {
//   const hotelId = record.id;
//   const existingHotel = booking.value.hotels.find(
//     (hotel) => hotel.hotel_id === hotelId
//   );
//   if (existingHotel) return;
//   booking.value.hotels.push({
//     hotel_id: hotelId,
//     qty: 0,
//   });
// }

onMounted(() => {
  findAll(), findallWithPagination();
});
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
