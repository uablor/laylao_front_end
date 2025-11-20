import { Room } from "@/domain/entities/room.entity";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const getRoomColumns = (getIndex: (index: number) => number) => {
  const RoomCol = new BaseColumns<Room>(
    [
      {
        dataIndex: "name",
        ellipsis: true,
      },
      {
        dataIndex: "room_number",
      },
      {
        dataIndex: "room_type",
      },
      {
        dataIndex: "floor",
      },
      {
        dataIndex: "brokerage_fees",
      },
      {
        dataIndex: "price",
      },
      {
        dataIndex: "status",
      },
      {
        dataIndex: "room_amenities",
      },
      {
        dataIndex: "description",
      },
    ],
    { useActions: true },
    getIndex
  );

  const searchableColumns = RoomCol.getColumns().filter(
    (col: ColumnType<any>) =>
      col.dataIndex !== undefined &&
      [
        "name",
        "room_number",
        // "brokerage_fees",
        // "room_type",
        // "room_amenities",
        // "description",
        "floor",
      ].includes(col.dataIndex as string)
  );

  return { RoomCol, searchableColumns };
};

// export const RoomCol = new BaseColumns<Room>([
//   {
//     dataIndex: "name",
//     ellipsis: true,
//   },
//   {
//     dataIndex: "room_number",
//   },
//   {
//     dataIndex: "room_type",
//   },
//   {
//     dataIndex: "floor",
//   },
//   {
//     dataIndex: "brokerage_fees",
//   },
//   {
//     dataIndex: "price",
//   },
//   {
//     dataIndex: "status",
//   },
//   {
//     dataIndex: "room_amenities",
//   },
//   {
//     dataIndex: "description",
//   },
// ]);

// export const searchableColumns = RoomCol.getColumns().filter(
//   (col: ColumnType<any>) =>
//     col.dataIndex !== undefined &&
//     [
//       "name",
//       "room_number",
//       // "brokerage_fees",
//       // "room_type",
//       // "room_amenities",
//       // "description",
//       "floor",
//     ].includes(col.dataIndex as string)
// );
