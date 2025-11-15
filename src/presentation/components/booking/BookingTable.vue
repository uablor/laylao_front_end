<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 p-4">
    <div
      class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
    >
      <span class="text-gray-700">{{ $t("list booking") + $t("total") }}</span>
      <a-spin size="small" v-if="loading_report" />
      <span v-else class="font-semibold">{{
        booking_report.total_booking
      }}</span>
    </div>

    <div
      class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
    >
      <span class="text-gray-700">{{ $t("brokerage") + $t("total") }}</span>
      <a-spin size="small" v-if="loading_report" />
      <a-tag v-else color="green" class="font-semibold"
        >{{ booking_report.total_brokerage_fees.toLocaleString() }} kip</a-tag
      >
    </div>

    <div
      class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
    >
      <span class="text-gray-700">{{ $t("price") + $t("total") }}</span>
      <a-spin size="small" v-if="loading_report" />
      <a-tag v-else color="blue" class="font-semibold"
        >{{ booking_report.total_price.toLocaleString() }} kip</a-tag
      >
    </div>
    <div
      class="flex justify-between items-center bg-gray-50 px-3 py-2 text-sm shadow-sm"
    >
      <span class="text-gray-700">{{ $t("all_total") }}</span>
      <a-spin size="small" v-if="loading_report" />
      <a-tag v-else color="orange" class="font-semibold"
        >{{ booking_report.total_total.toLocaleString() }} kip</a-tag
      >
    </div>
  </div>
  <BaseCRUD
    :columns="BookingCol.getColumns()"
    :data="booking_pagination"
    :loading="loading"
    :icon="AppstoreOutlined"
    :searchable-columns="searchableColumns"
    :hide-actions-update="true"
    :hideActionsDelete="true"
    :hide-button-create="true"
    :sortable="false"
    :input-search="false"
    :input="true"
    title="list booking"
    :scroll="{ x: 'max-content' }"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setSearch"
  >
    <template #extra>
      <a-date-picker
        v-model:value="query.start_date"
        style="width: 120px"
        value-format="YYYY-MM-DD"
        format="DD/MM/YYYY"
        :placeholder="$t('select_date')"
      />
      ~
      <a-date-picker
        v-model:value="query.end_date"
        style="width: 120px"
        value-format="YYYY-MM-DD"
        format="DD/MM/YYYY"
        :placeholder="$t('select_date')"
        :disabled-date="(current :any) => disabledCheckoutDate(current)"
      />
      <a-select
        v-if="
          authme?.roles[0]?.name === BaseRole.SUPER_ADMIN ||
          authme?.roles[0]?.name === BaseRole.ADMIN
        "
        v-model:value="query.hotel_id"
        :placeholder="$t('hotel')"
        style="width: 180px"
        popupClassName="hotel-select-dropdown"
      >
        <a-select-option value="">{{ $t("total") }}</a-select-option>
        <a-select-option
          v-for="hotel in hotelStore.HotelList.value.data"
          :key="hotel.id"
          :value="hotel.id"
        >
          <div style="white-space: normal; word-break: break-word">
            {{ hotel.name }}
          </div>
        </a-select-option>
      </a-select>
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
      <template v-if="column.key === 'created_by'">
        {{ record.created_by?.first_name + " " + record.created_by?.last_name }}
      </template>
      <template v-if="column.key === 'updated_by'">
        {{ record.updated_by?.first_name + " " + record.updated_by?.last_name }}
      </template>
      <!-- <template v-if="column.key === 'payment_status'">
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
      </template> -->
      <template v-if="column.key === 'booking_date'">
        {{ formatDayJs(record.booking_date) }}
      </template>
      <template v-if="column.key === 'hotel'">
        {{ record.details?.[0]?.room?.hotel?.name }}
        <FieldTimeOutlined />
        {{
          (record.details?.[0]?.room?.hotel?.start_time ?? "00:00:00") +
          " - " +
          (record.details?.[0]?.room?.hotel?.end_time ?? "00:00:00")
        }}
      </template>

      <template v-if="column.key === 'brokerage_fees'">
        <a-tag color="green">
          {{
            record.details
              .reduce(
                (sum: any, item: any) => sum + Number(item.brokerage_fees || 0),
                0
              )
              .toLocaleString()
          }}
          kip
        </a-tag>
      </template>
      <template v-if="column.key === 'revenue'">
        <a-tag color="blue">
          {{
            record.details
              .reduce((sum: any, item: any) => sum + Number(item.price || 0), 0)
              .toLocaleString()
          }}
          kip
        </a-tag>
      </template>
      <template v-if="column.key === 'price_total'">
        <a-tag color="orange">
          {{
            record.details
              .reduce((sum: any, item: any) => sum + Number(item.total || 0), 0)
              .toLocaleString()
          }}
          kip
        </a-tag>
      </template>
    </template>
    <template #actions="{ record }">
      <a-tooltip :title="$t('payment_status')">
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
          <a-button
            type="primary"
            size="small"
            @click="updateStatus()"
            v-show="record.payment_status === 'pending'"
            style="background: #13c2c2"
          >
            <div>
              <CheckOutlined />
            </div>
          </a-button>
        </div>
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
  AppstoreOutlined,
  CheckOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { formatDayJs } from "@/shared/utils/baseColumn";
import { Room } from "@/domain/entities/room.entity";

import { useBookingStore } from "@/presentation/stores/booking.store";
import { storeToRefs } from "pinia";
import { useBooking } from "@/presentation/composables/useBooking";
import { IBooking } from "@/domain/entities/booking.entity";
import { useRouter } from "vue-router";
import { BookingCol, searchableColumns } from "./booking.column";
import dayjs, { Dayjs } from "dayjs";
import { useHotelStore } from "@/presentation/stores/hotel.store";
import { useHotel } from "@/presentation/composables/useHotel";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { useAuthStore } from "@/presentation/stores/auth.store";
const { rolesArray, authme } = storeToRefs(useAuthStore());
const { booking_pagination, loading, booking_report, query, loading_report } =
  storeToRefs(useBookingStore());
const { findallWithPagination: findallWithPaginationHotel } = useHotel();
const { findallWithPagination, setQuery, bookingReport } = useBooking();
const hotelStore = storeToRefs(useHotelStore());
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

const updateStatus = () => {};

const onView = (record?: IBooking) => {
  if (record) {
    if (
      rolesArray.value.includes(BaseRole.USER_HOTEL) ||
      rolesArray.value.includes(BaseRole.ADMIN_HOTEL)
    ) {
      router.push({
        name: "admin-hotel.detail",
        params: { id: String(record.id) },
      });
    } else {
      router.push({
        name: "admin.detail",
        params: { id: String(record.id) },
      });
    }
  } else {
    router.push({ name: "admin.hotel" });
  }
}

const setSearch = (val: {
  search: string;
  search_field: string;
  page: number;
}) => {
  query.value.search = val.search;
  query.value.search_field = val.search_field;
  query.value.page = val.page;
};
const onReset = () => {
  query.value = {
    page: 1,
    limit: 10,
    start_date: undefined,
    end_date: undefined,
    hotel_id: undefined,
    search: undefined,
    search_field: undefined,
    type: undefined,
    sort: undefined,
  };
  if (
    rolesArray.value.includes(BaseRole.USER_HOTEL) ||
    rolesArray.value.includes(BaseRole.ADMIN_HOTEL)
  ) {
    query.value.hotel_id = String(authme.value?.hotels?.[0]?.id);
  }
  setQuery({});
};
const disabledCheckoutDate = (current: Dayjs) => {
  const checkinDate = query.value.start_date;
  if (!checkinDate) {
    return current && current < dayjs().startOf("day");
  }
  return current && current <= dayjs(checkinDate).startOf("day");
};
bookingReport;
onMounted(() => {
  if (
    rolesArray.value.includes(BaseRole.USER_HOTEL) ||
    rolesArray.value.includes(BaseRole.ADMIN_HOTEL)
  ) {
    query.value.hotel_id = String(authme.value?.hotels?.[0]?.id);
  }
  findallWithPagination();
  bookingReport();

  if (
    authme.value?.roles[0]?.name === BaseRole.SUPER_ADMIN ||
    authme.value?.roles[0]?.name === BaseRole.ADMIN
  ) {
    hotelStore.query.value.type = "all";
    findallWithPaginationHotel();
  }
});
</script>

<style scoped>
.hotel-select-dropdown .ant-select-item {
  height: auto !important;
  min-height: 32px !important;
  padding: 8px 12px !important;
}
</style>
