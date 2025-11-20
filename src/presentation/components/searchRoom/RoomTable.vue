<template>
  <BaseTable
    :columns="RoomCol.getColumns()"
    :data="RoomList"
    :loading="loading"
    :icon="AppstoreOutlined"
    title="room"
    :scroll="{ x: 'max-content' }"
    @on-query="setQuery"
    @on-search="setQuery"
  >
    <template #header>
      <h1 class="text-[15px] font-bold text-gray-800">
        <SearchOutlined />
        {{ $t("search") + $t("room") }}
      </h1>
    </template>
    <template #extra>
      <base-button type="primary" size="middle" @click="open = true">
        <span class="hidden sm:inline px-1"><SearchOutlined /></span>
        {{ $t("search") }}
      </base-button></template
    >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-tag
          :color="record.status === 'available' ? 'green' : 'red'"
          class="capitalize text-base"
        >
          {{ record.status === "available" ? "ຫ້ອງວ່າ" : "ມີຄົນຈອງ" }}
        </a-tag>
      </template>
      <template v-if="column.key === 'room_number'">
        <a-tag :color="'blue'" class="capitalize text-base">
          {{ record.room_number }}
        </a-tag>
      </template>

      <template v-if="column.key === 'price'">
        <a-tag color="green">
          <div class="flex items-center justify-center gap-1">
            <h1 style="margin: 0">{{ record.price.toLocaleString() }} kip</h1>
          </div>
        </a-tag>
      </template>
      <template v-if="column.key === 'brokerage_fees'">
        <a-tag color="green">
          <div class="flex items-center justify-center gap-1">
            <h1 style="margin: 0">
              {{ record.brokerage_fees.toLocaleString() }} kip
            </h1>
          </div>
        </a-tag>
      </template>
      <template v-if="column.key === 'room_type'">
        {{ record.room_type.name ? record.room_type.name : "" }}
      </template>
      <template v-if="column.key === 'hotel'">
        {{ record.hotel.name ? record.hotel.name : "" }}
      </template>
    </template>
    <template #actions="{ record }">
      <base-button type="primary" size="small" @click="onView(record)">
        <span class="hidden sm:inline px-1">+</span>
        {{ $t("booking") }}
      </base-button>
    </template>
  </BaseTable>

  <a-drawer
    :title="$t('search') + ' ' + $t('room')"
    :width="420"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <a-form :model="searchForm" layout="vertical">
      <a-row :gutter="[24, 24]">
        <a-col :span="12">
          <BaseSelect
            label="zone_id"
            name="zone_id"
            v-model="searchForm.zone_id"
            :options="[]"
            :placeholder="$t('zone_id')"
            type="text"
          />
        </a-col>
        <a-col :span="12">
          <BaseInputNumber
            name="hotel_id"
            label="hotel_id"
            v-model="searchForm.hotel_id"
            :placeholder="$t('hotel_id')"
            type="text"
            :prefix="HomeOutlined"
          />
        </a-col>
        <a-col :span="12">
          <BaseInputNumber
            name="room_number_id"
            label="room_type_id"
            v-model="searchForm.room_type_id"
            :placeholder="$t('room_type_id  ')"
            type="text"
            :prefix="AppstoreOutlined"
          />
        </a-col>
        <a-col :span="12">
          <FormInputString
            label="floor"
            v-model="searchForm.floor"
            :placeholder="$t('floor')"
            type="text"
          />
        </a-col>
        <a-col :span="12">
          <FormInputString
            label="min_price"
            v-model="searchForm.min_price"
            :placeholder="$t('min_price')"
            type="text"
          />
        </a-col>
        <a-col :span="12">
          <FormInputString
            label="max_price"
            v-model="searchForm.max_price"
            :placeholder="$t('max_price')"
            type="text"
        /></a-col>
      </a-row>
    </a-form>

    <template #extra>
      <div style="text-align: right">
        <a-space>
          <a-button type="primary" @click="onSearch">
            {{ $t("search") }}
          </a-button>
        </a-space>
      </div>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import BaseTable from "@/components/Base/BaseComponents/BaseTable.vue";
import {
  AppstoreOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import BaseButton from "@/components/Base/BaseComponents/BaseButton.vue";
import { onMounted, ref, reactive } from "vue";
import { useRoom } from "@/presentation/composables/useRoom";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { Room } from "@/domain/entities/room.entity";

import { storeToRefs } from "pinia";
import { useroomStore } from "@/presentation/stores/room.store";
import FormInputString from "@/components/Base/BaseComponents/FormInputString.vue";
import { RoomSearch } from "@/domain/entities/room_search.entity";
import BaseInputNumber from "@/components/Base/BaseComponents/BaseInputNumber.vue";
import BaseSelect from "@/components/Base/BaseComponents/BaseSelect.vue";
// import { useZone } from "@/presentation/composables/useZone";
// import { useHotel } from "@/presentation/composables/useHotel";
// import { useRoomType } from "@/presentation/composables/useRoomType";
// import { Zone } from "../../../domain/entities/zone.entity";
// import { useRoomSearch } from "@/presentation/composables/useRoomSearch";

const { query } = storeToRefs(useroomStore());
const { loading, RoomList, fetchRoomList, setQuery } = useRoom();
// const {search_list, search_room, loading} = useRoomSearch()
// const {} = useZone();
// const { HotelAll, fetchHotel} =  useHotel()
// const {RoomTypeAll, fetchRoomType} =  useRoomType()

const open = ref(false);

const searchForm = reactive<RoomSearch>({
  zone_id: 0,
  min_price: "",
  max_price: "",
  floor: "",
  status: "",
  room_type_id: 0,
  hotel_id: 0,
});

const onClose = () => {
  open.value = false;
};

const onView = (_record: Room) => {};

const onSearch = () => {
  const searchParams = Object.fromEntries(
    Object.entries(searchForm).filter(([_, value]) => value !== undefined)
  );
  Object.assign(query.value, searchParams);
  fetchRoomList();
  open.value = false;
};

const RoomCol = new BaseColumns<Room>([
  {
    dataIndex: "name",
    ellipsis: true,
    width: 200,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    dataIndex: "room_number",
    sorter: (a, b) => a.number - b.number,
    width: 100,
  },
  {
    dataIndex: "brokerage_fees",
    sorter: (a, b) => a.size - b.size,
    width: 150,
  },
  {
    dataIndex: "price",
    sorter: (a, b) => a.capacity - b.capacity,
    width: 150,
  },
  {
    dataIndex: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    width: 150,
  },
  {
    dataIndex: "room_type",
    sorter: (a, b) => a.price - b.price,
    width: 100,
  },
  {
    dataIndex: "hotel",
    sorter: (a, b) => a.price - b.price,
    width: 170,
  },
  {
    dataIndex: "room_amenities",
    width: 400,
  },
  {
    dataIndex: "description",
    width: 400,
  },
]);

onMounted(() => {
  fetchRoomList();
});
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
