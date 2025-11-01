<template>
  <BaseCRUD
    :columns="UserCol.getColumns()"
    :data="UserList"
    :loading="loading"
    :icon="UserOutlined"
    :searchableColumns="searchableColumns"
    title="user"
    :scroll="{ x: 1700 }"
    @on-delete="deleteUser"
    @on-edit="onEdit"
    @on-query="setQuery"
    @on-create="onCreate"
    @on-search="setQuery"
  >
    <!-- <template #extra>
     
    </template> -->
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'roles'">
        <a-tag
          v-for="role in record.roles"
          :key="role.id"
          :color="
            role.name === BaseRole.SUPER_ADMIN
              ? 'purple'
              : role.name === BaseRole.ADMIN
              ? 'blue'
              : 'green'
          "
          class="capitalize text-base mr-1"
        >
          {{ role.name ? role.name : "" }}
        </a-tag>
      </template>

      <template v-if="column.key === 'hotels' && record.hotels.length > 0">
        <div
          v-for="hotel in record.hotels"
          :key="hotel.id"
        >
          {{ hotel.name }}
        </div>
      </template>

      <template v-if="column.key === 'is_active'">
        <a-tag
          :color="record.is_active ? 'green' : 'red'"
          class="capitalize text-base"
        >
          {{ record.is_active ? $t("active") : $t("inactive") }}
        </a-tag>
      </template>
    </template>
  </BaseCRUD>

  <!-- Manage User Modal -->
  <ManageUser :open="open" :data="userRecord" @isOpen="open = $event" />
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/BaseCRUD/BaseCRUD.vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
import { useUser } from "@/presentation/composables/useUser";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { User } from "@/domain/entities/user.entity";
import ManageUser from "./manageUser.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { ColumnType } from "ant-design-vue/es/table";

const { loading, UserList, findAllWithPagination, setQuery, deleteUser } = useUser();
const open = ref(false);
const userRecord = ref<User | null>(null);

const onEdit = (record: User) => {
  userRecord.value = record;
  open.value = true;
};

const onCreate = () => {
  userRecord.value = null;
  open.value = true;
};


const UserCol = new BaseColumns<User>([
  {
    dataIndex: "email",
    ellipsis: true,
    width: 250,
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    dataIndex: "first_name",
    width: 200,
    sorter: (a, b) => a.first_name.localeCompare(b.first_name),
  },
  {
    dataIndex: "last_name",
    width: 200,
    sorter: (a, b) => a.last_name.localeCompare(b.last_name),
  },
  {
    dataIndex: "is_active",
    width: 100,
    sorter: (a, b) => a.is_active - b.is_active,
  },
  { dataIndex: "roles" },
  { dataIndex: "hotels" },
]);
const searchableColumns = UserCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined && ["email", "first_name", "last_name"].includes(col.dataIndex as string)
);

onMounted(() => {
  findAllWithPagination();
});
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
