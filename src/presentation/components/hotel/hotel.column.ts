import { Hotel } from "@/domain/entities/hotel.entity";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const getHotelColumns = (getIndex: (index: number) => number) => {
  const HotelCol = new BaseColumns<Hotel>(
    [
      {
        dataIndex: "logo",
        ellipsis: true,
        fixed: "left",
      },
      {
        dataIndex: "name",
        ellipsis: true,
        fixed: "left",
      },
      {
        dataIndex: "email_hotel",
      },
      {
        dataIndex: "tel",
      },
      {
        dataIndex: "start_time",
      },
      {
        dataIndex: "end_time",
      },
      {
        dataIndex: "address",
      },
      {
        dataIndex: "floor",
      },
      {
        dataIndex: "zone",
      },
    ],
    { useActions: true },
    getIndex
  );
  const searchableColumns = HotelCol.getColumns().filter(
    (col: ColumnType<any>) =>
      col.dataIndex !== undefined &&
      ["floor", "name", "email_hotel", "tel"].includes(col.dataIndex as string)
  );
  return { HotelCol, searchableColumns };
};

// export const HotelCol = new BaseColumns<Hotel>([
//   {
//     dataIndex: "logo",
//     ellipsis: true,
//     fixed: "left",
//   },
//   {
//     dataIndex: "name",
//     ellipsis: true,
//     fixed: "left",
//   },
//   {
//     dataIndex: "email_hotel",
//   },
//   {
//     dataIndex: "tel",
//   },
//   {
//     dataIndex: "start_time",
//   },
//   {
//     dataIndex: "end_time",
//   },
//   {
//     dataIndex: "address",
//   },
//   {
//     dataIndex: "floor",
//   },
//   {
//     dataIndex: "zone",
//   },
// ]);

// export const searchableColumns = HotelCol.getColumns().filter(
//   (col: ColumnType<any>) =>
//     col.dataIndex !== undefined &&
//     ["floor", "name", "email_hotel", "tel"].includes(col.dataIndex as string)
// );
