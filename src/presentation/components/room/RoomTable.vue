<template>
  <BaseCRUD
    :columns="RoomCol.getColumns()"
    :data="RoomList"
    :loading="loading"
    :icon="AppstoreOutlined"
    :searchable-columns="searchableColumns"
    title="room"
    :scroll="{ x: 2400 }"
    @on-delete="deleteRoom"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setQuery"
  >
    <template #extra>
      <a-input-number
        :value="query.min_price"
        @update:value="onMinPriceChange"
        :min="0"
        :formatter="(value: number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value : string) => value.replace(/,/g, '')"
        :placeholder="$t('min_price')"
        style="width: 100px"
      />
      <span>~</span>
      <a-input-number
        :value="query.max_price"
        @update:value="onMaxPriceChange"
        :min="0"
        :formatter="(value : number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value : string) => value.replace(/,/g, '')"
        :placeholder="$t('max_price')"
        style="width: 100px"
        a
      />
      <a-select
        v-model:value="query.room_type_id"
        :placeholder="t('room_type')"
        style="width: 100px"
        @change="setRoomType"
        :options="[
          { label: t('all'), value: '' },
          ...RoomTypeAll.map((item) => ({ label: item.name, value: item.id })),
        ]"
      />
      <a-select
        v-model:value="query.status"
        :placeholder="t('status')"
        style="width: 100px"
        @change="setStatus"
        :options="[
          { value: 'all', label: t('all') },
          { value: RoomStatus.AVAILABLE, label: 'ຫ້ອງວ່າ' },
          { value: RoomStatus.RESERVED, label: 'ຫ້ອງບໍ່ຫວ່າງ' },
          { value: RoomStatus.OCCUPIED, label: 'ຫ້ອງມີຄນຈອງ' },
        ]"
      />
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-tag
          :color="record.status === 'available' ? 'green' : 'red'"
          class="capitalize text-base"
        >
          {{
            record.status === "available"
              ? "ຫ້ອງວ່າ"
              : record.status === "reserved"
              ? "ຫ້ອງບໍ່ຫວ່າງ"
              : "ຫ້ອງມີຄົນຈອງ"
          }}
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
      <a-tooltip :title="$t('booking')">
        <a-button
          type="link"
          size="small"
          :disabled="
            booking.rooms.map((item) => item.room_id).includes(record.id) ||
            record.status !== RoomStatus.AVAILABLE
          "
          @click="onBooking(record as Room)"
          class="transition-all duration-200"
        >
          <PlusCircleFilled class="text-lg" />
        </a-button>
      </a-tooltip>
    </template>
  </BaseCRUD>

  <ManageRoom :open="open" :data="roomRecord" @isOpen="open = $event" />
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import { AppstoreOutlined, PlusCircleFilled } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useRoom } from "@/presentation/composables/useRoom";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { Room } from "@/domain/entities/room.entity";
import ManageRoom from "./manageRoom.vue";

import { useRoute } from "vue-router";
import { ColumnType } from "ant-design-vue/es/table";
import { useI18n } from "vue-i18n";
import { RoomStatus } from "@/shared/enum/status-room.enum";
import { useRoomType } from "@/presentation/composables/useRoomType";
import { useBookingStore } from "@/presentation/stores/booking.store";
import { storeToRefs } from "pinia";
import { useroomStore } from "@/presentation/stores/room.store";
const { t } = useI18n();
const { findAllRoomType, RoomTypeAll } = useRoomType();
const { roomAll } = storeToRefs(useroomStore());
const { booking } = storeToRefs(useBookingStore());
const {
  loading,
  RoomList,
  fetchRoomList,
  setQuery,
  deleteRoom,
  setStatus,
  setRoomType,
  query,
} = useRoom();
const route = useRoute();
const open = ref(false);
const roomRecord = ref<Room | null>(null);

const onEdit = (record: Room) => {
  roomRecord.value = record;
  open.value = true;
};

const onCreate = () => {
  roomRecord.value = null;
  open.value = true;
};
const onBooking = (record: Room) => {
  const roomId = record.id;
  console.log(roomId, "roomId");
  const existingRoom = booking.value.rooms.find(
    (room) => room.room_id === roomId
  );
  if (existingRoom) return;
  console.log(booking.value.rooms, "sfda");
  booking.value.rooms.push({
    room_id: roomId,
    qty: 0,
  });
  roomAll.value.push(record);
};

function onMinPriceChange(val: number | null) {
  query.value.min_price = val ?? undefined;
  fetchRoomList();
}

function onMaxPriceChange(val: number | null) {
  query.value.max_price = val ?? undefined;
  fetchRoomList();
}
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

const searchableColumns = RoomCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined &&
    [
      "name",
      "room_number",
      "brokerage_fees",
      "room_type",
      "room_amenities",
      "description",
    ].includes(col.dataIndex as string)
);

onMounted(() => {
  if (route.name === "admin.detailhotel" && route.params.id) {
    query.value.hotel_id = Number(route.params.id);
  } else {
    query.value.hotel_id = undefined;
  }
  fetchRoomList();
  findAllRoomType();
});
</script>

<style scoped></style>
