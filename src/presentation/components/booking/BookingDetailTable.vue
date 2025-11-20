<template>
  <BaseCRUD
    :columns="BookingDetailCol.getColumns()"
    :data="booking_details_pagination"
    :loading="loading"
    :icon="AppstoreOutlined"
    :searchable-columns="searchableColumns"
    :hideActionsDelete="true"
    :hide-button-create="true"
    :hide-actions-update="true"
    :sortable="false"
    :input-search="false"
    title="detail booking"
    :scroll="{ x: 'max-content' }"
    @on-query="setQuery_details"
    @on-search="setQuery_details"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'price'">
        <a-tag color="green">
          <div class="flex items-center justify-center gap-1">
            <h1 style="margin: 0">
              {{ record.room.price.toLocaleString() }} kip /ຄືນ
            </h1>
          </div>
        </a-tag>
      </template>
      <template v-if="column.key === 'price_total'">
        <a-tag color="green">
          <div class="flex items-center justify-center gap-1">
            <h1 style="margin: 0">
              {{ record.price.toLocaleString() }} kip
              {{ calculateDays(record?.checkin_date, record?.checkout_date) }}/
              ຄືນ
            </h1>
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
      <template v-if="column.key === 'room'">
        {{ record.room?.room_number }}
      </template>
      <template v-if="column.key === 'room_type'">
        {{ record.room?.room_type?.name }}
      </template>
      <template v-if="column.key === 'qty_person'">
        {{ record.qty }} {{ $t("person") }}
      </template>
      <template v-if="column.key === 'all_total'">
        <a-tag color="blue"> {{ record.total.toLocaleString() }} kip </a-tag>
      </template>

      <template v-if="column.key === 'payment_status'">
        <a-tag :color="record.booking.payment_status ? 'green' : 'red'">
          {{ $t(record.booking.payment_status ? "ຈ່າຍແລ້ວ" : "ກຳລັງດຳເນີນ") }}
        </a-tag>
      </template>
    </template>
  </BaseCRUD>
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/Base/BaseCrud/BaseCRUD.vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { onMounted } from "vue";
import { useBookingStore } from "@/presentation/stores/booking.store";
import { storeToRefs } from "pinia";
import { useBooking } from "@/presentation/composables/useBooking";
import { useRoute } from "vue-router";
import { calculateDays } from "@/shared/utils/dayjs.util";
import { getBookingDetailColumns } from "./bookingDetaill.column";
const route = useRoute();
const { booking_details_pagination, loading, query_details } = storeToRefs(
  useBookingStore()
);
const { BookingDetailCol, searchableColumns } = getBookingDetailColumns(
  (index: number) =>
    (query_details.value.page - 1) * query_details.value.limit + index + 1
);
const { findallWithPagination_details, setQuery_details } = useBooking();

onMounted(async () => {
  if (
    route.name === "admin.detail" ||
    (route.name === "admin-hotel.detail" && route.params.id)
  ) {
    query_details.value.booking_id = Number(route.params.id);
  } else {
    query_details.value.booking_id = undefined;
  }
  await findallWithPagination_details();
});
</script>

<style scoped></style>
