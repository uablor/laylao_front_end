import { IBooking } from "@/domain/entities/booking.entity";
import { BaseColumns } from "@/shared/utils/baseColumn";
import { ColumnType } from "ant-design-vue/es/table";

export const getBookingColumns = (getIndex: (index: number) => number) => {
  const BookingCol = new BaseColumns<IBooking>(
    [
      {
        dataIndex: "booking_code",
        ellipsis: true,
      },
      {
        dataIndex: "customer_name",
        ellipsis: true,
      },

      {
        dataIndex: "customer_tel",
        ellipsis: true,
      },
      {
        dataIndex: "hotel",
        ellipsis: true,
      },
      {
        dataIndex: "time_open_close",
        ellipsis: true,
      },

      {
        dataIndex: "brokerage_fees",
        ellipsis: true,
      },
      {
        dataIndex: "revenue",
        ellipsis: true,
      },

      {
        dataIndex: "all_total",
        ellipsis: true,
      },

      {
        dataIndex: "booking_date",
        ellipsis: true,
      },
      // {
      //   dataIndex: "payment_status",
      //   width: 130,
      // },

      {
        dataIndex: "created_by",
        ellipsis: true,
      },
      {
        dataIndex: "updated_by",
        ellipsis: true,
      },
    ],
    { useActions: true },
    getIndex
  );

  const searchableColumns = BookingCol.getColumns().filter(
    (col: ColumnType<any>) =>
      col.dataIndex !== undefined &&
      ["customer_name", "customer_tel", "created_by", "updated_by"].includes(
        col.dataIndex as string
      )
  );

  return { BookingCol, searchableColumns };

}

// export const BookingCol = new BaseColumns<IBooking>([
//   {
//     dataIndex: "booking_code",
//   },
//   {
//     dataIndex: "customer_name",
//   },

//   {
//     dataIndex: "customer_tel",
//   },
//   {
//     dataIndex: "hotel",
//   },

//   {
//     dataIndex: "brokerage_fees",
//   },
//   {
//     dataIndex: "revenue",
//   },

//   {
//     dataIndex: "all_total",
//   },

//   {
//     dataIndex: "booking_date",
//   },
//   // {
//   //   dataIndex: "payment_status",
//   //   width: 130,
//   // },

//   {
//     dataIndex: "created_by",
//   },
//   {
//     dataIndex: "updated_by",
//   },
// ]);

// export const searchableColumns = BookingCol.getColumns().filter(
//   (col: ColumnType<any>) =>
//     col.dataIndex !== undefined &&
//     ["customer_name", "customer_tel", "created_by", "updated_by"].includes(
//       col.dataIndex as string
//     )
// );
