<template>
  <BaseCRUD
    :columns="RoomCol.getColumns()"
    :data="booking_pagination"
    :loading="loading"
    :icon="AppstoreOutlined"
    :searchable-columns="searchableColumns"
    :hideActionsDelete="true"
    :hide-button-create="true"
    title="list booking"
    :scroll="{ x: 1500 }"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setQuery"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'created_by'">
        {{ record.created_by?.first_name + " " + record.created_by?.last_name }}
      </template>
      <template v-if="column.key === 'updated_by'">
        {{ record.updated_by?.first_name + " " + record.updated_by?.last_name }}
      </template>
      <template v-if="column.key === 'payment_status'">
        <div class="flex gap-2 items-center justify-center">
          <a-tag
            :color="
              record.payment_status === 'pending'
                ? 'gold'
                : record.payment_status === 'success'
                ? 'green'
                : 'red'
            "
            >{{ $t(record.payment_status ? "ຈ່າຍແລ້ວ" : "ກຳລັງດຳເນີນ") }}</a-tag
          >
        </div>
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
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import {
  AppstoreOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { Room } from "@/domain/entities/room.entity";

import { ColumnType } from "ant-design-vue/es/table";
import { useBookingStore } from "@/presentation/stores/booking.store";
import { storeToRefs } from "pinia";
import { useBooking } from "@/presentation/composables/useBooking";
import { IBooking } from "@/domain/entities/booking.entity";
import { useRouter } from "vue-router";
const { booking_pagination, loading } = storeToRefs(useBookingStore());
const { findallWithPagination, setQuery } = useBooking();

const open = ref(false);
const roomRecord = ref<Room | null>(null);
const router = useRouter();
const onEdit = (record: Room) => {
  roomRecord.value = record;
  open.value = true;
};

const onCreate = () => {
  roomRecord.value = null;
  open.value = true;
};

const onView = (record: IBooking) => {
  if (record) {
    router.push({
      name: "admin.detail",
      params: { id: String(record.id) },
    });
  } else {
    router.push({ name: "admin.hotel" });
  }
};
const RoomCol = new BaseColumns<IBooking>([
  {
    dataIndex: "customer_name",
    width: 140,
  },
  {
    dataIndex: "payment_status",
    width: 130,
    sorter: (a, b) => a.payment_status.localeCompare(b.payment_status),
  },

  {
    dataIndex: "customer_tel",
    width: 120,
  },
  {
    dataIndex: "booking_date",
    width: 120,
  },

  {
    dataIndex: "created_by",
    width: 150,
  },
  {
    dataIndex: "updated_by",
    width: 150,
  },
]);

const searchableColumns = RoomCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined &&
    ["customer_name", "customer_tel", "created_by", "updated_by"].includes(
      col.dataIndex as string
    )
);

onMounted(() => {
  findallWithPagination();
});
</script>

<style scoped></style>
