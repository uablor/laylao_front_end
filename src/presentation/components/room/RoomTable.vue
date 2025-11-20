<template>
  <BaseCRUD
    :columns="RoomCol.getColumns()"
    :data="RoomList"
    :loading="loading"
    :icon="AppstoreOutlined"
    :searchable-columns="searchableColumns"
    :hide-button-create="true"
    :sortable="false"
    :inputSearch="false"
    :input="true"
    title="room"
    :scroll="{ x: 'max-content' }"
    @on-delete="deleteRoom"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setSearch"
  >
    <template #extra>
      <a-input-number
        v-model:value="query.min_price"
        :min="0"
        :formatter="(value: number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value: string) => value.replace(/,/g, '')"
        :placeholder="$t('min_price')"
        style="width: 100px"
      />

      <span>~</span>

      <a-input-number
        v-model:value="query.max_price"
        :min="0"
        :formatter="(value: number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value: string) => value.replace(/,/g, '')"
        :placeholder="$t('max_price')"
        style="width: 100px"
      />
      <a-select
        v-if="!props.hideSelectRoomType"
        v-model:value="query.room_type_id"
        :placeholder="t('room_type')"
        style="width: 140px"
        :options="[
          { label: t('total'), value: 'all' },
          ...RoomTypeList.data.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        ]"
      />
      <a-select
        v-model:value="statusValue"
        :placeholder="t('status')"
        style="width: 100px"
        :options="[
          { value: 'all', label: t('total') },
          { value: RoomStatus.AVAILABLE, label: 'ຫ້ອງຫວ່າງ' },
          { value: RoomStatus.OCCUPIED, label: 'ຫ້ອງຕິດຈອງ' },
        ]"
      />
    </template>
    <template #extraright>
      <a-button
        type="text"
        @click="() => setQuery(query)"
        class="cursor-pointer"
      >
        <SearchOutlined class="text-[20px]" />
      </a-button>

      <a-button type="primary" @click="onReset" ghost class="cursor-pointer">
        {{ $t("reset") }}
      </a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <div class="flex items-center gap-2">
          <a-tag :color="record.status === 'available' ? 'green' : 'red'">
            {{ record.status === "available" ? "ຫ້ອງຫວ່າງ" : "ຫ້ອງຕິດຈອງ" }}
          </a-tag>
          <!-- 
          <a-switch
            :checked="record.status === RoomStatus.AVAILABLE"
            style="width: 50px"
            @change="onChangeStatu(record)"
          /> -->
        </div>
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
      <template v-if="column.key === 'floor'">
        {{ $t("floor") + " " + record.floor }}
      </template>
    </template>
    <template #actions="{ record }">
      <a-tooltip :title="$t('status')">
        <a-popconfirm
          title="ຢືນຢັນການປ່ຽນສະຖານະຫ້ອງ"
          ok-text="ຢືນຢັນ"
          cancel-text="ຍົກເລີກ"
          @confirm="onChangeStatu(record)"
          :disabled="record.status === RoomStatus.AVAILABLE"
          :loading="loading"
        >
          <a-button
            type="primary"
            size="small"
            :disabled="record.status === RoomStatus.AVAILABLE"
          >
            {{ $t("update") }}
          </a-button>
        </a-popconfirm>
      </a-tooltip>
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

  <!-- <ManageRoom :open="open" :data="roomRecord" @isOpen="open = $event" /> -->
  <UpdateRoom />
  <CreateRoom />
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/Base/BaseCrud/BaseCRUD.vue";
import {
  AppstoreOutlined,
  PlusCircleFilled,
  SearchOutlined,
  // SearchOutlined,
} from "@ant-design/icons-vue";
import { computed, onMounted } from "vue";
import { useRoom } from "@/presentation/composables/useRoom";
import { Room, RoomPaginationParams } from "@/domain/entities/room.entity";
// import ManageRoom from "./manageRoom.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { RoomStatus } from "@/shared/enum/status-room.enum";
import { useBookingStore } from "@/presentation/stores/booking.store";
import { storeToRefs } from "pinia";
import { useroomStore } from "@/presentation/stores/room.store";
import { useroomTypeStore } from "@/presentation/stores/room-type.store";
import UpdateRoom from "./updateRoom.vue";
import CreateRoom from "./createRoom.vue";
import { useHotel } from "@/presentation/composables/useHotel";
import { useAuthStore } from "@/presentation/stores/auth.store";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { getRoomColumns } from "./room.column";
const { findOneHotelDetails } = useHotel();
const props = withDefaults(
  defineProps<{
    hideSelectRoomType?: boolean;
  }>(),
  {
    hideSelectRoomType: false,
  }
);
const { rolesArray, authme } = storeToRefs(useAuthStore());
const { t } = useI18n();
const { RoomTypeList } = storeToRefs(useroomTypeStore());
const { roomAll } = storeToRefs(useroomStore());
const { booking } = storeToRefs(useBookingStore());
const { query, formState, open_edit, open_create } = storeToRefs(
  useroomStore()
);
const { RoomCol, searchableColumns } = getRoomColumns(
  (index: number) => (query.value.page - 1) * query.value.limit + index + 1
);
const {
  loading,
  RoomList,
  fetchRoomList,
  setQuery,
  deleteRoom,
  onChangeStatus,
} = useRoom();
const route = useRoute();

const onReset = () => {
  query.value.max_price = undefined;
  query.value.min_price = undefined;
  if (!props.hideSelectRoomType) {
    query.value.room_type_id = undefined;
  }
  query.value.status = undefined;
  query.value.search = undefined;
  query.value.hotel_id = Number(route.params.id);
  if (
    rolesArray.value.includes(BaseRole.USER_HOTEL) ||
    rolesArray.value.includes(BaseRole.ADMIN_HOTEL)
  ) {
    query.value.hotel_id = authme.value?.hotels?.[0]?.id;
  }
  setQuery(query.value);
};
const onEdit = (record: Room) => {
  formState.value.id = record.id;
  formState.value.name = record.name;
  formState.value.room_number = record.room_number;
  formState.value.price = record.price;
  formState.value.brokerage_fees = record.brokerage_fees;
  formState.value.floor = record.floor;
  formState.value.description = record.description;
  formState.value.room_amenities = record.room_amenities;
  formState.value.room_type_id = record.room_type.id;
  formState.value.hotel_id = record.hotel.id;
  open_edit.value = true;
};

const statusValue = computed({
  get: () => query.value.status ?? "all",
  set: (val) => {
    query.value.status = val == "all" ? undefined : val;
  },
});

const onCreate = () => {
  formState.value.id = 0;
  formState.value.name = "";
  formState.value.room_number = "";
  formState.value.price = 0;
  formState.value.brokerage_fees = 0;
  formState.value.floor = 0;
  formState.value.description = "";
  formState.value.room_amenities = "";
  formState.value.room_type_id = 0;
  formState.value.hotel_id = 0;
  open_create.value = true;
};

const setSearch = (val: {
  search: string;
  search_field: string;
  page: number;
}) => {
  query.value.search = val.search;
  query.value.search_field = val.search_field;
  query.value.page = val.page;
};

const onBooking = (record: Room) => {
  const roomId = record.id;
  const existingRoom = booking.value.rooms.find(
    (room) => room.room_id === roomId
  );
  if (existingRoom) return;
  booking.value.rooms.push({
    room_id: roomId,
    qty: 0,
  });
  roomAll.value.push(record);
};

const onChangeStatu = async (record: Room) => {
  await onChangeStatus(
    Number(record.id),
    record.status === RoomStatus.AVAILABLE
      ? RoomStatus.OCCUPIED
      : RoomStatus.AVAILABLE
  );
  await findOneHotelDetails(Number(route.params.id));
};

onMounted(() => {
  if (route.name === "admin.detailhotel" && route.params.id) {
  } else {
    query.value.hotel_id = undefined;
  }

  if (!props.hideSelectRoomType) {
    query.value.room_type_id = undefined;
  }
  if (
    rolesArray.value.includes(BaseRole.USER_HOTEL) ||
    rolesArray.value.includes(BaseRole.ADMIN_HOTEL)
  ) {
    query.value.hotel_id = authme.value?.hotels?.[0]?.id;
  }
  fetchRoomList();
});
</script>

<style scoped></style>
