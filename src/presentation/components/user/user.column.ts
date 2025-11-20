import { User } from "@/domain/entities/user.entity";
import { BaseRole } from "@/shared/enum/base.role.enum";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const getUserColumns = (
  userRoles: string[],
  getIndex: (index: number) => number
) => {
  const hasPermission =
    userRoles.includes(BaseRole.SUPER_ADMIN) ||
    userRoles.includes(BaseRole.ADMIN) ||
    userRoles.includes(BaseRole.ADMIN_HOTEL);

  return new BaseColumns<User>(
    [
      {
        dataIndex: "email",
        ellipsis: true,
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        dataIndex: "first_name",
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      },
      {
        dataIndex: "last_name",
        sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      },
      {
        dataIndex: "is_active",
        sorter: (a, b) => a.is_active - b.is_active,
      },
      { dataIndex: "roles" },
      { dataIndex: "hotels" },
    ],
    { useActions: hasPermission },
    getIndex
  );
};

export const getSearchableColumns = (columns: ColumnType<any>[]) => {
  return columns.filter(
    (col: ColumnType<any>) =>
      col.dataIndex !== undefined &&
      ["email", "first_name", "last_name"].includes(col.dataIndex as string)
  );
};
