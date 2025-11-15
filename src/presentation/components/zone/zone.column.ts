import { Zone } from "@/domain/entities/zone.entity";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const ZoneCol = new BaseColumns<Zone>([
  {
    dataIndex: "name",
    ellipsis: true,
  },
]);

export const searchableColumns = ZoneCol.getColumns().filter(
  (col: ColumnType<any>) =>
    col.dataIndex !== undefined && ["name"].includes(col.dataIndex as string)
);