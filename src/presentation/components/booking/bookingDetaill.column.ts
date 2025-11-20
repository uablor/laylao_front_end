import { IBooking } from "@/domain/entities/booking.entity";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const getBookingDetailColumns = (
  getIndex: (index: number) => number
) => {
  const BookingDetailCol = new BaseColumns<IBooking>(
    [
      {
        dataIndex: "room",
      },

      {
        dataIndex: "room_type",
      },
      {
        dataIndex: "qty_person",
      },
      {
        dataIndex: "brokerage_fees",
      },
      {
        dataIndex: "price",
      },
      {
        dataIndex: "price_total",
      },
      {
        dataIndex: "all_total",
      },
      {
        dataIndex: "checkin_date",
      },
      {
        dataIndex: "checkout_date",
      },
    ],
    { useActions: false },
    getIndex
  );

  const searchableColumns = BookingDetailCol.getColumns().filter(
    (col: ColumnType<any>) =>
      col.dataIndex !== undefined && ["price"].includes(col.dataIndex as string)
  );

  return { BookingDetailCol, searchableColumns };
};

// export const BookingDetailCol = new BaseColumns<IBooking>(
//   [
//     {
//       dataIndex: "room",
//     },

//     {
//       dataIndex: "room_type",
//     },
//     {
//       dataIndex: "qty_person",
//     },
//     {
//       dataIndex: "brokerage_fees",
//     },
//     {
//       dataIndex: "price",
//     },
//     {
//       dataIndex: "price_total",
//     },
//     {
//       dataIndex: "all_total",
//     },
//     {
//       dataIndex: "checkin_date",
//     },
//     {
//       dataIndex: "checkout_date",
//     },
//   ],
//   { useActions: false }
// );

// export const searchableColumns = BookingDetailCol.getColumns().filter(
//   (col: ColumnType<any>) =>
//     col.dataIndex !== undefined && ["price"].includes(col.dataIndex as string)
// );
