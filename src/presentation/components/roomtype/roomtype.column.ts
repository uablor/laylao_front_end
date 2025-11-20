import { RoomType } from "@/domain/entities/roomtype.entity";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const getRoomTypeColumns = (getIndex: (index: number) => number) => {
  const RoomTypeCol = new BaseColumns<RoomType>(
    [
      {
        dataIndex: "name",
        ellipsis: true,
      },
      {
        dataIndex: "hotel",
        ellipsis: true,
      },
    ],
    { useActions: true },
    getIndex
  );
  const searchableColumns = RoomTypeCol.getColumns().filter(
    (col: ColumnType<any>) =>
      col.dataIndex !== undefined && ["name"].includes(col.dataIndex as string)
  );

  return { RoomTypeCol, searchableColumns };
};
// export const RoomTypeCol = new BaseColumns<RoomType>([
//   {
//     dataIndex: "name",
//     ellipsis: true,
//   },
//   {
//     dataIndex: "hotel",
//     ellipsis: true,
//   },
// ]);
// export const searchableColumns = RoomTypeCol.getColumns().filter(
//   (col: ColumnType<any>) =>
//     col.dataIndex !== undefined && ["name"].includes(col.dataIndex as string)
// );
