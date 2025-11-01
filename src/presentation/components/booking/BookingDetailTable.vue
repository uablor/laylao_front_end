<template>
  <BaseCRUD
    :columns="RoomCol.getColumns()"
    :data="booking_details_pagination"
    :loading="loading"
    :icon="AppstoreOutlined"
    :searchable-columns="searchableColumns"
    :hideActionsDelete="true"
    :hide-button-create="true"
    :hide-actions-update="true"
    title="detail booking"
    :scroll="{ x: 1700 }"
    @on-query="setQuery_details"
    @on-search="setQuery_details"
  >
    <template #bodyCell="{ column, record }">
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
      <template v-if="column.key === 'booking'">
        {{ record.booking?.customer_name }}
      </template>
      <template v-if="column.key === 'room'">
        {{ record.room?.room_number }}
      </template>
      <template v-if="column.key === 'qty'">
        {{ record.qty + " " + $t("quantity") }}
      </template>
      <template v-if="column.key === 'total'">
        <a-tag color="blue"> {{ record.total.toLocaleString() }} kip </a-tag>
      </template>
    </template>
  </BaseCRUD>
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { onMounted } from "vue";
import { BaseColumns } from "@/shared/utils/baseColumn";

import { ColumnType } from "ant-design-vue/es/table";
import { useBookingStore } from "@/presentation/stores/booking.store";
import { storeToRefs } from "pinia";
import { useBooking } from "@/presentation/composables/useBooking";
import { IBooking } from "@/domain/entities/booking.entity";
import { useRoute } from "vue-router";

const route = useRoute();
const { booking_details_pagination, loading, query_details } = storeToRefs(
  useBookingStore()
);
const { findallWithPagination_details, setQuery_details } = useBooking();

const RoomCol = new BaseColumns<IBooking>(
  [
    {
      dataIndex: "booking",
      width: 150,
    },
    {
      dataIndex: "room",
      width: 90,
    },
    {
      dataIndex: "qty",
      width: 150,
    },
    {
      dataIndex: "brokerage_fees",
      width: 120,
    },
    {
      dataIndex: "price",
      width: 120,
    },
    {
      dataIndex: "total",
      width: 150,
    },

    {
      dataIndex: "checkin_date",
      width: 150,
    },
    {
      dataIndex: "checkout_date",
      width: 150,
    },
  ],
  { useActions: false }
);

const searchableColumns = RoomCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined &&
    ["qty", "price", "total", "updated_by"].includes(col.dataIndex as string)
);

onMounted(async () => {
  if (route.name === "admin.detail" && route.params.id) {
    query_details.value.booking_id = Number(route.params.id);
  } else {
    query_details.value.booking_id = undefined;
  }
  await findallWithPagination_details();
});
</script>

<style scoped></style>
