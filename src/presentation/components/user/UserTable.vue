<template>
  <BaseCRUD
    :columns="userColumns"
    :data="UserList"
    :loading="loading"
    :icon="UserOutlined"
    :searchableColumns="searchableColumns"
    title="user"
    :scroll="{ x: 'max-content' }"
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
        <div v-for="hotel in record.hotels" :key="hotel.id">
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
    <template #actions="{ record }">
      <a-tooltip
        :title="$t('changePassword')"
        v-if="
          rolesArray.includes(BaseRole.SUPER_ADMIN) ||
          rolesArray.includes(BaseRole.ADMIN) ||
          rolesArray.includes(BaseRole.ADMIN_HOTEL)
        "
      >
        <a-button
          type="link"
          size="small"
          @click="onChangePassword(record)"
          class="transition-all duration-200"
        >
          <LockOutlined class="text-lg" />
        </a-button>
      </a-tooltip>
    </template>
  </BaseCRUD>

  <!-- Manage User Modal -->
  <ManageUser :open="open" :data="userRecord" @isOpen="open = $event" />
  <changePassword
    :user_id="userRecord?.id || ''"
    :open_change_password="open_change_password"
    @isOpen="
      (isOpen) => {
        open = isOpen;
        open_change_password = isOpen;
      }
    "
  />
</template>

<script setup lang="ts">
import BaseCRUD from "@/components/Base/BaseCrud/BaseCRUD.vue";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { ref, onMounted, computed } from "vue";
import { useUser } from "@/presentation/composables/useUser";
import { User } from "@/domain/entities/user.entity";
import ManageUser from "./manageUser.vue";
import { BaseRole } from "@/shared/enum/base.role.enum";
import changePassword from "./changePassword.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/presentation/stores/user.store";
import { useAuthStore } from "@/presentation/stores/auth.store";
import { getSearchableColumns, getUserColumns } from "./user.column";
const { rolesArray } = storeToRefs(useAuthStore());
const { loading, UserList, query } = storeToRefs(useUserStore());
const { findAllWithPagination, setQuery, deleteUser } = useUser();
const open = ref(false);
const userRecord = ref<User | null>(null);

const userColumns = computed(() =>
  getUserColumns(
    rolesArray.value,
    (index: number) => (query.value.page - 1) * query.value.limit + index + 1
  ).getColumns()
);
const searchableColumns = computed(() =>
  getSearchableColumns(userColumns.value)
);
const onEdit = (record: User) => {
  userRecord.value = record;
  open.value = true;
};
const open_change_password = ref(false);
const onChangePassword = (record: User) => {
  userRecord.value = record;
  open_change_password.value = true;
};

const onCreate = () => {
  userRecord.value = null;
  open.value = true;
};

onMounted(() => {
  findAllWithPagination();
});
</script>

<style scoped>
:deep(.ant-table) {
  border: 1px solid rgb(204, 204, 204);
}
</style>
