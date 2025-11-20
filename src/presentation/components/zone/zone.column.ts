// import { Zone } from "@/domain/entities/zone.entity";
// import { useZoneStore } from "@/presentation/stores/zone.store";
// import { BaseColumns } from "@/shared/utils/baseColumn";
// import { ColumnType } from "ant-design-vue/es/table";
// import { storeToRefs } from "pinia";
// const { query } = storeToRefs(useZoneStore());

// export const ZoneCol = new BaseColumns<Zone>(
//   [
//     {
//       dataIndex: "name",
//       ellipsis: true,
//     },
//   ],
//   { useActions: false },
//   (index: number) => (query.value.page - 1) * query.value.limit + index + 1
// );

// export const searchableColumns = ZoneCol.getColumns().filter(
//   (col: ColumnType<any>) =>
//     col.dataIndex !== undefined && ["name"].includes(col.dataIndex as string)
// );


import { BaseColumns } from "@/shared/utils/baseColumn";
import { Zone } from "@/domain/entities/zone.entity";
import type { ColumnType } from "ant-design-vue/es/table";

export function getZoneColumns(
  getIndex: (index: number) => number // function สำหรับคำนวณเลขลำดับ
) {
  const ZoneCol = new BaseColumns<Zone>(
    [
      {
        dataIndex: "name",
        ellipsis: true,
      },
    ],
    { useActions: true },
    getIndex
  );

  const searchableColumns = ZoneCol.getColumns().filter(
    (col: ColumnType<any>) =>
      col.dataIndex !== undefined && ["name"].includes(col.dataIndex as string)
  );

  return { ZoneCol, searchableColumns };
}


